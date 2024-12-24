'use client'

import React from 'react'
import Swal from 'sweetalert2'
import { deleteComment } from '@/actions/comments/delete-comment'
import { MdDeleteForever } from 'react-icons/md'

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

interface DeleteCommentButtonProps {
  commentId: string
  postId: string
  setAllComments: React.Dispatch<React.SetStateAction<Comment[]>>
}

const DeleteCommentButton: React.FC<DeleteCommentButtonProps> = ({
  commentId,
  postId,
  setAllComments,
}) => {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this comment? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    })

    if (result.isConfirmed) {
      const response = await deleteComment(commentId)

      if (response?.error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to delete the comment. Please try again.',
          icon: 'error',
        })
        return
      }

      Swal.fire({
        title: 'Deleted!',
        text: 'The comment has been deleted successfully.',
        icon: 'success',
      })

      // Refresh comments after deletion
      setAllComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId),
      )
    }
  }

  return (
    <button
      className='flex items-center rounded-lg px-2 py-1 text-sm hover:text-red-500 hover:underline'
      onClick={handleDelete}
    >
      <MdDeleteForever className='me-1' />
      <span className='hidden sm:flex'>Delete</span>
    </button>
  )
}

export default DeleteCommentButton
