'use server'

import { auth } from '@/lib/auth'
import { client } from '@/lib/client'
import { handleAxiosError } from '@/lib/error-handling'

export const deleteCommentByPostOwner = async (commentId: string) => {
  try {
    // Kullanıcının erişim token'ını al
    const accessToken = await auth.getAccessToken()

    if (!accessToken) {
      return { error: 'You have to be logged in to delete a comment' }
    }

    // API isteği gönder
    const response = await client.delete(`/comments/${commentId}/post-owner`, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })

    // Başarılı silme durumunda geri dönüş yap
    return {
      message: 'Comment deleted successfully by post owner',
      data: response.data,
    }
  } catch (error) {
    // Hata durumunda uygun bir mesaj döndür
    return handleAxiosError(error)
  }
}
