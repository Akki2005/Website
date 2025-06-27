import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Public routes that don't require authentication
  const publicRoutes = ['/login/user', '/login/admin', '/auth']
  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  if (!user && !isPublicRoute) {
    // Redirect unauthenticated users to user login by default
    const url = request.nextUrl.clone()
    url.pathname = '/login/user'
    return NextResponse.redirect(url)
  }

  if (user && isPublicRoute) {
    // If user is authenticated but on login pages, redirect based on user type
    try {
      // Check if user is admin by checking admin table
      const { data: adminData } = await supabase
        .from('admins') // Assuming you have an admins table
        .select('*')
        .eq('email', user.email)
        .single()

      const url = request.nextUrl.clone()
      if (adminData) {
        url.pathname = '/admin/dashboard'
      } else {
        url.pathname = '/community/dashboard'
      }
      return NextResponse.redirect(url)
    } catch (error) {
      // If admin check fails, assume regular user
      const url = request.nextUrl.clone()
      url.pathname = '/community/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}