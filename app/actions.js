'use server';
import { db } from '../lib/data';
export async function submitEnquiry(prev, fd) {
  const d = Object.fromEntries(fd); const type = d.type; delete d.type;
  const sb = db();
  if (!sb) return { ok:false, msg:'Database not connected yet (see README).' };
  const { error } = await sb.from('bookings').insert({ type, region:d.region, event_date:d.date || null, data:d, status:'New' });
  if (error) return { ok:false, msg:'Something went wrong. Please contact us on WhatsApp.' };
  if (process.env.RESEND_API_KEY) await fetch('https://api.resend.com/emails', { method:'POST',
    headers:{ Authorization:'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type':'application/json' },
    body:JSON.stringify({ from:process.env.NOTIFY_FROM, to:process.env.NOTIFY_TO, subject:`New ${type} enquiry: ${d.name}`, text:JSON.stringify(d, null, 2) }) }).catch(() => {});
  return { ok:true };
}
