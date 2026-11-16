import { db } from '../../../lib/data';
import { requireAdmin } from '../../../lib/auth';
import { blockDate, unblockDate } from '../actions';
export const dynamic = 'force-dynamic';
export default async function Availability() {
  await requireAdmin(); const sb = db(), t = new Date().toISOString().slice(0, 10);
  const C = (await sb.from('bookings').select('id,event_date,data').eq('status', 'Confirmed').gte('event_date', t).order('event_date')).data || [];
  const K = (await sb.from('blocked_dates').select('day').gte('day', t).order('day')).data || [];
  return (<section className="w"><h1 className="ch">Availability</h1><div className="g" style={{ alignItems:'start' }}>
    <div className="card"><h3>Confirmed bookings</h3>{C.map(b => <div className="row" key={b.id}><span>{b.event_date}</span><span>{b.data?.name}</span></div>)}{!C.length && <p className="mu">None upcoming.</p>}</div>
    <div className="card"><h3>Blocked dates</h3>{K.map(k => <form className="row" key={k.day} action={unblockDate.bind(null, k.day)}><span>{k.day}</span><button className="b2">Unblock</button></form>)}
      <form action={blockDate}><label>Block a date</label><input name="day" type="date" required /><p><button className="b">Block</button></p></form></div></div>
    <p className="mu">A booking can’t be confirmed on a date that is already confirmed or blocked.</p></section>);
}
