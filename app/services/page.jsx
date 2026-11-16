import Link from 'next/link';
const S = [['Event planning','Concept, suppliers, run sheet and budget.'],['Event hosting','Professional MCs and hosts.'],['Private events','Birthdays, weddings and celebrations.'],['Corporate events','Year-end functions, launches and activations.'],['Clubs','DJs, line-ups and promotion.'],['Festivals','Artists, sound, lighting and stage management.']];
export default function Services() {
  return (<section className="w"><h1 className="ch">Event services</h1><p className="mu">Need DJs, sound, lighting, entertainment, venues or full event management? Tell us and we quote the whole event.</p>
    <div className="g">{S.map(s => <div className="card" key={s[0]}><h3>{s[0]}</h3><p className="mu">{s[1]}</p></div>)}</div>
    <p><Link className="b" href="/book">Request an event quote</Link></p></section>);
}
