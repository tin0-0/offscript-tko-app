import './globals.css';
import './mobile.css';
import Link from 'next/link';
import Nav from './Nav';
import { LINKS } from '../lib/data';
export const metadata = { title:'OFF SCRIPT TKO | Events • Artist Management • Entertainment', description:'OFF SCRIPT TKO: events, artist management and entertainment. Book CalebX.' };
export default function Layout({ children }) {
  const L = [['/','Home'],['/artists','Artists'],['/bookings','Bookings'],['/services','Event Services'],['/book','Book Now'],['/contact','Contact']];
  return (<html lang="en"><body>
    <header><Link href="/"><img className="logo" src="/logo.jpg" alt="OFF SCRIPT TKO" /></Link><Nav links={L} /></header>
    {children}
    <footer><span>© OFF SCRIPT TKO · Gqeberha, South Africa</span><span><a href={LINKS.instagram}>Instagram</a> · <a href={LINKS.tiktok}>TikTok</a> · <a href={LINKS.youtube}>YouTube</a></span></footer>
  </body></html>);
}
