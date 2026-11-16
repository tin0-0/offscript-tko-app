import { db, getArtists } from '../../../../lib/data';
import { requireAdmin } from '../../../../lib/auth';
import { DEFAULT_TERMS } from '../../../../lib/terms';
import { updateBooking, addExpense, removeExpense } from '../../actions';
import { total, pay } from '../../page';
import PrintBtn from '../PrintBtn';
const L = { name:'Name', org:'Organisation', email:'Email', phone:'Phone', evName:'Event', evType:'Type', date:'Date', loc:'Venue', guests:'Guests', dur:'Set length', setTime:'Set time', budget:'Budget', travel:'Travel needs', notes:'Notes', needs:'Needs' };
const R = n => 'R' + Number(n).toLocaleString('en-ZA', { minimumFractionDigits:2, maximumFractionDigits:2 });
export default async function Booking({ params, searchParams }) {
  await requireAdmin(); const sb = db();
  const b = (await sb.from('bookings').select('*').eq('id', params.id).single()).data;
  if (!b) return <section className="w"><p>Booking not found.</p></section>;
  const s = (await sb.from('settings').select('*').eq('id', 1).single()).data || {}, cm = s.commission_pct ?? 20, dp = s.deposit_pct ?? 50;
  const rate = (await getArtists())[0].prices[b.region] || 0, ex = b.expenses || [], T = total(b), D = T * dp / 100, d = b.data || {}, sp = b.type === 'artist' ? b.price * cm / 100 : 0;
  const ph = (d.phone || '').replace(/\D/g, '').replace(/^0/, '27'), show = ['Quoted', 'Confirmed'].includes(b.status), inv = b.status === 'Confirmed';
  return (<section className="w"><div className="noprint"><h1 className="ch">{d.name}</h1>
    {searchParams.err && <p className="notice">Not confirmed: that date is already booked or blocked. Check Availability.</p>}
    <div className="g" style={{ gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', alignItems:'start' }}>
      <div className="card"><h3>Client and event</h3>{Object.keys(L).filter(k => d[k]).map(k => <div className="row" key={k}><span className="mu">{L[k]}</span><span>{d[k]}</span></div>)}<div className="row"><span className="mu">Region</span><span>{b.region}</span></div></div>
      <div><form className="card" action={updateBooking.bind(null, b.id)}><h3>Status and payment</h3><label>Status</label><select name="status" defaultValue={b.status}>{['New', 'Quoted', 'Confirmed', 'Cancelled'].map(x => <option key={x}>{x}</option>)}</select>
        <label>Booking price (R){!b.price && rate ? ` · rate card: R${rate}` : ''}</label><input name="price" type="number" defaultValue={b.price || rate} />
        <label>Payment received so far (R). Enter only after it clears in the bank.</label><input name="paid" type="number" defaultValue={b.paid} /><p>Payment: <b>{pay(b, T)}</b></p><button className="b">Save</button></form>
        <div className="card"><h3>Additional expenses</h3>{ex.map((e, i) => <form className="row" key={i} action={removeExpense.bind(null, b.id, i)}><span>{e.d}</span><span>{R(e.a)} <button className="b2">×</button></span></form>)}
          <form action={addExpense.bind(null, b.id)} className="f2"><div><label>Item</label><input name="d" /></div><div><label>Amount (R)</label><input name="a" type="number" /></div><div><br /><button className="b2">Add</button></div></form></div>
        {b.type === 'artist' && <div className="card"><h3>Private split</h3><div className="row"><span>CalebX receives</span><b>{R(b.price - sp)}</b></div><div className="row"><span>OFF SCRIPT TKO earns ({cm}%)</span><b>{R(sp)}</b></div></div>}</div></div>
    <p style={{ marginTop:16 }}><PrintBtn /> <a className="b2" href={`https://wa.me/${ph}?text=${encodeURIComponent(`Hi ${d.name}, here is your OFF SCRIPT TKO quotation. Total ${R(T)}, deposit ${R(D)}.`)}`}>Send via WhatsApp</a> <a className="b2" href={`mailto:${d.email}?subject=OFF SCRIPT TKO quotation`}>Send via email</a></p>
    <p className="mu">Download PDF opens the print dialog: choose “Save as PDF”, then attach the file. Payment details only appear once the status is Quoted or Confirmed.</p></div>
    <div className="doc"><div className="dh"><img src="/logo.jpg" alt="OFF SCRIPT TKO" style={{ height:56, background:'#000' }} /><div style={{ textAlign:'right' }}><b>{inv ? 'INVOICE' : 'QUOTATION'}</b><br />Ref {String(b.id).slice(0, 8)} · {new Date().toISOString().slice(0, 10)}</div></div>
      <p><b>Client</b><br />{d.name}{d.org ? ` · ${d.org}` : ''}<br />{d.email} · {d.phone}</p><p><b>Event</b><br />{d.evName || d.evType} · {b.event_date}<br />{d.loc}{d.dur ? <><br />Set length: {d.dur}</> : null}{d.needs ? <><br />Scope: {d.needs}</> : null}</p>
      <table><tbody><tr><td>{b.type === 'artist' ? 'CalebX performance' : 'Event services'}</td><td align="right">{R(b.price)}</td></tr>{ex.map((e, i) => <tr key={i}><td>{e.d}</td><td align="right">{R(e.a)}</td></tr>)}
        <tr><td><b>Total</b></td><td align="right"><b>{R(T)}</b></td></tr><tr><td>Deposit due ({dp}%)</td><td align="right">{R(D)}</td></tr><tr><td>Paid to date</td><td align="right">{R(b.paid)}</td></tr><tr><td><b>Outstanding balance</b></td><td align="right"><b>{R(T - b.paid)}</b></td></tr></tbody></table>
      {show && <p><b>Payment instructions</b><br />{(s.bank || 'Bank details to be added in Pricing & settings.').split('\n').map((x, i) => <span key={i}>{x}<br /></span>)}Use your name as the payment reference.</p>}
      <p><b>Terms and conditions</b><br /><small>{(s.terms || DEFAULT_TERMS).split('\n').map((x, i) => <span key={i}>{x}<br /></span>)}</small></p></div></section>);
}
