import { createClient } from '@supabase/supabase-js';
export const R = { ec:['Eastern Cape','R'], rsa:['Rest of South Africa','R'] };
export const LINKS = { spotify:'https://open.spotify.com/artist/4DWfKYzfyjWyiUiQKvUG7W', apple:'https://music.apple.com/za/artist/calebx/1705785256', youtube:'https://youtube.com/@calebxrsa', instagram:'https://instagram.com/calebxrsa', tiktok:'https://tiktok.com/@calebxrsa' };
export const IMG = { calebx:'/studio.jpg' };
export const BIO = ['CalebX (Caleb Durrant Visagie) is a South African DJ and music producer from Gqeberha, known for a distinctive sound rooted in Amapiano and 3-Step. His music blends soulful elements, rhythmic grooves and bass-driven energy.','As both a DJ and producer, CalebX brings his own productions into the live setting, shaping sets around original music, carefully selected records and smooth transitions. His approach connects underground electronic influences with the evolving sound of South African dance music.'];
export const CATALOG = [
 ['Albums', ['East Kings (2025)','It’s Tough (2025)']],
 ['Singles & EPs', ['Wtaf (2026)','The Chant (Deep Grove) feat. Inter B, Draad & Jay Music (2026)','The Chant (Sgafro) feat. Inter B & Draad (2026)','Uphetheni (feat. 2woBunnies) [Remix] (2024)','UTORRENT (2024)','Latino (2024)','Break Through (2024)','Mina Nawe (Remix) (2024)','Break My Heart (2024)']],
 ['Featured on', ['Party In Brazil (feat. LRDÈ, Reeza808 & CalebX), Don Edward & Jay Music','Moet Nie Skaam Is (feat. CalebX), auXiGen, VOCEARL, Geriexz & Rayder_8280','Motion (feat. Big Stage, CalebX & House Of Musiq), Boyzn DJ','DARK (feat. CalebX) [Pomelo Cover], Pomelo']]];
export const db = () => process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth:{ persistSession:false } }) : null;
const seed = { slug:'calebx', name:'CalebX', prices:{ ec:4800, rsa:6000 } };
export async function getArtists() {
  const sb = db(); let rows = [];
  if (sb) { const { data } = await sb.from('artists').select('*').order('created_at'); rows = data || []; }
  if (!rows.length) rows = [seed];
  return rows.map(r => ({ ...r, bio: r.bio && !r.bio.startsWith('Add') ? r.bio : BIO.join('\n\n'), prices:{ ec: r.prices.ec ?? r.prices.gqeberha, rsa: r.prices.rsa } }));
}
export const money = (c, n) => c + Number(n).toLocaleString('en-ZA');
