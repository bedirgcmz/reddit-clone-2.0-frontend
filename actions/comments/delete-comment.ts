'use server'

import { auth } from '@/lib/auth'
import { client } from '@/lib/client'
import { handleAxiosError } from '@/lib/error-handling'

export const deleteComment = async (commentId: string) => {
  const accessToken = await auth.getAccessToken()

  if (!accessToken) {
    return { error: 'You have to be logged in to delete a comment' }
  }

  try {
    await client.delete(`/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })
  } catch (error) {
    return handleAxiosError(error)
  }
}
