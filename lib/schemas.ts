import { z } from 'zod'

// actions

export const signUpSchema = z.object({
  username: z.string().min(2, 'username must be at least 2 characters'),
  password: z.string().min(6, 'password must be at least 6 characters'),
})

export type SignUpValues = z.infer<typeof signUpSchema>

export const logInSchema = z.object({
  username: z.string().min(1, 'username is required'),
  password: z.string().min(1, 'password is required'),
})

export type LogInValues = z.infer<typeof logInSchema>

export const postActionSchema = z.object({
  title: z.string().min(1, 'title is required'),
  content: z.string().optional(),
  // image: z.instanceof(File).optional(), // Ben ekledim
})

export type PostValues = z.infer<typeof postActionSchema>

//data

export const profileSchema = z.object({
  username: z.string(),
  id: z.string(),
})

export type ProfileData = z.infer<typeof profileSchema>

export const userActionSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
})

export type UserValues = z.infer<typeof userActionSchema>

// export const userProfileSchema = z.object({
//   user: z.object({
//     id: z.string(),
//     username: z.string(),
//     createdAt: z.string(),
//     updatedAt: z.string(),
//     posts: z.array(
//       z.object({
//         id: z.string(),
//         title: z.string(),
//         content: z.string().optional(),
//         createdAt: z.string(),
//         updatedAt: z.string(),
//         score: z.number(),
//         upvotes: z.array(z.string()),
//         downvotes: z.array(z.string()),
//       }),
//     ),
//   }),
// })

// export type UsersProfilePageData = z.infer<typeof userProfileSchema>

// // export const profilePagePostsSchema = z.object({
// //   posts: z.array(
// //     z.object({
// //       id: z.string(),
// //       title: z.string(),
// //       content: z.string().optional(),
// //       author: z.object({
// //         id: z.string(),
// //         username: z.string(),
// //       }),
// //       createdAt: z.string(),
// //       updatedAt: z.string(),
// //       score: z.number(),
// //       upvotes: z.array(z.string()), // upvotes için string dizisi
// //       downvotes: z.array(z.string()), // downvotes için string dizisi
// //     }),
// //   ),
// //   nextPage: z.number().nullable(),
// // })

// // export type ProfilePagePostsData = z.infer<typeof profilePagePostsSchema>

export const profilePagePostsSchema = z.object({
  posts: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      content: z.string().optional(),
      author: z.object({
        id: z.string(),
        username: z.string(),
      }),
      createdAt: z.string(),
      updatedAt: z.string(),
      score: z.number(),
      upvotes: z.array(z.string()),
      downvotes: z.array(z.string()),
    }),
  ),
})

export type ProfilePagePostsData = z.infer<typeof profilePagePostsSchema>

export const postPageSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().optional(),
  author: z.object({
    username: z.string(),
    id: z.string(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
  score: z.number(),
  upvotes: z.array(z.string()),
  downvotes: z.array(z.string()),
})

export type PostPageData = z.infer<typeof postPageSchema>

export const homepagePostsSchema = z.object({
  posts: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      content: z.string().optional(),
      author: z.object({
        username: z.string(),
      }),
      createdAt: z.string(),
      updatedAt: z.string(),
      score: z.number(),
      upvotes: z.array(z.string()),
      downvotes: z.array(z.string()),
    }),
  ),
  nextPage: z.number().nullable(),
})

export type HomepagePostsData = z.infer<typeof homepagePostsSchema>

export const postCommentSchema = z.object({
  _id: z.string(),
  content: z.string(),
  author: z.object({
    _id: z.string(),
    username: z.string(),
  }),
  post: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
})

// Birden fazla yorum için dizi şeması
export const commentsArraySchema = z.array(postCommentSchema)

export const commentActionSchema = z.object({
  content: z.string().min(1, 'Content is required'),
})

export type CommentValues = z.infer<typeof commentActionSchema>
