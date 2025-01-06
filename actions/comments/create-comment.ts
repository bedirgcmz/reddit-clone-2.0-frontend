'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { auth } from '@/lib/auth'
import { client } from '@/lib/client'
import { handleAxiosError } from '@/lib/error-handling'
import { commentActionSchema, type CommentValues } from '@/lib/schemas'

export const createComment = async (
  postId: string,
  data: { content: string },
) => {
  const parsedData = commentActionSchema.parse(data)
  const accessToken = await auth.getAccessToken()

  if (!accessToken) {
    return { error: 'You have to be logged in to create a comment' }
  }

  let id

  try {
    const response = await client.post(
      `/comments`,
      { postId, ...parsedData },
      {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      },
    )

    id = response.data.id
  } catch (error) {
    return handleAxiosError(error)
  }

  if (!id || typeof id !== 'string') {
    return { error: 'Could not redirect to new comment' }
  }

  revalidatePath(`/post/${postId}`)
  redirect(`/post/${postId}#comment-${id}`)
}
