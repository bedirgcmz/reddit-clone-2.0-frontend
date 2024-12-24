'use client'

import React, { useState, useEffect } from 'react'
import { EditCommentModal } from './edit-comment-modal'
import { FaCircle } from 'react-icons/fa'
import { RiEditFill } from 'react-icons/ri'
import { MdDeleteForever } from 'react-icons/md'
import formatDate from '@/utils/set-date'
import { getComments } from '../../lib/queries'
import DeleteCommentButton from './delete-comment-button'
import DeleteCommentButtonForPostOwner from './delete-comment-button-for-post-owner'

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

interface CommentsProps {
  postId: string
  setAllComments: React.Dispatch<React.SetStateAction<Comment[]>>
  allComments: Comment[]
  userId?: string
  isPostOwner: string
}

const Comments: React.FC<CommentsProps> = ({
  postId,
  allComments,
  setAllComments,
  userId,
  isPostOwner,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentCommentId, setCurrentCommentId] = useState<string | null>(null)
  const [currentContent, setCurrentContent] = useState('')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch comments when the component mounts or postId changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true)
        const data = await getComments(postId)
        if (data) {
          setAllComments(data)
        }
      } catch (err) {
        setError('Could not load comments.')
      } finally {
        setLoading(false)
      }
    }
    fetchComments()
  }, [postId, setAllComments])

  // Handle edit click - open modal with current comment content
  const handleEditClick = (commentId: string, content: string) => {
    setCurrentCommentId(commentId)
    setCurrentContent(content)
    setIsModalOpen(true)
  }

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  if (loading) return <p>Loading comments...</p>
  if (error) return <p>{error}</p>

  return (
    <div className='mt-3 p-2 ps-4'>
      {allComments.length > 0 ? (
        allComments.map((comment) => (
          <div key={comment._id} className='mb-4'>
            <div className='flex items-center justify-between'>
              <p className='flex items-center justify-start'>
                @{comment.author.username}
                <FaCircle className='mx-2 text-[6px] text-gray-300' />
                <span className='text-[12px] text-gray-400'>
                  {formatDate(comment.createdAt)}
                </span>
                <span className='ms-2 text-[12px] text-gray-400'>
                  {comment.updatedAt &&
                    comment.updatedAt !== comment.createdAt &&
                    `(Edited ${formatDate(comment.updatedAt)})`}
                </span>
              </p>
              {userId && comment.author._id === userId && (
                <span className='flex items-center'>
                  <button
                    className='flex items-center rounded-lg px-2 py-1 text-sm hover:text-orange-400 hover:underline'
                    onClick={() =>
                      handleEditClick(comment._id, comment.content)
                    }
                  >
                    <RiEditFill className='me-1' />{' '}
                    <span className='hidden sm:flex'>Edit</span>
                  </button>
                  <DeleteCommentButton
                    commentId={comment._id}
                    postId={postId}
                    setAllComments={setAllComments}
                  />
                </span>
              )}
              {userId &&
                comment.author._id !== userId &&
                userId === isPostOwner && (
                  <DeleteCommentButtonForPostOwner
                    commentId={comment._id}
                    setAllComments={setAllComments}
                  />
                )}
            </div>
            <p>{comment.content}</p>
          </div>
        ))
      ) : (
        <p>No comments available.</p>
      )}

      {/* Modal for editing */}
      {isModalOpen && currentCommentId && (
        <EditCommentModal
          commentId={currentCommentId}
          defaultContent={currentContent}
          onClose={handleModalClose}
          postId={postId}
          setAllComments={setAllComments}
        />
      )}
    </div>
  )
}

export default Comments
