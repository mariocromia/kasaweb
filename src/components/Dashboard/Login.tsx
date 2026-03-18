import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface LoginProps {
  onLogin: (password: string) => void;
  error: boolean;
}

export default function Login({ onLogin, error }: LoginProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 100%)' }}>
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '48px',
        width: '100%',
        maxWidth: '380px',
        backdropFilter: 'blur(20px)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <Lock size={24} color="white" />
          </div>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: '700', margin: '0 0 6px' }}>
            Analytics
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: 0 }}>
            Acesso restrito
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Senha"
            autoFocus
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: error ? '1px solid rgba(239,68,68,0.6)' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              padding: '14px 16px',
              color: 'white',
              fontSize: '16px',
              outline: 'none',
              width: '100%',
              boxSizing: 'border-box',
              letterSpacing: '0.2em',
            }}
          />
          {error && (
            <p style={{ color: '#ef4444', fontSize: '13px', margin: '-8px 0 0', textAlign: 'center' }}>
              Senha incorreta. Tente novamente.
            </p>
          )}
          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none',
              borderRadius: '10px',
              padding: '14px',
              color: 'white',
              fontWeight: '600',
              fontSize: '15px',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
