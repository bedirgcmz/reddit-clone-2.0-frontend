import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/lib/auth'

export const middleware = async (request: NextRequest) => {
  const user = await auth.getUser()

  if (
    !user &&
    protectedRoutes.some((route) => route.test(request.nextUrl.pathname))
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/log-in'
    return NextResponse.redirect(url)
  }
}

const protectedRoutes = [
  /^\/create$/, // matches /create
]

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
