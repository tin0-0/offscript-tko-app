'use client';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { submitEnquiry } from '../actions';
import { R } from '../../lib/data';
const F = (n, l, t = 'text', req = true) => <div><label>{l}</label><input name={n} type={t} required={req} /></div>;
export default function BookForm({ artists }) {
  const [t, setT] = useState('artist');
  const [st, act] = useFormState(submitEnquiry, null);
  if (st?.ok) return <div className="card"><h2 className="ch">Enquiry received</h2><p>Thank you. This is not a confirmed booking yet. We will check availability and reply by email or WhatsApp.</p></div>;
  return (<>
    <div className="tabs"><button type="button" className={'b2' + (t === 'artist' ? ' on' : '')} onClick={() => setT('artist')}>Book an artist<br /><small>CalebX performance</small></button>
      <button type="button" className={'b2' + (t === 'event' ? ' on' : '')} onClick={() => setT('event')}>Book OFF SCRIPT TKO<br /><small>We organise your whole event</small></button></div>
    <p className="notice">{t === 'artist' ? 'Submitting an enquiry does not confirm a booking. We check availability, confirm the details and terms, and the deposit must clear first.' : 'Tell us about your event and we will prepare a full quotation: planning, DJs, entertainment, sound, lighting and event management.'}</p>
    <form className="card" action={act} key={t}><input type="hidden" name="type" value={t} />
      {t === 'artist' && <><label>Artist</label><select name="artist">{artists.map(a => <option key={a.slug} value={a.slug}>{a.name}</option>)}</select></>}
      <div className="f2">{F('name','Your name')}{F('org','Organisation','text',false)}{F('email','Email','email')}{F('phone','Phone / WhatsApp','tel')}{F('evName','Event name', 'text', t === 'artist')}{F('evType','Event type')}{F('date','Event date','date')}{F('loc','Venue and city')}
        {t === 'artist' ? <>{F('guests','Expected audience size','number')}{F('dur','Requested set length')}{F('setTime','Preferred set time','text',false)}</> : <>{F('guests','Expected guests','number')}{F('budget','Estimated budget')}</>}</div>
      <label>Region</label><select name="region">{Object.keys(R).map(k => <option key={k} value={k}>{R[k][0]}</option>)}</select>
      {t === 'artist' ? <><label>Travel and accommodation needs</label><textarea name="travel" /><label>Production notes or extra requirements</label><textarea name="notes" /></>
        : <><label>What do you need? (DJs, sound, lighting, entertainment, venue, full event management)</label><textarea name="needs" required /></>}
      {st?.msg && <p style={{ color:'#e6c04a' }}>{st.msg}</p>}
      <p><button className="b">Send enquiry</button></p></form></>);
}
