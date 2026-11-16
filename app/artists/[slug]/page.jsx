import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArtists, money, R, LINKS, CATALOG } from '../../../lib/data';
export const dynamic = 'force-dynamic';
export default async function Artist({ params }) {
  const a = (await getArtists()).find(x => x.slug === params.slug);
  if (!a) notFound();
  return (<section className="w"><div className="g" style={{ gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', alignItems:'start' }}>
    <img className="pic" src="/studio.jpg" alt={a.name} />
    <div><h1 className="ch">{a.name}</h1><p className="mu">DJ • Producer • Performer · Amapiano • 3-Step · Gqeberha, South Africa</p>
      {a.bio.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
      <p>Typical set length: 45–60 minutes (flexible). Suited to festivals, nightclubs, concert stages, corporate and cultural events.</p>
      <p><a className="b" href={LINKS.spotify}>Spotify</a> <a className="b2" href={LINKS.apple}>Apple Music</a> <a className="b2" href={LINKS.youtube}>YouTube</a></p>
      <div className="card"><h3>Booking rates</h3>{Object.keys(R).map(k => <div className="row" key={k}><span>{R[k][0]}</span><b>{money('R', a.prices[k])}</b></div>)}<p className="mu">Travel and accommodation are not included. <Link href="/bookings">Booking terms</Link></p></div>
      <Link className="b" href="/book">Book {a.name}</Link></div></div>
    <h2 style={{marginTop:36}}>Music</h2><div className="g">{CATALOG.map(([t, l]) => <div className="card" key={t}><h3>{t}</h3><ul>{l.map(x => <li key={x}>{x}</li>)}</ul></div>)}</div>
    <p className="mu">Catalogue listed from CalebX’s Apple Music profile. <a href={LINKS.apple}>See the full list</a></p>
    <h2 style={{marginTop:36}}>Reach</h2><div className="g"><div className="card"><h3>TikTok @calebxrsa</h3><p>69,000 followers · 1.2M likes</p></div><div className="card"><h3>Instagram @calebxrsa</h3><p>6,124 followers · 11 posts</p></div></div><p className="mu">Figures as at 13 November 2026.</p>
    <h2 style={{marginTop:36}}>Technical rider</h2><div className="g"><div className="card"><h3>Equipment</h3><ul><li>Preferred: Pioneer XDJ-RX3</li><li>Also OK: XDJ-XZ, XDJ-RX2</li><li>Mixers: DJM-900 Nexus / Nexus 2 / DJM-A9</li><li>Players: 2 × CDJ-2000NXS2 or 2 × CDJ-3000</li></ul></div><div className="card"><h3>Venue</h3><ul><li>2 × booth monitors facing the DJ</li><li>Professional sound system</li><li>Clean, stable power</li><li>Secure booth with table or stand</li><li>Suitable stage lighting</li></ul></div></div><p className="mu">Confirm equipment with management before the event.</p>
    <div className="gal" style={{marginTop:24}}>{['bw','crowd','hero','chair'].map(n => <img className="pic" key={n} src={`/${n}.jpg`} alt={`${a.name} performing`} />)}</div></section>);
}
