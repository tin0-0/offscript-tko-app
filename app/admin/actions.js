'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '../../lib/data';
import { authClient, isAdmin, requireAdmin } from '../../lib/auth';
const done = () => revalidatePath('/admin', 'layout');
export async function login(prev, fd) {
  const sb = authClient();
  const { error } = await sb.auth.signInWithPassword({ email:fd.get('email'), password:fd.get('password') });
  if (error) return { msg:'Login failed: ' + error.message };
  const { data:{ user } } = await sb.auth.getUser();
  if (!isAdmin(user)) { await sb.auth.signOut(); return { msg:'This account is not an admin.' }; }
  redirect('/admin');
}
export async function logout() { await authClient().auth.signOut(); redirect('/login'); }
export async function updateBooking(id, fd) {
  await requireAdmin(); const sb = db(); const status = fd.get('status');
  const { data:b } = await sb.from('bookings').select('event_date').eq('id', id).single();
  if (status === 'Confirmed' && b?.event_date) {
    const { data:c } = await sb.from('bookings').select('id').eq('status', 'Confirmed').eq('event_date', b.event_date).neq('id', id);
    const { data:k } = await sb.from('blocked_dates').select('day').eq('day', b.event_date);
    if (c?.length || k?.length) redirect(`/admin/b/${id}?err=clash`);
  }
  await sb.from('bookings').update({ status, price:+fd.get('price') || 0, paid:+fd.get('paid') || 0 }).eq('id', id);
  done(); redirect(`/admin/b/${id}`);
}
async function exp(id, f) { const sb = db(); const { data } = await sb.from('bookings').select('expenses').eq('id', id).single(); await sb.from('bookings').update({ expenses:f(data?.expenses || []) }).eq('id', id); done(); }
export async function addExpense(id, fd) { await requireAdmin(); if (fd.get('d') && fd.get('a')) await exp(id, l => [...l, { d:fd.get('d'), a:+fd.get('a') }]); }
export async function removeExpense(id, i) { await requireAdmin(); await exp(id, l => l.filter((_, j) => j !== i)); }
export async function saveSettings(fd) {
  await requireAdmin(); const sb = db();
  await sb.from('artists').update({ prices:{ ec:+fd.get('ec'), rsa:+fd.get('rsa') } }).eq('id', fd.get('aid'));
  await sb.from('settings').upsert({ id:1, commission_pct:+fd.get('comm'), deposit_pct:+fd.get('dep'), bank:fd.get('bank'), terms:fd.get('terms') });
  done(); redirect('/admin/settings?saved=1');
}
export async function blockDate(fd) { await requireAdmin(); if (fd.get('day')) await db().from('blocked_dates').upsert({ day:fd.get('day') }); done(); }
export async function unblockDate(day) { await requireAdmin(); await db().from('blocked_dates').delete().eq('day', day); done(); }