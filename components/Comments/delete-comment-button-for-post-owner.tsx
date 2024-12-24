'use client'

import React from 'react'
import Swal from 'sweetalert2'
import { MdDeleteForever } from 'react-icons/md'
import { deleteCommentByPostOwner } from '@/actions/comments/delete-comment-by-post-owner'

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
  setAllComments: React.Dispatch<React.SetStateAction<Comment[]>>
}

const DeleteCommentButtonForPostOwner: React.FC<DeleteCommentButtonProps> = ({
  commentId,
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
      try {
        // Backend'e isteği gönder
        const response = await deleteCommentByPostOwner(commentId)

        // response'ın 'void' olma durumunu kontrol et
        if (!response) {
          Swal.fire({
            title: 'Error',
            text: 'An unexpected error occurred. Please try again later.',
            icon: 'error',
          })
          return
        }

        // Hata kontrolü
        if ('error' in response) {
          Swal.fire({
            title: 'Error',
            text:
              response.error ||
              'Failed to delete the comment. Please try again.',
            icon: 'error',
          })
          return
        }

        Swal.fire({
          title: 'Deleted!',
          text: 'The comment has been deleted successfully.',
          icon: 'success',
        })

        // Yorumu filtreleyerek güncelle
        setAllComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId),
        )
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'An unexpected error occurred. Please try again later.',
          icon: 'error',
        })
      }
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

export default DeleteCommentButtonForPostOwner
