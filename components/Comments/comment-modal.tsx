'use client'

import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { createComment } from '@/actions/comments/create-comment'
import { getComments } from '@/lib/queries'
import { CommentValues } from '@/lib/schemas'

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

interface CommentModalProps {
  isOpen: boolean
  onClose: () => void
  postId: string
  setAllComments: React.Dispatch<React.SetStateAction<Comment[]>>
}
// Comment Modal Component
const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  postId,
  setAllComments,
}) => {
  const [comment, setComment] = useState('')

  const handleSubmit = async () => {
    if (!comment.trim()) {
      Swal.fire({
        title: 'Error!',
        text: 'Please write something to add a comment',
        icon: 'error',
        confirmButtonText: 'Okay',
      })
      return
    }

    try {
      // createComment fonksiyonuna uygun veri göndermek
      const result = await createComment(postId, { content: comment })
      console.log('Comment created:', result)
    } catch (error) {
      console.error('Error creating comment:', error)
    }

    setComment('')
    onClose()
    // Yorumları güncellemek için getComments fonksiyonunu kullan
    try {
      const comments = await getComments(postId)

      // Yorumları state'e yüklemek
      if (comments) {
        setAllComments(comments)
      } else {
        console.error('Comments is undefined')
        setAllComments([])
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className='w-full rounded-lg bg-white p-6'>
      <textarea
        className='mb-1 h-full min-h-[100px] w-full rounded-lg border p-2 pb-6'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder='Write your comment here...'
      />
      <div className='flex justify-end gap-2'>
        <button
          onClick={onClose}
          className='rounded bg-gray-200 px-2 py-1 text-sm text-gray-600 hover:bg-red-300 hover:text-white'
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className='rounded bg-gray-200 px-2 py-1 text-sm text-gray-600 hover:bg-blue-600 hover:text-white'
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default CommentModal
