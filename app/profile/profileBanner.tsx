'use client'
import React, { useState } from 'react'
import { FiUser } from 'react-icons/fi'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { AiOutlineEdit } from 'react-icons/ai'
import { editUser } from '@/actions/edit-user'
import { toastServerError } from '@/lib/error-handling'

interface ProfileBannerProps {
  username: string
  userId: string
}

export const ProfileBanner: React.FC<ProfileBannerProps> = ({
  username,
  userId,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newUsername, setNewUsername] = useState(username)

  const handleSave = async () => {
    if (newUsername.trim() && newUsername !== username) {
      try {
        const result = await editUser({ userId, newUsername })
        if (result?.error) {
          throw new Error(result.error)
        }
        alert('Kullanıcı adı başarıyla güncellendi!')
      } catch (error) {
        console.error('Error:', error)
        // alert('Kullanıcı adı güncellenirken bir hata oluştu.')
      }
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setNewUsername(username)
    setIsEditing(false)
  }

  return (
    <div className='mt-4 flex w-80 flex-col items-center rounded-lg bg-gray-100 px-4 py-8 shadow-md'>
      {/* Kullanıcı Resmi */}
      <div className='mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-300'>
        <FiUser size={48} className='text-gray-500' />
      </div>
      {/* Kullanıcı Adı */}
      <div className='flex items-center space-x-2'>
        {isEditing ? (
          <div className='flex items-center space-x-2'>
            <input
              type='text'
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className='rounded-md border px-2 py-1 outline-none'
            />
            <button
              onClick={handleSave}
              className='text-green-500 hover:text-green-700'
            >
              <AiOutlineCheck size={24} />
            </button>
            <button
              onClick={handleCancel}
              className='text-red-500 hover:text-red-700'
            >
              <AiOutlineClose size={24} />
            </button>
          </div>
        ) : (
          <div className='flex items-center justify-center space-x-2'>
            <h2 className='text-xl font-bold'>{username}</h2>
            <button
              onClick={() => setIsEditing(true)}
              className='flex items-center space-x-1 text-sm text-orange-400 hover:text-orange-700'
            >
              <AiOutlineEdit size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
