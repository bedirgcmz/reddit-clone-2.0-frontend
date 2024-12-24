'use server'

import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

export const logOut = async () => {
  await auth.deleteAccessToken()
  redirect('/')
}
