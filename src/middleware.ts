import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  if (token) {
    // Assuming the user ID is available in the token
    const userId = token.sub;
    return NextResponse.redirect(new URL(`/artist/edit/${userId}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/', // Apply middleware to the home route
};
