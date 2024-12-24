'use server'

// import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { auth } from '@/lib/auth'
import { client } from '@/lib/client'
import { handleAxiosError } from '@/lib/error-handling'
import { commentActionSchema, type CommentValues } from '@/lib/schemas'

export const editComment = async ({
  data,
  commentId,
}: {
  data: CommentValues
  commentId: string
}) => {
  const parsedData = commentActionSchema.parse(data)
  const accessToken = await auth.getAccessToken()

  if (!accessToken) {
    return { error: 'you have to be logged in to edit a comment' }
  }

  try {
    await client.put(`/comments/${commentId}`, parsedData, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })
  } catch (error) {
    return handleAxiosError(error)
  }

  revalidatePath('/') // Optionally, revalidate the path where the comment exists
  // redirect(`/post/${data.postId}`) // Redirect back to the post after editing the comment
}
