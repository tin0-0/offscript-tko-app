import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
export async function middleware(req) {
  let res = NextResponse.next({ request: req });
  const sb = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, { cookies: {
    getAll: () => req.cookies.getAll(),
    setAll: l => { l.forEach(({ name, value }) => req.cookies.set(name, value)); res = NextResponse.next({ request: req }); l.forEach(({ name, value, options }) => res.cookies.set(name, value, options)); } } });
  await sb.auth.getUser();
  return res;
}
export const config = { matcher: ['/admin/:path*', '/login'] };
