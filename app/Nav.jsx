'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
export default function Nav({ links }) {
  const [open, setOpen] = useState(false); const path = usePathname();
  const hide = path === '/book' || path === '/login' || path.startsWith('/admin');
  return (<>
    <button className="menu-btn" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
    <nav id="nav" className={'nav' + (open ? ' open' : '')}>{links.map(l => <Link key={l[0]} href={l[0]} onClick={() => setOpen(false)} aria-current={path === l[0] ? 'page' : undefined}>{l[1]}</Link>)}</nav>
    {!hide && <Link className="b sticky" href="/book">Book now</Link>}</>);
}
