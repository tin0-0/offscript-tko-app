import { db, getArtists } from '../../../lib/data';
import { requireAdmin } from '../../../lib/auth';
import { DEFAULT_TERMS } from '../../../lib/terms';
import { saveSettings } from '../actions';
export const dynamic = 'force-dynamic';
export default async function Settings({ searchParams }) {
  await requireAdmin(); const a = (await getArtists())[0], s = (await db().from('settings').select('*').eq('id', 1).single()).data || {}, cm = s.commission_pct ?? 20;
  const sp = p => `Artist receives R${Math.round(p * (100 - cm) / 100).toLocaleString('en-ZA')} · OFF SCRIPT TKO earns R${Math.round(p * cm / 100).toLocaleString('en-ZA')}`;
  return (<section className="w"><h1 className="ch">Pricing and settings</h1>{searchParams.saved && <p className="notice">Saved.</p>}
    <form className="card" action={saveSettings}><input type="hidden" name="aid" value={a.id || ''} /><h3>{a.name} booking prices (R)</h3><div className="f2"><div><label>Eastern Cape</label><input name="ec" type="number" defaultValue={a.prices.ec} /></div><div><label>Rest of South Africa</label><input name="rsa" type="number" defaultValue={a.prices.rsa} /></div>
      <div><label>Commission %</label><input name="comm" type="number" step="0.1" defaultValue={cm} /></div><div><label>Deposit %</label><input name="dep" type="number" defaultValue={s.deposit_pct ?? 50} /></div></div>
      <p className="mu">Private split: Eastern Cape: {sp(a.prices.ec)}. Rest of SA: {sp(a.prices.rsa)}.</p>
      <label>Bank details (shown on quotations once status is Quoted)</label><textarea name="bank" defaultValue={s.bank || ''} /><label>Terms and conditions</label><textarea name="terms" style={{ minHeight:180 }} defaultValue={s.terms || DEFAULT_TERMS} /><p><button className="b">Save</button></p></form></section>);
}
