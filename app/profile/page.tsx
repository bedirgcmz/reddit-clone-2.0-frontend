// ProfilePage.tsx
import { auth } from '@/lib/auth' // auth.ts modülünü server-side'dan import edin
import UserPost from './UserPosts'
import { ProfileBanner } from './profileBanner'

const ProfilePage = async () => {
  // Kullanıcıyı auth'tan alıyoruz
  const user = await auth.getUser()

  if (!user) {
    return <p>You must be logged in to view this page.</p>
  }

  // Kullanıcıyı başarıyla aldıysak, userId'yi props olarak geçiyoruz
  return (
    <div className='flex flex-col items-center pb-4'>
      <ProfileBanner username={user.username} userId={user.id} />
      <hr className='mt-3 h-2 w-screen' />
      <UserPost userId={user.id} />
    </div>
  )
}

export default ProfilePage
