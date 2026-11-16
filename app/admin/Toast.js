'use client';
import { useEffect, useState } from 'react';
export default function Toast() {
  const [m, setM] = useState(null);
  useEffect(() => {
    const orig = window.fetch; let timer;
    const show = (t, bad) => { setM({ t, bad }); clearTimeout(timer); if (t !== 'Saving…') timer = setTimeout(() => setM(null), 3500); };
    window.fetch = async (u, o) => {
      const h = o && o.headers;
      if (!(h && (h['Next-Action'] || h['next-action']))) return orig(u, o);
      show('Saving…');
      try {
        const r = await orig(u, o); const rd = r.headers.get('x-action-redirect') || '';
        if (rd.startsWith('/login')) setM(null);
        else if (rd.includes('err=')) show('Not saved: that date is already booked or blocked.', true);
        else if (r.ok || rd || r.status === 303) show('Saved ✓');
        else show('Something went wrong. Please try again.', true);
        return r;
      } catch (e) { show('Network error. Please try again.', true); throw e; }
    };
    return () => { window.fetch = orig; clearTimeout(timer); };
  }, []);
  return m ? <div role="status" style={{ position:'fixed', right:16, bottom:16, zIndex:50, padding:'12px 18px', borderRadius:12, background:'#111113', border:'1px solid ' + (m.bad ? '#e6c04a' : '#3a8f4f'), color:m.bad ? '#e6c04a' : '#7bd88f', fontWeight:700, boxShadow:'0 6px 24px rgba(0,0,0,.5)' }}>{m.t}</div> : null;
}