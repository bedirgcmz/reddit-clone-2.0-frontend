import { type FieldError as TFieldError } from 'react-hook-form'

export const FieldError = ({ error }: { error: TFieldError | undefined }) => {
  if (!error) return null

  return <span className='text-sm text-primary'>{error.message}</span>
}
