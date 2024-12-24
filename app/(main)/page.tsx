import { getPosts } from '@/lib/queries'
import { HomePosts } from '@/components/home-posts'
import { auth } from '@/lib/auth'

export const revalidate = 900 // 15 min

const limit = 10

export default async function Home() {
  const initialData = await getPosts(limit, 1)
  const user = await auth.getUser()

  return (
    <div className='main space-y-12'>
      {!initialData || !initialData.posts || initialData.posts.length === 0 ? (
        <div>no posts found!</div>
      ) : (
        <HomePosts
          initialData={initialData}
          limit={limit}
          userId={user?.id || null}
        />
      )}
    </div>
  )
}
