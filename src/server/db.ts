import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'analytics.json');

// Estrutura inicial
interface DbSchema {
  visits: any[];
  clicks: any[];
  blockedIps: string[];
}

const initialDb: DbSchema = {
  visits: [],
  clicks: [],
  blockedIps: [],
};

// Função para ler o banco
function readDb(): DbSchema {
  try {
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify(initialDb, null, 2));
      return initialDb;
    }
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Erro ao ler analytics.json:', err);
    return initialDb;
  }
}

// Função para escrever no banco
function writeDb(data: DbSchema) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Erro ao escrever analytics.json:', err);
  }
}

const db = {
  getCollection: (name: 'visits' | 'clicks' | 'blockedIps') => {
    const fullDb = readDb();
    return fullDb[name] || [];
  },
  insert: (name: 'visits' | 'clicks', item: any) => {
    const fullDb = readDb();
    const newItem = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      ...item
    };
    fullDb[name].push(newItem);
    writeDb(fullDb);
    return newItem;
  },
  isIpBlocked: (ip: string) => {
    const fullDb = readDb();
    if (!fullDb.blockedIps) return false;
    return fullDb.blockedIps.includes(ip);
  },
  blockIp: (ip: string) => {
    const fullDb = readDb();
    if (!fullDb.blockedIps) fullDb.blockedIps = [];
    if (!fullDb.blockedIps.includes(ip)) {
      fullDb.blockedIps.push(ip);
      writeDb(fullDb);
      console.log(`[DB] IP Bloqueado: ${ip}`);
    }
  },
  // Helpers para estatísticas básicos
  stats: () => {
    return readDb();
  },
  reset: () => {
    writeDb(initialDb);
  }
};

export default db;
