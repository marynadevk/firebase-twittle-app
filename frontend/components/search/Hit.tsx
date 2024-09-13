import { setQuery } from '@/lib/features/searchQuery/searchQuerySlice';
import { useAppDispatch } from '@/lib/hooks';
import Link from 'next/link';

const Hit = ({ hit }: any) => {
  const dispatch = useAppDispatch();
  return (
    <div className="list-item bg-slate-900 shadow-sm max-h-20 line-clamp-2">
      <Link
        href={`/post/${hit.objectID}`}
        onClick={() => dispatch(setQuery(''))}
      >
        <h2 className="text-accent font-bold">{hit.title}</h2>
        <p className="text-accent overflow">{hit.text}</p>
      </Link>
    </div>
  );
};

export default Hit;
