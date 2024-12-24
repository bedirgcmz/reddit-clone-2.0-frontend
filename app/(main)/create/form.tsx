'use client'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { createPost } from '@/actions/create-post'
import { postActionSchema, type PostValues } from '@/lib/schemas'
import { handleServerActionError, toastServerError } from '@/lib/error-handling'
import { FieldError } from '@/components/field-error'

export const CreatePostForm = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: PostValues) => {
      handleServerActionError(await createPost(values))
    },
    onError: toastServerError,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostValues>({
    resolver: zodResolver(postActionSchema),
  })

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className='flex w-full flex-col gap-4'
    >
      <input
        {...register('title')}
        type='text'
        placeholder='title'
        className='input'
      />
      <FieldError error={errors.title} />
      <textarea
        {...register('content')}
        placeholder='content'
        className='input min-h-96 rounded-3xl'
      />
      <FieldError error={errors.content} />
      {/* <input
        type="file"
        {...register('image')}
        accept="image/*"
        className="input"
      />
      <FieldError error={errors.image} /> */}
      <button type='submit' className='button-primary'>
        {isPending ? 'uploading post...' : 'post'}
      </button>
    </form>
  )
}
