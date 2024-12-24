// 'use client'

// import { useMutation } from '@tanstack/react-query'

// import { deletePost } from '@/actions/delete-post'
// import { handleServerActionError, toastServerError } from '@/lib/error-handling'
// import { MdDeleteForever } from 'react-icons/md'

// export const DeletePostButton = ({ postId }: { postId: string }) => {
//   const { mutate, isPending } = useMutation({
//     mutationFn: async () => {
//       handleServerActionError(await deletePost(postId))
//     },
//     onError: toastServerError,
//   })

//   return (
//     <button onClick={() => mutate()} className='button-secondary'>
//       <MdDeleteForever className='me-1' />{' '}
//       {isPending ? 'deleting post...' : 'delete'}
//     </button>
//   )
// }
'use client'

import { useMutation } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import { deletePost } from '@/actions/delete-post'
import { toastServerError } from '@/lib/error-handling'
import { MdDeleteForever } from 'react-icons/md'

export const DeletePostButton = ({ postId }: { postId: string }) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const response = await deletePost(postId)
      if (response?.error) {
        throw new Error(response.error)
      }
    },
    onError: toastServerError,
  })

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this post? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    })

    if (result.isConfirmed) {
      await mutateAsync()
      Swal.fire({
        title: 'Deleted!',
        text: 'The post has been deleted successfully.',
        icon: 'success',
      })
    }
  }

  return (
    <button onClick={handleDelete} className='button-secondary'>
      <MdDeleteForever className='me-1' />
      {isPending ? 'Deleting post...' : 'Delete'}
    </button>
  )
}
