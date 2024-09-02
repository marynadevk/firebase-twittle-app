import { FC } from 'react';
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import { useLocalStorage } from 'usehooks-ts';
import { IUser } from '@/interfaces/IUser';
import { updatePostLike, updatePostDislike } from '@/api/posts';
type Props = {
  likes: string[];
  dislikes: string[];
  id: string;
};

const AuthenticatedActions: FC<Props> = ({ likes = [], dislikes = [], id }) => {
  const [user] = useLocalStorage<null | IUser>('user', null);
  const userId = user?.uid || '';
  const hasLiked = likes.includes(userId);
  const hasDisliked = dislikes.includes(userId);

  const handleLike = async () => {
    try {
      await updatePostLike(id)
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleDislike = async () => {
    try {
      await updatePostDislike(id);
    } catch (error) {
      console.error('Error disliking post:', error);
    }
  };

  return (
    <div className="flex items-center">
      <button className="btn btn-ghost btn-sm" onClick={handleLike}>
        {hasLiked ? <AiFillLike /> : <AiOutlineLike />}
        <span>{likes.length}</span>
      </button>
      <button className="btn btn-ghost btn-sm" onClick={handleDislike}>
        {hasDisliked ? <AiFillDislike /> : <AiOutlineDislike />}
        <span>{dislikes.length}</span>
      </button>
      <button className="btn btn-ghost btn-sm">
        <BiComment />
      </button>
    </div>
  );
};
export default AuthenticatedActions;
