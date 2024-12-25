'use server'

import { client } from '@/lib/client'
import { auth } from '@/lib/auth'

export const downVote = async (
  postId: string,
): Promise<{ success: boolean; error?: string }> => {
  const accessToken = await auth.getAccessToken()

  if (!accessToken) {
    return { success: false, error: 'Unauthorized: No access token found.' }
  }

  try {
    const response = await client.put(
      `/votes/${postId}/downvote`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      },
    )

    if (response.status !== 200) {
      throw new Error('Failed to downvote the post.')
    }

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
