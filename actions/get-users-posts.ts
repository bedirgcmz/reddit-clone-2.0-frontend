'use server'

import { client } from '@/lib/client'
import { profilePagePostsSchema } from '@/lib/schemas'
import { auth } from '@/lib/auth'

export const getPostsByUserId = async (userId: string) => {
  const accessToken = await auth.getAccessToken()

  if (!accessToken?.value) {
    throw new Error('No access token found')
  }

  try {
    const response = await client.get(`/posts/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })

    const { success, data, error } = profilePagePostsSchema.safeParse(
      response.data,
    )

    if (!success) {
      console.error('Validation Error:', error.errors)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching posts:', error)
    return null
  }
}
