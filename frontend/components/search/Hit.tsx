import { setQuery } from '@/lib/features/searchQuery/searchQuerySlice';
import { useAppDispatch } from '@/lib/hooks';
import Link from 'next/link';

const Hit = ({ hit }: any) => {
  const dispatch = useAppDispatch();
  return (
    <div className="card">
      <Link href={`/post/${hit.objectID}`} onClick={() => dispatch(setQuery(''))}>
        <h2>{hit.title}</h2>
        <p>{hit.text}</p>
      </Link>
    </div>
  );
};

export default Hit;
