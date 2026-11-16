import Link from 'next/link';
import { requireAdmin } from '../../lib/auth';
import { logout } from './actions';
import Toast from './Toast';
export const metadata = { robots:'noindex' };
export const dynamic = 'force-dynamic';
const css = `.doc{background:#fff;color:#111;padding:28px;border-radius:6px;margin-top:20px}.doc table{color:#111}.doc td{border-color:#ddd}.dh{display:flex;justify-content:space-between;align-items:center;gap:12px;border-bottom:3px solid #111;padding-bottom:12px;margin-bottom:12px}
.b,.b2{transition:background .15s,color .15s,border-color .15s,transform .1s}.b2:hover{background:var(--btn);color:#000;border-color:transparent}.b:hover{filter:brightness(1.12)}.b:active,.b2:active{transform:scale(.97)}
@media print{header,footer,.noprint{display:none!important}body{background:#fff!important}.doc{margin:0;padding:0}}`;
export default async function AdminLayout({ children }) {
  await requireAdmin();
  return (<><style>{css}</style><Toast /><div className="w noprint" style={{ paddingBottom:0 }}><div className="tabs"><Link className="b2" href="/admin">Dashboard</Link><Link className="b2" href="/admin/availability">Availability</Link><Link className="b2" href="/admin/settings">Pricing & settings</Link>
    <form action={logout}><button className="b2">Log out</button></form></div></div>{children}</>);
}