export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/profil', '/app/:path*', '/other/:path*', '/help/:path*']
}