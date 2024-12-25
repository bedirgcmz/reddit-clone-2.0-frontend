// import { notFound } from 'next/navigation'
// import { getPost } from '@/lib/queries'
// import { auth } from '@/lib/auth'
// import PostContent from '@/components/post-content-for-single-post-page'

// type PageProps = {
//   params: {
//     id: string
//   }
// }

// export default async function PostPage({ params }: PageProps) {
//   const { id } = params // Burada await gerekmez
//   const post = await getPost(id)

//   if (!post) {
//     return notFound()
//   }

//   const user = await auth.getUser()
//   const isAuthor = user ? user.id === post.author.id : false

//   return (
//     <main className='mb-3 mt-2 flex w-full justify-center p-3'>
//       <PostContent post={post} isAuthor={isAuthor} userId={user?.id} />
//     </main>
//   )
// }

import { notFound } from 'next/navigation'
import { getPost } from '@/lib/queries'
import { auth } from '@/lib/auth'
import PostContent from '@/components/post-content-for-single-post-page'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function PostPage({ params }: PageProps) {
  const { id } = await params // `await` burada gereklidir çünkü `params` artık bir Promise.
  const post = await getPost(id)

  if (!post) {
    return notFound()
  }

  const user = await auth.getUser()
  const isAuthor = user ? user.id === post.author.id : false

  return (
    <main className='mb-3 mt-2 flex w-full justify-center p-3'>
      <PostContent post={post} isAuthor={isAuthor} userId={user?.id} />
    </main>
  )
}
