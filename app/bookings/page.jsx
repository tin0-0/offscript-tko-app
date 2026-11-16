import Link from 'next/link';
import { getArtists, money, R } from '../../lib/data';
export const dynamic = 'force-dynamic';
export default async function Bookings() {
  const a = (await getArtists())[0];
  return (<section className="w"><h1 className="ch">Bookings</h1>
    <div className="card"><h2>CalebX rates</h2><table><tbody>{Object.keys(R).map(k => <tr key={k}><td>{R[k][0]}</td><td><b>{money('R', a.prices[k])}</b></td></tr>)}</tbody></table>
      <p className="mu">Bookings are currently taken in South Africa only. If air travel is needed, the client arranges and pays for CalebX’s return flights and suitable accommodation, confirmed in writing before the booking is finalised. Rates and inclusions are reconfirmed in writing before any engagement is finalised.</p></div>
    <div className="card"><h2>How booking works</h2><ol><li>Send an enquiry. An enquiry does not confirm a booking.</li><li>We check availability and send you a quotation.</li><li>Payment details are sent only after we accept your enquiry.</li><li>A 50% deposit secures the date.</li><li>The remaining 50% is due at least 7 days before the event.</li></ol><p className="notice">A booking is confirmed only when we have accepted it in writing, you have accepted the terms and the deposit has cleared.</p></div>
    <div className="card"><h2>Cancellation and refunds</h2><ul><li>Deposits are generally non-refundable if the client cancels, subject to applicable law.</li><li>If OFF SCRIPT TKO or CalebX cancels, the client receives a full refund.</li><li>Rescheduling depends on availability and written agreement.</li><li>If the balance is not paid by the deadline, the booking may be cancelled.</li><li>Exceptional circumstances are considered individually.</li></ul><p className="mu">Nothing here limits your rights under South African consumer protection law.</p></div>
    <p><Link className="b" href="/book">Make an enquiry</Link></p></section>);
}
