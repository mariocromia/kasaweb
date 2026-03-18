import express from 'express';
import db from './db';

const router = express.Router();

// Middleware para garantir que res.status e res.json funcionem mesmo no Connect do Vite
router.use((req: any, res: any, next) => {
  if (!res.status) {
    res.status = (code: number) => {
      res.statusCode = code;
      return res;
    };
  }
  if (!res.json) {
    res.json = (data: any) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
      return res;
    };
  }
  next();
});

// Parsing do body
router.use(express.json());

// Tentar obter o IP real
const getClientIp = (req: any) => {
  return req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
};

router.post('/track/visit', (req: any, res: any) => {
  try {
    const ip = getClientIp(req);
    const { path, referrer, source, userAgent } = req.body;
    
    db.insert('visits', {
      ip, 
      path: path || '/', 
      referrer: referrer || null, 
      source: source || null, 
      userAgent: userAgent || null
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao registrar visita:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/track/click', (req: any, res: any) => {
  try {
    const ip = getClientIp(req);
    const { path, elementText, elementTag, x, y } = req.body;
    console.log(`[API] Clique registrado: "${elementText}" em ${path}`);
    
    db.insert('clicks', {
      ip, 
      path: path || '/', 
      elementText: elementText || null, 
      elementTag: elementTag || null, 
      x: x || 0, 
      y: y || 0
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao registrar clique:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/stats', (req: any, res: any) => {
  try {
    const { password, startDate, endDate } = req.body;
    if (password !== '33822912') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    let data = db.stats();
    
    // Filtragem por data
    if (startDate || endDate) {
      const start = startDate ? new Date(startDate) : new Date(0);
      const end = endDate ? new Date(endDate) : new Date();
      // Garantir que o fim do dia seja incluído se endDate for apenas data
      if (endDate && endDate.length <= 10) end.setHours(23, 59, 59, 999);

      data = {
        visits: data.visits.filter((v: any) => {
          const d = new Date(v.timestamp);
          return d >= start && d <= end;
        }),
        clicks: data.clicks.filter((c: any) => {
          const d = new Date(c.timestamp);
          return d >= start && d <= end;
        })
      };
    }

    // Coletar estatísticas do arquivo JSON filtrado
    const totalVisits = data.visits.length;
    
    const todayStr = new Date().toISOString().split('T')[0];
    const todayVisits = data.visits.filter((v: any) => v.timestamp?.startsWith(todayStr)).length;
    
    const totalClicks = data.clicks.length;
    
    // Visitantes por IP (Top 50)
    const ipCounts: Record<string, number> = {};
    data.visits.forEach((v: any) => {
      ipCounts[v.ip] = (ipCounts[v.ip] || 0) + 1;
    });
    const visitorsByIp = Object.entries(ipCounts)
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 50);
    
    // Cliques por elemento (Top 50)
    const clickCounts: Record<string, any> = {};
    data.clicks.forEach((c: any) => {
      // Usar elementText como chave primária para diferenciar projetos
      const key = `${c.elementText || ''}|${c.elementTag || ''}`;
      if (!clickCounts[key]) {
        clickCounts[key] = { 
          element_text: c.elementText, 
          element_tag: c.elementTag, 
          path: c.path, 
          count: 0 
        };
      }
      clickCounts[key].count++;
    });
    const topClicks = Object.values(clickCounts)
      .sort((a: any, b: any) => b.count - a.count)
      .slice(0, 50);
    
    // Visitas por dia
    const dayCounts: Record<string, number> = {};
    data.visits.forEach((v: any) => {
      const day = v.timestamp?.split('T')[0];
      if (day) dayCounts[day] = (dayCounts[day] || 0) + 1;
    });
    const visitsByDay = Object.entries(dayCounts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
    
    // Visitas por hora do dia
    const hourCounts: Record<string, number> = {};
    data.visits.forEach((v: any) => {
      const hour = v.timestamp?.split('T')[1]?.split(':')[0];
      if (hour) hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });
    const visitsByHour = Object.entries(hourCounts)
      .map(([hour, count]) => ({ hour, count }))
      .sort((a, b) => a.hour.localeCompare(b.hour));
    
    const referrers: any[] = [];
    const refCounts: Record<string, number> = {};
    data.visits.forEach((v: any) => {
      if (v.source) {
        refCounts[v.source] = (refCounts[v.source] || 0) + 1;
      }
    });
    Object.entries(refCounts).forEach(([source, count]) => {
      referrers.push({ source, count, referrer: '' });
    });
    referrers.sort((a, b) => b.count - a.count);

    res.json({
      success: true,
      stats: {
        totalVisits,
        todayVisits,
        totalClicks,
        visitorsByIp,
        topClicks,
        visitsByDay,
        visitsByHour,
        referrers
      }
    });

  } catch (error) {
    console.error('Erro ao coletar stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/stats/reset', (req: any, res: any) => {
  try {
    const { password } = req.body;
    if (password !== '33822912') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Resetar o banco usando o helper do db.ts
    db.reset();

    res.json({ success: true, message: 'Estatísticas resetadas com sucesso' });
  } catch (error) {
    console.error('Erro ao resetar stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
