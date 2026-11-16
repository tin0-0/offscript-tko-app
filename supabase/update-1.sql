-- Run once in Supabase SQL Editor (updates Caleb to CalebX, domestic prices only)
update artists set slug='calebx', name='CalebX', prices='{"ec":4800,"rsa":6000}' where slug='caleb';
