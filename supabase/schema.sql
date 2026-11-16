-- Run in Supabase: SQL Editor > New query > paste > Run
create table artists (id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null, bio text, prices jsonb not null, created_at timestamptz default now());
create table settings (id int primary key default 1, commission_pct numeric default 20, deposit_pct numeric default 50);
create table bookings (id uuid primary key default gen_random_uuid(), type text not null, status text not null default 'New', region text, event_date date, price numeric default 0, paid numeric default 0, data jsonb, created_at timestamptz default now());
alter table artists enable row level security; alter table settings enable row level security; alter table bookings enable row level security;
-- No public policies: only the server (service role key) can read and write.
insert into settings default values;
insert into artists (slug, name, bio, prices) values ('caleb','Caleb','Add Caleb’s biography here.','{"gqeberha":4800,"rsa":6000,"europe":3000,"usd":2400}');
