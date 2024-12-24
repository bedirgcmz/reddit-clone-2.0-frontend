import { z } from 'zod'
import { client } from './client'
import {
  homepagePostsSchema,
  postCommentSchema,
  postPageSchema,
} from './schemas'

// export const getPost = async (id: string) => {
//   try {
//     const response = await client.get(`/posts/${id}`)

//     const { data, error } = postPageSchema.safeParse(response.data)
//     if (error) {
//       return null
//     }

//     return data
//   } catch {
//     return null
//   }
// }

export const getPost = async (id: string) => {
  try {
    const response = await client.get(`/posts/${id}`)

    const parsed = postPageSchema.safeParse(response.data)
    if (!parsed.success) {
      console.error('Validation error:', parsed.error)
      return null
    }

    return parsed.data
  } catch (err) {
    console.error('Error fetching post:', err)
    return null
  }
}

// export const getPosts = async (limit: number, page: number) => {
//   try {
//     const response = await client.get('/posts', {
//       params: { limit, page },
//     })

//     const { data, error } = homepagePostsSchema.safeParse(response.data)
//     if (error) {
//       return null
//     }

//     return data
//   } catch {
//     return null
//   }
// }

export const getPosts = async (limit: number, page: number) => {
  try {
    const response = await client.get('/posts', {
      params: { limit, page },
    })

    const parsed = homepagePostsSchema.safeParse(response.data)
    if (!parsed.success) {
      console.error('Validation error:', parsed.error)
      return null
    }

    return parsed.data
  } catch (err) {
    console.error('Error fetching posts:', err)
    return null
  }
}

export const getComments = async (postId: string) => {
  try {
    const response = await client.get(`/comments/${postId}`)
    // Dizi doğrulama
    const commentsArraySchema = z.array(postCommentSchema)
    const { data, error } = commentsArraySchema.safeParse(response.data)

    if (error) {
      console.error('Validation error:', error)
      return null
    }

    return data
  } catch (err) {
    console.error('Error fetching comments:', err)
    return null
  }
}
