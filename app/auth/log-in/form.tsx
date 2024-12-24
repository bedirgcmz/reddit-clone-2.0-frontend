'use client'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { logIn } from '@/actions/log-in'
import { logInSchema, LogInValues } from '@/lib/schemas'
import { handleServerActionError, toastServerError } from '@/lib/error-handling'
import { FieldError } from '@/components/field-error'

export const LogInForm = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: LogInValues) => {
      handleServerActionError(await logIn(values))
    },
    onError: toastServerError,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInValues>({
    resolver: zodResolver(logInSchema),
  })

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className='flex w-full max-w-md flex-col gap-4'
    >
      <input
        {...register('username')}
        type='text'
        placeholder='username'
        className='input'
      />
      <FieldError error={errors.username} />
      <input
        {...register('password')}
        type='password'
        placeholder='password'
        className='input'
      />
      <FieldError error={errors.password} />
      <button type='submit' className='button-primary' disabled={isPending}>
        {isPending ? 'logging in...' : 'log in'}
      </button>
    </form>
  )
}
