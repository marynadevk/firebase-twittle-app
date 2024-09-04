import { FC, useState } from 'react';
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import { updatePostLike, updatePostDislike } from '@/api/posts';
import { auth } from '@/lib/firebase';
type Props = {
  likes: string[];
  dislikes: string[];
  id: string;
};

const AuthenticatedActions: FC<Props> = ({ likes = [], dislikes = [], id }) => {
  const [likesCount, setLikesCount] = useState<number>(likes.length);
  const [dislikesCount, setDislikesCount] = useState<number>(dislikes.length);
  const [hasLiked, setHasLiked] = useState(likes.includes(auth.currentUser?.uid || ''));
  const [hasDisliked, setHasDisliked] = useState(dislikes.includes(auth.currentUser?.uid || ''));

  const handleLike = async () => {
    try {
      const updatedPost = await updatePostLike(id);
      updateReaction(updatedPost.data);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleDislike = async () => {
    try {
      const updatedPost = await updatePostDislike(id);
      updateReaction(updatedPost.data);
    } catch (error) {
      console.error('Error disliking post:', error);
    }
  };

  const updateReaction = (updatedPost: any) => {
    const likes = updatedPost.likes;
    const dislikes = updatedPost.dislikes;
    setHasDisliked(dislikes.includes(auth.currentUser?.uid));
    setHasLiked(likes.includes(auth.currentUser?.uid));
    setLikesCount(likes.length);
    setDislikesCount(dislikes.length);
  };

  return (
    <div className="flex items-center">
      <button className="btn btn-ghost btn-sm" onClick={handleLike}>
        {hasLiked ? <AiFillLike /> : <AiOutlineLike />}
        <span>{likesCount}</span>
      </button>
      <button className="btn btn-ghost btn-sm" onClick={handleDislike}>
        {hasDisliked ? <AiFillDislike /> : <AiOutlineDislike />}
        <span>{dislikesCount}</span>
      </button>
      <button className="btn btn-ghost btn-sm">
        <BiComment />
      </button>
    </div>
  );
};
export default AuthenticatedActions;
