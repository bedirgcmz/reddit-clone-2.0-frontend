'user server'

import { auth } from '@/lib/auth'
import { client } from '@/lib/client'
import { handleAxiosError } from '@/lib/error-handling'
import { revalidatePath } from 'next/cache'

export const vote = async ({
  type,
  postId,
}: {
  type: 'upvote' | 'downvote'
  postId: string
}) => {
  const accessToken = await auth.getAccessToken()

  if (!accessToken) {
    return { error: 'you have to be logged in to vote' }
  }

  try {
    await client.put(
      `/votes/${postId}/${type}`,
      {},
      { headers: { Authorization: `Bearer ${accessToken.value}` } },
    )
  } catch (error) {
    return handleAxiosError(error)
  }

  revalidatePath('/')
}
