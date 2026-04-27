import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import rawApiRouter from './src/server/api.ts';
import db from './src/server/db.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiRouter = rawApiRouter.default || rawApiRouter;
const app = express();
const PORT = process.env.PORT || 5088;

console.log('[DEBUG] STARTING SERVER.JS VERSION 2');
console.log('[DEBUG] FILE PATH:', import.meta.url);

app.use((req, res, next) => {
  if (req.url === '/api/trap-test-123') {
    return res.end('TRAP_SUCCESS');
  }
  next();
});

app.use(express.json());

// LOGS DE DEBUG
app.use((req, res, next) => {
  console.log(`[DEBUG] ${new Date().toISOString()} | ${req.method} ${req.url}`);
  next();
});

// 1. ENDPOINTS DE PING (PRIORIDADE ALTA)
app.get(['/api/ping', '/ping'], (req, res) => {
  res.json({ success: true, message: 'Node Server is ALIVE', url: req.url, timestamp: new Date().toISOString() });
});

// 2. ENDPOINTS DE STATS DIRETOS
app.post(['/api/stats', '/stats'], (req, res) => {
  try {
    const { password, startDate, endDate } = req.body;
    if (password !== '33822912') return res.status(401).json({ error: 'Unauthorized' });

    let data = db.stats();
    if (startDate || endDate) {
      const start = startDate ? new Date(startDate) : new Date(0);
      const end = endDate ? new Date(endDate) : new Date();
      if (endDate && endDate.length <= 10) end.setHours(23, 59, 59, 999);
      data = {
        visits: data.visits.filter(v => { const d = new Date(v.timestamp); return d >= start && d <= end; }),
        clicks: data.clicks.filter(c => { const d = new Date(c.timestamp); return d >= start && d <= end; })
      };
    }
    
    const brToday = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });

    const stats = {
      totalVisits: data.visits.length,
      todayVisits: data.visits.filter(v => {
        const vDate = new Date(v.timestamp).toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
        return vDate === brToday;
      }).length,
      totalClicks: data.clicks.length,
      visitorsByIp: Object.entries(data.visits.reduce((acc, v) => { acc[v.ip] = (acc[v.ip] || 0) + 1; return acc; }, {})).map(([ip, count]) => ({ ip, count })).sort((a,b) => b.count - a.count).slice(0, 50),
      topClicks: Object.values(data.clicks.reduce((acc, c) => { const k = `${c.elementText}|${c.elementTag}`; if(!acc[k]) acc[k] = { element_text: c.elementText, element_tag: c.elementTag, path: c.path, count: 0 }; acc[k].count++; return acc; }, {})).sort((a,b) => b.count - a.count).slice(0, 50),
      visitsByDay: Object.entries(data.visits.reduce((acc, v) => { 
        const d = new Date(v.timestamp).toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
        if(d) acc[d] = (acc[d] || 0) + 1; return acc; 
      }, {})).map(([date, count]) => ({ date, count })).sort((a,b) => a.date.localeCompare(b.date)),
      visitsByHour: Object.entries(data.visits.reduce((acc, v) => { 
        const h = new Date(v.timestamp).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', timeZone: 'America/Sao_Paulo' });
        if(h) acc[h] = (acc[h] || 0) + 1; return acc; 
      }, {})).map(([hour, count]) => ({ hour, count })).sort((a,b) => a.hour.localeCompare(b.hour)),
      referrers: Object.entries(data.visits.reduce((acc, v) => { if(v.source) acc[v.source] = (acc[v.source] || 0) + 1; return acc; }, {})).map(([source, count]) => ({ source, count, referrer: '' })).sort((a,b) => b.count - a.count)
    };
    res.json({ success: true, stats });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// 3. OUTRAS ROTAS DO API ROUTER
app.use('/api', apiRouter);
app.use(apiRouter);

// 4. ARQUIVOS ESTÁTICOS E FALLBACK SPA (ÚLTIMA PRIORIDADE)
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  
  app.get('*', (req, res) => {
    // PROTEÇÃO CRÍTICA: Se for API, não entrega HTML, entrega 404 JSON
    if (req.url.startsWith('/api/') || req.url.startsWith('/stats') || req.url.startsWith('/st-')) {
      return res.status(404).json({ error: 'API route not found', path: req.url });
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[OK] Server running on port ${PORT}`);
});
