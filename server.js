import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import apiRouter from './src/server/api.ts'; // Vite handles TS during build, but for raw node we need tsx or build first

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware de compatibilidade para o api.ts (que espera o formato do Vite/Connect)
app.use((req, res, next) => {
  if (!res.status) {
    res.status = (code) => {
      res.statusCode = code;
      return res;
    };
  }
  if (!res.json) {
    res.json = (data) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
      return res;
    };
  }
  next();
});

// Logs de requisição para depuração (Mover para o topo)
app.use((req, res, next) => {
  console.log(`[Server DEBUG] ${req.method} ${req.url}`);
  next();
});

// Endpoint de diagnóstico rápido
app.get('/api/ping', (req, res) => {
  console.log('[Server DEBUG] Ping hit');
  res.json({ success: true, message: 'API is alive', url: req.url, timestamp: new Date().toISOString() });
});

// Diagnóstico sem prefixo (caso o Nginx Proxy Manager remova o /api)
app.get('/ping', (req, res) => {
  console.log('[Server DEBUG] Root ping hit');
  res.json({ success: true, message: 'Root Ping works', url: req.url });
});

// Rotas da API
app.use('/api', apiRouter);
app.use(apiRouter); // Tentar também sem o prefixo caso o proxy o remova

// Servir arquivos estáticos do frontend (após o build)
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  
  // Roteamento SPA: qualquer rota não-API serve o index.html
  app.get('*', (req, res) => {
    if (!req.url.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
} else {
  app.get('/', (req, res) => {
    res.send('O projeto ainda não foi buildado. Rode "npm run build" para gerar os arquivos estáticos.');
  });
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`API endpoints available at /api/*`);
});
