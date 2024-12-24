'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { DeletePostButton } from '@/components/delete-post-button'
import { FaCircle, FaRegComment, FaShare } from 'react-icons/fa'
import formatDate from '@/utils/set-date'
import { AiFillEdit } from 'react-icons/ai'
import { Votes } from '@/components/Votes/votes'
import Comments from '@/components/Comments/comments'
import CommentModal from '@/components/Comments/comment-modal'
import { PostPageData } from '@/lib/schemas'
import Swal from 'sweetalert2'
import GoBackButton from './go-back-button'
import { TiHome } from 'react-icons/ti'

interface Comment {
  _id: string
  content: string
  author: {
    _id: string
    username: string
  }
  createdAt: string
  updatedAt: string
}

type PostContentProps = {
  post: PostPageData
  isAuthor: boolean
  userId?: string
}

const PostContent: React.FC<PostContentProps> = ({
  post,
  isAuthor,
  userId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [allComments, setAllComments] = useState<Comment[]>([])

  // ACIKLAMA: Bu kod, bir postun yorumlarını alır ve allComments state'ini günceller. Bu, yorumlar sayfası açıldığında veya güncellendiğinde yorumlar listesini güncellemek için kullanılır.
  // allCommest state burda tutulur ve set ile hem create comment icinde hem de comment-modal icinde gucellenir. ve son guncel hali comment.tsx icinde render edilir

  const isUserLogin = () => {
    if (userId) {
      setIsModalOpen(!isModalOpen)
    } else {
      Swal.fire({
        title: 'You Need to Log In',
        text: 'You must be logged in to post a comment.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Log In',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to login page
          window.location.href = '/auth/log-in'
        }
      })
    }
  }

  return (
    <div className='main w-full rounded-lg bg-[#f6f6f6] p-3 shadow-sm'>
      <span className='mb-3 flex items-center gap-2'>
        <GoBackButton />{' '}
        <Link
          href={'/'}
          className='flex items-center gap-2 rounded-lg bg-gray-800 px-2 py-1 text-sm text-white hover:bg-gray-700'
        >
          Home <TiHome />
        </Link>
      </span>
      <article className='space-y-4'>
        <header className='flex items-start justify-between'>
          <div className='space-y-1'>
            <span className='flex items-center justify-start text-[14px] text-zinc-600'>
              r/{post.author.username}{' '}
              <FaCircle className='mx-2 text-[6px] text-gray-300' />
              <span className='text-gray-400'>
                {formatDate(post.createdAt)}
              </span>
              <span className='ms-2 text-[12px] text-gray-400'>
                {post.updatedAt &&
                  post.updatedAt !== post.createdAt &&
                  `(Edited ${formatDate(post.updatedAt)})`}
              </span>
            </span>
            <h1 className='text-2xl font-bold'>{post.title}</h1>
          </div>
          {isAuthor && (
            <div className='flex gap-3'>
              <Link href={`/post/${post.id}/edit`} className='button-secondary'>
                <AiFillEdit className='me-1' /> edit
              </Link>
              <DeletePostButton postId={post.id} />
            </div>
          )}
        </header>
        <p>{post.content}</p>
      </article>
      <div className='mt-3 flex w-full items-center justify-start gap-4'>
        <Votes
          postId={post.id}
          userId={post.author.id}
          initialScore={post.score}
          upvotes={post.upvotes}
          downvotes={post.downvotes}
        />
        <button
          className='rounded-full bg-gray-100 px-3 py-2'
          onClick={() => isUserLogin()}
        >
          <FaRegComment />
        </button>
        <span className='rounded-full bg-gray-100 px-3 py-2'>
          <FaShare />
        </span>
      </div>
      <CommentModal
        isOpen={isModalOpen}
        postId={post.id}
        onClose={() => setIsModalOpen(false)}
        setAllComments={setAllComments}
      />
      <Comments
        postId={post.id}
        setAllComments={setAllComments}
        allComments={allComments}
        userId={userId}
        isPostOwner={post.author.id}
      />
    </div>
  )
}

export default PostContent
