import Link from 'next/link';
import { db } from '../../lib/data';
import { requireAdmin } from '../../lib/auth';
export const pay = (b, t) => t > 0 && b.paid >= t ? 'Paid in full' : b.paid > 0 ? 'Deposit received' : 'Pending';
export const total = b => +b.price + (b.expenses || []).reduce((a, e) => a + +e.a, 0);
const R = n => 'R' + Math.round(n).toLocaleString('en-ZA');
export default async function Dash() {
  await requireAdmin(); const sb = db();
  const B = (await sb.from('bookings').select('*').order('created_at', { ascending:false })).data || [];
  const cm = (await sb.from('settings').select('commission_pct').eq('id', 1).single()).data?.commission_pct ?? 20;
  const C = B.filter(b => b.status === 'Confirmed'), today = new Date().toISOString().slice(0, 10), sum = (l, f) => l.reduce((a, b) => a + f(b), 0);
  const taken = new Set(C.map(b => b.event_date));
  const S = [['New enquiries', B.filter(b => b.status === 'New').length], ['Pending quotations', B.filter(b => b.status === 'Quoted').length], ['Confirmed bookings', C.length], ['Upcoming events', C.filter(b => b.event_date >= today).length],
    ['Booking revenue', R(sum(C, total))], ['Deposits received', R(sum(B.filter(b => b.status !== 'Cancelled'), b => +b.paid))], ['Outstanding balances', R(sum(C, b => total(b) - b.paid))], ['OFF SCRIPT TKO earnings (private)', R(sum(C.filter(b => b.type === 'artist'), b => b.price * cm / 100))]];
  return (<section className="w"><div className="g">{S.map(s => <div className="card" key={s[0]}><span className="mu">{s[0]}</span><div style={{ fontSize:'1.6rem', fontWeight:800 }}>{s[1]}</div></div>)}</div>
    <h2 style={{ marginTop:28 }}>Bookings</h2><div className="card" style={{ overflowX:'auto' }}><table><thead><tr><th>Client</th><th>Type</th><th>Date</th><th>Status</th><th>Payment</th></tr></thead><tbody>
      {B.map(b => <tr key={b.id}><td><Link href={`/admin/b/${b.id}`}>{b.data?.name}</Link></td><td>{b.type === 'artist' ? 'CalebX' : 'Event'}</td><td>{b.event_date}{b.status !== 'Confirmed' && taken.has(b.event_date) ? ' ⚠ taken' : ''}</td><td>{b.status}</td><td>{pay(b, total(b))}</td></tr>)}
      {!B.length && <tr><td colSpan="5" className="mu">No enquiries yet.</td></tr>}</tbody></table></div></section>);
}
