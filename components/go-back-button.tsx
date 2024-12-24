'use client'

import { useRouter } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa'

const GoBackButton = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back() // Sayfayı önceki sayfaya yönlendir
  }

  return (
    <button
      onClick={handleBackClick}
      className='flex items-center rounded-lg bg-gray-800 px-2 py-1 text-sm text-white hover:bg-gray-700'
    >
      <FaArrowLeft className='mr-2' /> Back
    </button>
  )
}

export default GoBackButton
