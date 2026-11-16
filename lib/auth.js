import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export const authClient = () => { const c = cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, { cookies: {
    getAll: () => c.getAll(), setAll: l => { try { l.forEach(({ name, value, options }) => c.set(name, value, options)); } catch {} } } }); };
export const isAdmin = u => !!u?.email && (process.env.ADMIN_EMAILS || '').toLowerCase().split(',').map(s => s.trim()).includes(u.email.toLowerCase());
export async function requireAdmin() { const { data:{ user } } = await authClient().auth.getUser(); if (!isAdmin(user)) redirect('/login'); return user; }
