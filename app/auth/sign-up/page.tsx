import Link from 'next/link'

import { SignUpForm } from './form'

export default function SignUpPage() {
  return (
    <main className='main mt-[20vh] flex grow flex-col items-center'>
      <div className='flex w-full grow flex-col items-center gap-12'>
        <h1 className='text-2xl font-bold'>welcome</h1>
        <SignUpForm />
      </div>
      <Link href='/auth/log-in' className='text-zinc-500'>
        already have an account? log in
      </Link>
    </main>
  )
}
