import React, { useEffect, useState } from 'react';
import { Users, MousePointer, TrendingUp, Clock, Globe, RefreshCw, LogOut, Trash2 } from 'lucide-react';

interface Stats {
  totalVisits: number;
  todayVisits: number;
  totalClicks: number;
  visitorsByIp: { ip: string; count: number }[];
  topClicks: { element_text: string; element_tag: string; path: string; count: number }[];
  visitsByDay: { date: string; count: number }[];
  visitsByHour: { hour: string; count: number }[];
  referrers: { referrer: string; source: string; count: number }[];
}

interface Props {
  password: string;
  onLogout: () => void;
}

const st: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#080c14', color: 'white', fontFamily: "'Inter', system-ui, sans-serif", padding: '0' },
  header: { background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: '18px', fontWeight: '700', background: 'linear-gradient(135deg, #6366f1, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 },
  body: { padding: '32px', maxWidth: '1400px', margin: '0 auto' },
  grid4: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' },
  card: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '24px' },
  cardLabel: { color: 'rgba(255,255,255,0.45)', fontSize: '13px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' },
  cardValue: { fontSize: '36px', fontWeight: '800', color: 'white' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' },
  sectionTitle: { fontSize: '15px', fontWeight: '600', color: 'rgba(255,255,255,0.75)', marginBottom: '16px' },
  bar: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' },
  barLabel: { fontSize: '12px', color: 'rgba(255,255,255,0.5)', width: '90px', flexShrink: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' },
  barFill: { height: '8px', borderRadius: '4px', background: 'linear-gradient(90deg, #6366f1, #a78bfa)', transition: 'width 0.5s ease' },
  barCount: { fontSize: '12px', color: 'rgba(255,255,255,0.35)', minWidth: '30px' },
  btnIcon: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', borderRadius: '8px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  table: { width: '100%', borderCollapse: 'collapse' as const },
  th: { textAlign: 'left' as const, padding: '10px 12px', fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' as const, borderBottom: '1px solid rgba(255,255,255,0.06)' },
  td: { padding: '10px 12px', fontSize: '13px', color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.04)' },
  badge: { display: 'inline-block', background: 'rgba(99,102,241,0.2)', color: '#a78bfa', borderRadius: '6px', padding: '3px 8px', fontSize: '11px', fontWeight: '600' },
};

function BarChart({ data, labelKey, valueKey, color = 'linear-gradient(90deg, #6366f1, #a78bfa)' }: { data: any[], labelKey: string, valueKey: string, color?: string }) {
  const max = Math.max(...data.map(d => d[valueKey]), 1);
  return (
    <div>
      {data.map((d, i) => (
        <div key={i} style={st.bar}>
          <span style={st.barLabel} title={String(d[labelKey])}>{d[labelKey] || '—'}</span>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
            <div style={{ ...st.barFill, background: color, width: `${(d[valueKey] / max) * 100}%` }} />
          </div>
          <span style={st.barCount}>{d[valueKey]}</span>
        </div>
      ))}
    </div>
  );
}

function HourChart({ data }: { data: { hour: string; count: number }[] }) {
  // Fill 24 hours
  const full = Array.from({ length: 24 }, (_, i) => {
    const h = String(i).padStart(2, '0');
    const found = data.find(d => d.hour === h);
    return { hour: h, count: found ? found.count : 0 };
  });
  const max = Math.max(...full.map(d => d.count), 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '80px' }}>
      {full.map((d, i) => (
        <div key={i} title={`${d.hour}h: ${d.count} visitas`} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
          <div style={{ width: '100%', background: d.count > 0 ? 'linear-gradient(180deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.05)', borderRadius: '3px 3px 0 0', height: `${(d.count / max) * 100}%`, minHeight: d.count > 0 ? '4px' : '2px' }} />
        </div>
      ))}
    </div>
  );
}

function DayChart({ data }: { data: { date: string; count: number }[] }) {
  const max = Math.max(...data.map(d => d.count), 1);
  const last14 = data.slice(-14);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '80px' }}>
      {last14.map((d, i) => (
        <div key={i} title={`${d.date}: ${d.count} visitas`} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
          <div style={{ width: '100%', background: 'linear-gradient(180deg, #10b981, #059669)', borderRadius: '3px 3px 0 0', height: `${(d.count / max) * 100}%`, minHeight: d.count > 0 ? '4px' : '2px' }} />
        </div>
      ))}
    </div>
  );
}

export default function StatsDashboard({ password, onLogout }: Props) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [customRange, setCustomRange] = useState({ start: '', end: '' });

  const fetchStats = async (period?: string, range?: { start: string; end: string }) => {
    setLoading(true);
    setError(null);
    
    let startDate = '';
    let endDate = '';

    const activePeriod = period || filter;
    const activeRange = range || customRange;

    if (activePeriod !== 'all' && activePeriod !== 'custom') {
      const end = new Date();
      const start = new Date();
      if (activePeriod === 'today') start.setHours(0, 0, 0, 0);
      else if (activePeriod === '7d') start.setDate(start.getDate() - 7);
      else if (activePeriod === '15d') start.setDate(start.getDate() - 15);
      else if (activePeriod === '30d') start.setDate(start.getDate() - 30);
      
      startDate = start.toISOString();
      endDate = end.toISOString();
    } else if (activePeriod === 'custom' && activeRange.start) {
      startDate = new Date(activeRange.start).toISOString();
      if (activeRange.end) endDate = new Date(activeRange.end).toISOString();
    }

    const urls = ['/api/stats', '/stats'];
    let lastError = null;

    for (const url of urls) {
      try {
        console.log(`[Dashboard] Tentando buscar stats em: ${url}`);
        const resp = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password, startDate, endDate }),
        });
        
        const contentType = resp.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await resp.text();
          console.error(`Resposta não é JSON de ${url}:`, text.slice(0, 200));
          throw new Error(`O servidor em ${url} não retornou JSON.`);
        }

        if (!resp.ok) {
          let errorMsg = 'Erro ao buscar dados';
          try {
            const errData = await resp.json();
            errorMsg = typeof errData.error === 'object' ? JSON.stringify(errData.error) : (errData.error || errorMsg);
          } catch (parseErr) {
            errorMsg = `Erro ${resp.status}: ${resp.statusText}`;
          }
          throw new Error(errorMsg);
        }

        const data = await resp.json();
        setStats(data.stats);
        setLoading(false);
        return; // Sucesso!
      } catch (e: any) {
        console.warn(`[Dashboard] Falha ao tentar ${url}:`, e.message);
        lastError = e;
        // Se for 404, tenta a próxima URL. Se for outro erro, ou se as URLs acabarem, joga o erro.
        if (!e.message.includes('404') && url === urls[0]) break; 
      }
    }

    if (lastError) {
      console.error('[Dashboard] Todas as tentativas falharam:', lastError);
      setError(lastError.message || 'Erro de conexão com o servidor');
    }
    setLoading(false);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    if (newFilter !== 'custom') {
      fetchStats(newFilter);
    }
  };

  const handleCustomRangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStats('custom');
  };

  const handleReset = async () => {
    if (!window.confirm('Tem certeza que deseja resetar todas as estatísticas? Esta ação não pode ser desfeita.')) return;
    
    setLoading(true);
    try {
      const resp = await fetch('/api/stats/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!resp.ok) throw new Error('Erro ao resetar dados');
      fetchStats('all');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return (
    <div style={{ ...st.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
        <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '12px' }}>Carregando dados...</p>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (error) return (
    <div style={{ ...st.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#ef4444' }}>Erro: {error}</p>
        <button onClick={fetchStats} style={{ marginTop: '12px', ...st.btnIcon, display: 'inline-flex' }}>Tentar novamente</button>
      </div>
    </div>
  );

  if (!stats) return null;

  return (
    <div style={st.page}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      {/* Header */}
      <div style={st.header}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
          <h1 style={st.title}>📊 Analytics Dashboard</h1>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: '500' }}>v01.07 - Direct Form & Success Page & IP Block</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ ...st.btnIcon, color: '#ef4444' }} onClick={handleReset} title="Resetar Tudo">
            <Trash2 size={16} />
          </button>
          <button style={st.btnIcon} onClick={() => fetchStats()} title="Atualizar">
            <RefreshCw size={16} />
          </button>
          <button style={st.btnIcon} onClick={onLogout} title="Sair">
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <div style={st.body}>
        {/* Filters Area */}
        <div style={{ marginBottom: '28px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600', textTransform: 'uppercase' }}>Período</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { id: 'all', label: 'Tudo' },
                { id: 'today', label: 'Hoje' },
                { id: '7d', label: '7 dias' },
                { id: '15d', label: '15 dias' },
                { id: '30d', label: '30 dias' },
                { id: 'custom', label: 'Personalizado' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => handleFilterChange(f.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: filter === f.id ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.05)',
                    border: '1px solid',
                    borderColor: filter === f.id ? 'transparent' : 'rgba(255,255,255,0.1)',
                    color: filter === f.id ? 'white' : 'rgba(255,255,255,0.6)',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {filter === 'custom' && (
            <form onSubmit={handleCustomRangeSubmit} style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', marginLeft: '8px', animation: 'fadeIn 0.3s ease' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>Início</span>
                <input
                  type="date"
                  value={customRange.start}
                  onChange={e => setCustomRange({ ...customRange, start: e.target.value })}
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '6px 10px', color: 'white', fontSize: '13px', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>Fim</span>
                <input
                  type="date"
                  value={customRange.end}
                  onChange={e => setCustomRange({ ...customRange, end: e.target.value })}
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '6px 10px', color: 'white', fontSize: '13px', outline: 'none' }}
                />
              </div>
              <button
                type="submit"
                style={{ background: 'white', color: 'black', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
              >
                Filtrar
              </button>
            </form>
          )}
          <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }`}</style>
        </div>
        {/* Stat Cards */}
        <div style={st.grid4}>
          {[
            { icon: <Users size={16} />, label: 'Total de Visitas', value: stats.totalVisits, color: '#6366f1' },
            { icon: <TrendingUp size={16} />, label: 'Hoje', value: stats.todayVisits, color: '#10b981' },
            { icon: <MousePointer size={16} />, label: 'Total de Cliques', value: stats.totalClicks, color: '#f59e0b' },
            { icon: <Globe size={16} />, label: 'IPs Únicos', value: stats.visitorsByIp.length, color: '#ec4899' },
          ].map(({ icon, label, value, color }) => (
            <div key={label} style={st.card}>
              <div style={{ ...st.cardLabel, color }}>
                {icon}
                {label}
              </div>
              <div style={st.cardValue}>{value.toLocaleString('pt-BR')}</div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div style={st.grid2}>
          <div style={st.card}>
            <p style={st.sectionTitle}>Visitas por Dia (últimos 14 dias)</p>
            {stats.visitsByDay.length > 0 ? (
              <>
                <DayChart data={stats.visitsByDay} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{stats.visitsByDay[0]?.date}</span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{stats.visitsByDay[stats.visitsByDay.length - 1]?.date}</span>
                </div>
              </>
            ) : <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>Sem dados ainda.</p>}
          </div>
          <div style={st.card}>
            <p style={st.sectionTitle}><Clock size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />Horário de Pico (Brasil)</p>
            {stats.visitsByHour.length > 0 ? (
              <>
                <HourChart data={stats.visitsByHour} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>00h</span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>23h</span>
                </div>
              </>
            ) : <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>Sem dados ainda.</p>}
          </div>
        </div>

        {/* Second Section */}
        <div style={st.grid2}>
          {/* Referrers */}
          <div style={st.card}>
            <p style={st.sectionTitle}>Origens de Tráfego</p>
            {stats.referrers.length > 0 ? (
              <BarChart data={stats.referrers.slice(0, 8)} labelKey="source" valueKey="count" color="linear-gradient(90deg, #10b981, #34d399)" />
            ) : <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>Sem dados ainda.</p>}
          </div>
          {/* Top IPs */}
          <div style={st.card}>
            <p style={st.sectionTitle}>Visitantes por IP</p>
            {stats.visitorsByIp.length > 0 ? (
              <BarChart data={stats.visitorsByIp.slice(0, 8)} labelKey="ip" valueKey="count" color="linear-gradient(90deg, #ec4899, #f472b6)" />
            ) : <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>Sem dados ainda.</p>}
          </div>
        </div>

        {/* Clicks Table */}
        <div style={st.card}>
          <p style={st.sectionTitle}>Cliques Mais Registrados</p>
          {stats.topClicks.length > 0 ? (
            <div style={{ overflowX: 'auto' as const }}>
              <table style={st.table}>
                <thead>
                  <tr>
                    <th style={st.th}>Elemento / Ação</th>
                    <th style={st.th}>Página</th>
                    <th style={st.th}>Cliques</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topClicks.slice(0, 30).map((click, i) => (
                    <tr key={i} style={{ transition: 'background 0.2s' }} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <td style={st.td}>
                        <div style={{ fontWeight: '600', color: 'white', marginBottom: '4px' }}>{click.element_text || <span style={{ color: 'rgba(255,255,255,0.25)' }}>—</span>}</div>
                        <span style={st.badge}>{click.element_tag}</span>
                      </td>
                      <td style={st.td}>{click.path}</td>
                      <td style={{ ...st.td, fontWeight: '800', fontSize: '15px', color: '#818cf8' }}>{click.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>Nenhum clique registrado ainda.</p>}
        </div>

        {/* Referrer Details Table */}
        {stats.referrers.length > 0 && (
          <div style={{ ...st.card, marginTop: '16px' }}>
            <p style={st.sectionTitle}>Detalhes de Referrers</p>
            <div style={{ overflowX: 'auto' as const }}>
              <table style={st.table}>
                <thead>
                  <tr>
                    <th style={st.th}>Origem</th>
                    <th style={st.th}>Referrer (URL)</th>
                    <th style={st.th}>Visitas</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.referrers.map((r, i) => (
                    <tr key={i} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <td style={st.td}><span style={{ ...st.badge, background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>{r.source}</span></td>
                      <td style={{ ...st.td, maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{r.referrer}</td>
                      <td style={{ ...st.td, fontWeight: '700', color: '#10b981' }}>{r.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
