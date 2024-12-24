// 'use client'
// import { useState } from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import { FaUser, FaSearch } from 'react-icons/fa'
// import { LogOutButton } from '../log-out-button'

// interface HeaderClientProps {
//   user: any
// }

// export const HeaderClient = ({ user }: HeaderClientProps) => {
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   const toggleModal = () => setIsModalOpen(!isModalOpen)

//   return (
//     <header className='flex h-16 w-full items-center justify-between gap-4 px-4 py-2 shadow-md md:px-20'>
//       {/* Solda: Reddit Logo ve Yazısı */}
//       <div className='flex items-center gap-2'>
//         <Image src='/logo.png' alt='Reddit Logo' width={40} height={40} />
//         <Link href='/' className='hidden text-2xl font-bold sm:block'>
//           reddit
//         </Link>
//       </div>

//       {/* Orta Kısım: Search bar */}
//       <div className='flex flex-grow justify-center'>
//         <div className='relative w-full max-w-[600px]'>
//           <input
//             type='text'
//             placeholder='Search...'
//             className='w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
//           />
//           <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500' />
//         </div>
//       </div>

//       {/* Sağ Kısım: Create Butonu ve Profil İkonu */}
//       {user ? (
//         <div className='flex items-center gap-4'>
//           <Link href='/create' className='button-primary'>
//             Create
//           </Link>
//           <FaUser className='cursor-pointer text-2xl' onClick={toggleModal} />
//           {isModalOpen && (
//             <div className='absolute right-4 top-16 w-48 rounded-md bg-white p-4 shadow-md'>
//               <p className='mb-2 text-center text-sm text-gray-700'>
//                 Hello, {user.username}
//               </p>
//               <Link
//                 href='/profile'
//                 className='text-md block py-2 ps-2 text-gray-700 hover:underline'
//               >
//                 Profile
//               </Link>
//               <LogOutButton />
//             </div>
//           )}
//         </div>
//       ) : (
//         <Link href='/auth/log-in' className='button-primary'>
//           Log in
//         </Link>
//       )}
//     </header>
//   )
// }

'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaUser, FaSearch } from 'react-icons/fa'
import { LogOutButton } from '../log-out-button'

interface HeaderClientProps {
  user: any
}

export const HeaderClient = ({ user }: HeaderClientProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement | null>(null)

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  // Click outside to close the modal
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false)
    }
  }

  // Attach event listener when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    // Cleanup on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isModalOpen])

  return (
    <header className='flex h-16 w-full items-center justify-between gap-4 px-4 py-2 shadow-md md:px-20'>
      {/* Solda: Reddit Logo ve Yazısı */}
      <div className='flex items-center gap-2'>
        <Image src='/logo.png' alt='Reddit Logo' width={40} height={40} />
        <Link href='/' className='hidden text-2xl font-bold sm:block'>
          reddit
        </Link>
      </div>

      {/* Orta Kısım: Search bar */}
      <div className='flex flex-grow justify-center'>
        <div className='relative w-full max-w-[600px]'>
          <input
            type='text'
            placeholder='Search...'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500' />
        </div>
      </div>

      {/* Sağ Kısım: Create Butonu ve Profil İkonu */}
      {user ? (
        <div className='flex items-center gap-4'>
          <Link href='/create' className='button-primary'>
            Create
          </Link>
          <FaUser className='cursor-pointer text-2xl' onClick={toggleModal} />
          {isModalOpen && (
            <div
              ref={modalRef}
              className='absolute right-4 top-16 w-48 rounded-md bg-white p-4 shadow-md'
            >
              <p className='mb-2 text-center text-sm text-gray-700'>
                Hello, {user.username}
              </p>
              <Link
                href='/profile'
                className='text-md block py-2 ps-2 text-gray-700 hover:underline'
                onClick={() => setIsModalOpen(false)} // Modal kapanacak
              >
                Profile
              </Link>
              <LogOutButton /> {/* LogOut işlemi sonrası modal kapanacak */}
            </div>
          )}
        </div>
      ) : (
        <Link href='/auth/log-in' className='button-primary'>
          Log in
        </Link>
      )}
    </header>
  )
}
