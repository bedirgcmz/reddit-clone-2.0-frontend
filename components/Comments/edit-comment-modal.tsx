'use client'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { commentActionSchema, type CommentValues } from '@/lib/schemas'
import { FieldError } from '@/components/field-error'
import { handleServerActionError, toastServerError } from '@/lib/error-handling'
import { editComment } from '@/actions/comments/edit-comment'

interface Comment {
  _id: string
  content: string
  author: {
    _id: string
    username: string
  }
  createdAt: string
  updatedAt: string
}

interface EditCommentModalProps {
  commentId: string
  defaultContent: string
  postId: string
  onClose: () => void
  setAllComments: React.Dispatch<React.SetStateAction<Comment[]>>
}

export const EditCommentModal: React.FC<EditCommentModalProps> = ({
  commentId,
  defaultContent,
  onClose,
  setAllComments,
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: CommentValues) => {
      const updatedComment = await editComment({ data: values, commentId })
      handleServerActionError(updatedComment)

      // Update the allComments state with the edited comment
      setAllComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                content: values.content,
                updatedAt: new Date().toISOString(),
              }
            : comment,
        ),
      )

      onClose()
    },
    onError: toastServerError,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentValues>({
    resolver: zodResolver(commentActionSchema),
    defaultValues: { content: defaultContent },
  })

  return (
    <div className='modal-container absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50'>
      <form
        onSubmit={handleSubmit((values) => mutate(values))}
        className='flex min-w-[300px] flex-col gap-4 rounded-xl bg-white p-3 sm:min-w-[500px]'
      >
        <textarea
          {...register('content')}
          placeholder='Edit your comment'
          className='input min-h-32 rounded-xl'
        />
        <FieldError error={errors.content} />
        <div className='mt-4 flex justify-between'>
          <button type='button' onClick={onClose} className='button-primary'>
            Cancel
          </button>
          <button type='submit' className='button-secondary'>
            {isPending ? 'Saving changes...' : 'Save changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
