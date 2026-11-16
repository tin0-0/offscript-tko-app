import Link from 'next/link';
import { getArtists, money, IMG } from '../../lib/data';
export const dynamic = 'force-dynamic';
export default async function Artists() {
  const list = await getArtists();
  return (<section className="w"><h1 className="ch">Artists</h1><p className="mu">Managed by OFF SCRIPT TKO. More artists coming soon.</p>
    <div className="g">{list.map(a => (<div className="card" key={a.slug}>{IMG[a.slug] ? <img className="pic" src={IMG[a.slug]} alt={a.name} style={{aspectRatio:'4/5'}} /> : <div className="ph">{a.name[0]}</div>}<h3>{a.name}</h3>
      <p className="mu">DJ • Producer • Amapiano & 3-Step · From {money('R', a.prices.ec)}</p><Link className="b" href={`/artists/${a.slug}`}>View profile</Link></div>))}</div></section>);
}
