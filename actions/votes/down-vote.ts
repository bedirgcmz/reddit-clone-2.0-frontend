'use server'

import { auth } from '@/lib/auth'

export const downVote = async (
  postId: string,
): Promise<{ success: boolean; error?: string }> => {
  const accessToken = await auth.getAccessToken()

  if (!accessToken) {
    return { success: false, error: 'Unauthorized: No access token found.' }
  }

  try {
    const response = await fetch(`/votes/${postId}/downvote`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to downvote the post.')
    }

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
