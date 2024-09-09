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
import Link from 'next/link';
import { toast } from 'react-toastify';
type Props = {
  likes: string[];
  dislikes: string[];
  comments: string[];
  id: string;
};

const AuthenticatedActions: FC<Props> = ({ likes = [], dislikes = [], id, comments = [] }) => {
  const [likesCount, setLikesCount] = useState(likes.length);
  const [dislikesCount, setDislikesCount] = useState(dislikes.length);
  const [hasLiked, setHasLiked] = useState(likes.includes(auth.currentUser?.uid || ''));
  const [hasDisliked, setHasDisliked] = useState(dislikes.includes(auth.currentUser?.uid || ''));

  const handleLike = async () => {
    try {
      const updatedPost = await updatePostLike(id);
      updateReaction(updatedPost.data);
    } catch (error) {
      toast.error('Error liking post');
    }
  };

  const handleDislike = async () => {
    try {
      const updatedPost = await updatePostDislike(id);
      updateReaction(updatedPost.data);
    } catch (error) {
      toast.error('Error disliking post');
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
      <Link href={`/post/${id}`} className="btn btn-ghost btn-sm">
        <BiComment />
        <span>{comments.length}</span>
      </Link>
    </div>
  );
};
export default AuthenticatedActions;
