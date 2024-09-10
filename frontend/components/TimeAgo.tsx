import { formatDistanceToNow } from 'date-fns';

type Props = {
  date: Date;
}

const TimeAgo: React.FC<Props> = ({ date }) => {
  return (
    <div className="badge badge-md max-w-max bg-gray-300 text-gray-800 p-4">
      {`Posted ${formatDistanceToNow(date, { addSuffix: true })}`}
    </div>
  );
};

export default TimeAgo;
