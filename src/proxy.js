import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

// This function intercepts requests to protect private pages
export async function proxy(request) {
  // Query the database to verify if the session is legally active
  const session = await auth.api.getSession({
    headers: await headers()
  })

  // If no session exists, redirect them securely to the login page
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// Routes to protect in DocAppoint
export const config = {
  matcher: ['/dashboard/:path*'], 
}