import { LINKS } from '../../lib/data';
export default function Contact() {
  return (<section className="w"><h1 className="ch">Contact</h1><p className="mu">Artist manager: Jermaine</p><div className="g">
    <div className="card"><h3>WhatsApp</h3><a href="https://wa.me/27826286362">+27 82 628 6362</a></div>
    <div className="card"><h3>Bookings email</h3><a href="mailto:calebxbookings@gmail.com">calebxbookings@gmail.com</a></div>
    <div className="card"><h3>Social</h3><p><a href={LINKS.instagram}>Instagram</a> · <a href={LINKS.tiktok}>TikTok</a> · <a href={LINKS.youtube}>YouTube</a></p></div></div></section>);
}
