import { createComment } from '@/api/posts';
import { errMsg } from '@/app/helpers/errorMessages';
import { addComment } from '@/lib/features/comments/commentsSlice';
import { startLoading, stopLoading } from '@/lib/features/loader/loaderSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { ChangeEvent, FC, useState } from 'react';
import * as Yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

type Props = {
  postId: string;
};

const validationSchema = Yup.object()
  .shape({
    text: Yup.string().max(1000).required(errMsg.required),
  })
  .required();

const CommentForm: FC<Props> = ({ postId }) => {
  const { isLoading } = useAppSelector((state) => state.loader);
  const dispatch = useAppDispatch();
  const methods = useForm<CommentFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: { text: '' },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  type CommentFormData = {
    text: string;
  };

  const createNewComment = async (data: CommentFormData) => {
    dispatch(startLoading());
    try {
      const newComment = await createComment(postId, data.text);
      dispatch(addComment(newComment.data));
      toast.success('Comment added successfully!');
    } catch (error) {
      toast.error('Error creating comment');
    } finally {
      dispatch(stopLoading());
      methods.reset();
    }
  };

  return (
    <div className="flex flex-col gap-3 pl-5">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(createNewComment)}
          className="comment-form flex w-full flex-col gap-3"
        >
          <textarea
            className="textarea textarea-accent w-1/4"
            placeholder="Say something..."
            {...register('text')}
          />
          {errors.text && (
            <span className="text-red-500">{errors.text.message}</span>
          )}
          <button
            type="submit"
            className={`btn btn-accent w-40 ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            Add comment
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CommentForm;
