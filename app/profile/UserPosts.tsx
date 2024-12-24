'use client'

import { useState, useEffect } from 'react'
import { FaCircle, FaRegComment, FaShare } from 'react-icons/fa'
import Link from 'next/link'
import formatDate from '@/utils/set-date'
import { Votes } from '@/components/Votes/votes'
import { getPostsByUserId } from '@/actions/get-users-posts'
import { DeletePostButton } from '@/components/delete-post-button'

interface Post {
  id: string
  title: string
  content?: string
  author: {
    username: string
    id: string
  }
  createdAt: string
  updatedAt: string
  score: number
  upvotes: string[] // Sayı olarak tanımlandı
  downvotes: string[] // Sayı olarak tanımlandı
}

interface UserPostProps {
  userId: string
}

const UserPost = ({ userId }: UserPostProps) => {
  const [usersPosts, setUsersPosts] = useState<Post[]>([])
  const [isTextLong, setIsTextLong] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postData = await getPostsByUserId(userId)

        if (postData?.posts) {
          setUsersPosts(postData.posts)
        } else {
          setUsersPosts([])
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
        setUsersPosts([])
      }
    }

    fetchPosts()
  }, [userId])

  const longTextMakeShort = (pText: string) => {
    return isTextLong || pText.length < 250
      ? pText
      : `${pText.slice(0, 250)}...`
  }

  return (
    <section className='flex w-[95%] max-w-[700px] flex-col items-center gap-4 sm:w-[90%]'>
      <h1 className='my-3 font-bold'>My Posts ({usersPosts.length})</h1>
      {usersPosts.length > 0 ? (
        usersPosts.map(
          ({
            id,
            title,
            content,
            createdAt,
            updatedAt,
            author,
            score,
            upvotes,
            downvotes,
          }) => (
            <div
              className='w-full rounded-lg bg-[#f6f6f6] p-3 shadow-sm hover:shadow-md'
              key={id}
            >
              <Link
                href={`/post/${id}`}
                className='flex w-full flex-col rounded-3xl bg-white p-4'
              >
                <span className='flex items-center justify-start text-[14px] text-zinc-600'>
                  r/{author.username}
                  <FaCircle className='mx-2 text-[6px] text-gray-300' />
                  <span className='text-gray-400'>{formatDate(createdAt)}</span>
                  <span className='ms-2 text-[12px] text-gray-400'>
                    {updatedAt &&
                      updatedAt !== createdAt &&
                      `(Edited ${formatDate(updatedAt)})`}
                  </span>
                </span>
                <h2 className='text-lg font-bold'>{title}</h2>
                <p>
                  {content && longTextMakeShort(content)}
                  {content && content.length > 250 && (
                    <button
                      className='z-10 ms-2 text-blue-500 underline'
                      onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        setIsTextLong(!isTextLong)
                      }}
                    >
                      {isTextLong ? 'Read Less' : 'Read more'}
                    </button>
                  )}
                </p>
              </Link>
              <div className='mt-3 flex w-full items-center justify-between'>
                <div className='flex w-full items-center justify-start gap-2'>
                  <Votes
                    postId={id}
                    userId={userId}
                    initialScore={score}
                    upvotes={upvotes}
                    downvotes={downvotes}
                  />
                  <Link
                    href={`/post/${id}`}
                    className='rounded-full bg-gray-200 px-3 py-2'
                  >
                    <FaRegComment />
                  </Link>
                  <span className='rounded-full bg-gray-200 px-3 py-2'>
                    <FaShare />
                  </span>
                </div>
                <DeletePostButton postId={id} />
              </div>
            </div>
          ),
        )
      ) : (
        <p>No posts found.</p>
      )}
    </section>
  )
}

export default UserPost
