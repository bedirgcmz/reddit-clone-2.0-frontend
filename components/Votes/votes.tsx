import { cn } from '@/utils/classnames'
import { LuArrowBigDown, LuArrowBigUp } from 'react-icons/lu'
import { useState } from 'react'
import { upVote } from '@/actions/votes/up-vote'
import { downVote } from '@/actions/votes/down-vote'
import { getPost } from '@/lib/queries'

export const Votes = ({
  postId,
  userId,
  initialScore,
  upvotes,
  downvotes,
}: {
  postId: string
  userId: string | null
  initialScore: number | null
  upvotes: string[]
  downvotes: string[]
}) => {
  const [score, setScore] = useState(initialScore)
  const [localUpvotes, setLocalUpvotes] = useState(upvotes)
  const [localDownvotes, setLocalDownvotes] = useState(downvotes)

  const handleUpvote = async () => {
    if (!userId) return alert('You must be logged in to vote.')

    const result = await upVote(postId)
    if (result.success) {
      const updatedPost = await getPost(postId)
      if (updatedPost) {
        setScore(updatedPost.score)
        setLocalUpvotes(updatedPost.upvotes)
        setLocalDownvotes(updatedPost.downvotes)
      }
    } else {
      console.error(result.error)
    }
  }

  const handleDownvote = async () => {
    if (!userId) return alert('You must be logged in to vote.')

    const result = await downVote(postId)
    if (result.success) {
      const updatedPost = await getPost(postId)
      if (updatedPost) {
        setScore(updatedPost.score)
        setLocalUpvotes(updatedPost.upvotes)
        setLocalDownvotes(updatedPost.downvotes)
      }
    } else {
      console.error(result.error)
    }
  }

  return (
    <div className='flex items-center gap-1 rounded-full bg-gray-200'>
      <button
        className={cn(
          'button-tertiary text-[22px]',
          userId && localUpvotes.includes(userId) && 'text-primary',
        )}
        onClick={handleUpvote}
      >
        <LuArrowBigUp />
      </button>
      <span>{score}</span>
      <button
        className={cn(
          'button-tertiary text-[22px]',
          userId && localDownvotes.includes(userId) && 'text-primary',
        )}
        onClick={handleDownvote}
      >
        <LuArrowBigDown />
      </button>
    </div>
  )
}
