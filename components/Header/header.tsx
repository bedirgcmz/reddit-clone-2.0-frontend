import { auth } from '@/lib/auth'
import { HeaderClient } from './HeaderClient'

export const Header = async () => {
  const user = await auth.getUser()

  return <HeaderClient user={user} />
}
