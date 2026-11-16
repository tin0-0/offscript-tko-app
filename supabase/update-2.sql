-- Run once in Supabase SQL Editor
alter table settings add column if not exists bank text;
alter table settings add column if not exists terms text;
alter table bookings add column if not exists expenses jsonb default '[]'::jsonb;
create table if not exists blocked_dates (day date primary key);
alter table blocked_dates enable row level security;
insert into settings (id) values (1) on conflict do nothing;
