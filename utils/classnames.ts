// this is a great tailwind utility function for merging tailwind classes!
// if you wanna know how and why to use it, checkout this post:
// https://www.reddit.com/r/tailwindcss/comments/1egbuvx/the_buzz_around_cn_function_and_why_do_we_use_it/

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
