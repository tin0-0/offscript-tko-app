import { getArtists } from '../../lib/data';
import BookForm from './BookForm';
export const dynamic = 'force-dynamic';
export default async function Book() {
  const artists = (await getArtists()).map(a => ({ slug:a.slug, name:a.name }));
  return (<section className="w"><h1 className="ch">Book now</h1><BookForm artists={artists} /></section>);
}
