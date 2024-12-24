'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { auth } from '@/lib/auth'
import { client } from '@/lib/client'
import { handleAxiosError } from '@/lib/error-handling'
import { userActionSchema, type UserValues } from '@/lib/schemas'

export const editUser = async ({
  userId,
  newUsername,
}: {
  userId: string
  newUsername: string
}) => {
  const parsedData = userActionSchema.parse({
    username: newUsername,
    id: userId,
  }) // Gelen veriyi doğrula
  const accessToken = await auth.getAccessToken()

  if (!accessToken) {
    return { error: 'You have to be logged in to edit your profile' }
  }

  try {
    await client.put('/profile', parsedData, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })
  } catch (error) {
    console.error('Error during user update:', error)
    return handleAxiosError(error)
  }

  revalidatePath('/profile')
  redirect('/profile')
}
