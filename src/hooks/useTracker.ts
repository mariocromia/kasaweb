import { useEffect } from 'react';

function getSource(referrer: string): string {
  if (!referrer) return 'direct';
  try {
    const url = new URL(referrer);
    const hostname = url.hostname.toLowerCase();
    if (hostname.includes('google')) return 'google';
    if (hostname.includes('facebook') || hostname.includes('fb.com')) return 'facebook';
    if (hostname.includes('instagram')) return 'instagram';
    if (hostname.includes('twitter') || hostname.includes('t.co')) return 'twitter';
    if (hostname.includes('linkedin')) return 'linkedin';
    if (hostname.includes('whatsapp')) return 'whatsapp';
    return url.hostname;
  } catch {
    return 'unknown';
  }
}

export function useTracker() {
  useEffect(() => {
    // 1. Registrar visita (com trava)
    const loadKey = 'kasaweb_track_load';
    const now = Date.now();
    const lastLoad = sessionStorage.getItem(loadKey);
    const shouldTrackVisit = !lastLoad || (now - parseInt(lastLoad)) > 1000;

    if (shouldTrackVisit) {
      sessionStorage.setItem(loadKey, now.toString());
      const referrer = document.referrer;
      const source = getSource(referrer);

      fetch('/api/track/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: window.location.pathname,
          referrer,
          source,
          userAgent: navigator.userAgent,
        }),
      }).catch(() => {});
    }

    // 2. Rastrear cliques globais (sempre anexar)
    const handleClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement;
      if (!target) return;

      if (window.location.pathname === '/3382') return;

      let trackValue = null;
      let project = null;
      
      let current: HTMLElement | null = target;
      while (current && current.tagName !== 'BODY') {
        if (!trackValue && current.getAttribute) trackValue = current.getAttribute('data-track');
        if (!project && current.getAttribute) project = current.getAttribute('data-project');
        if (trackValue || project) break;
        current = current.parentElement;
      }

      let elementText = trackValue || project || (target.innerText || target.getAttribute('aria-label') || target.getAttribute('title') || '').slice(0, 100);
      const elementTag = target.tagName.toLowerCase();

      if (!trackValue && project) {
        elementText = `Acessar Projeto - ${project}`;
      }

      if (elementText) {
        console.log(`[Tracker] Clique detectado: "${elementText}"`);
        fetch('/api/track/click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: window.location.pathname,
            elementText,
            elementTag,
            x: Math.round(e.clientX),
            y: Math.round(e.clientY),
          }),
          keepalive: true,
        }).catch(() => {});
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
}
