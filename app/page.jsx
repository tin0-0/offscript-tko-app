import Link from 'next/link';
export default function Home() {
  return (<>
    <section className="hero w" style={{maxWidth:'none'}}><h1 className="ch">We don’t follow the scene.<br />We create it.</h1>
      <p>OFF SCRIPT TKO is an events, artist management and entertainment brand, representing DJ and producer CalebX.</p>
      <div><Link className="b" href="/book">Book CalebX</Link><Link className="b2" href="/services">Event services</Link></div></section>
    <section className="w"><div className="g">
      <div className="card"><h3>Artist management</h3><p className="mu">CalebX: Amapiano and 3-Step DJ and producer from Gqeberha.</p><Link href="/artists/calebx">View CalebX</Link></div>
      <div className="card"><h3>Event organisation</h3><p className="mu">We plan, coordinate and run your whole event, with DJs, entertainment and partnerships.</p><Link href="/services">See services</Link></div>
      <div className="card"><h3>Simple booking</h3><p className="mu">Send an enquiry, we confirm availability, and you get a quotation.</p><Link href="/bookings">How booking works</Link></div>
    </div></section></>);
}
