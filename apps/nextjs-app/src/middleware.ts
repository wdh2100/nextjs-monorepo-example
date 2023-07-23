import { withAuth } from 'next-auth/middleware';

type MiddlewareEnabledRoutes = (typeof middlewareEnabledRoutes)[number];

const middlewareEnabledRoutes = ['/admin', '/profile', '/test-auth'] as const;

const adminRoutes: MiddlewareEnabledRoutes[] = ['/admin', '/test-auth'];

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const isAdminRoute = adminRoutes.some((routePrefix) =>
        req.nextUrl.pathname.startsWith(routePrefix)
      );
      return !isAdminRoute || token?.role === 'admin';
    },
  },
});

export const config = { matcher: [...middlewareEnabledRoutes] };
