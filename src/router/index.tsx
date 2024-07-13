import { createBrowserRouter } from 'react-router-dom'
import { MainPage } from '@/src/pages/main-page.tsx'
import { ErrorBoundaryFallbackPage } from '@/src/pages/error-boundary-fallback.tsx'
import { NotFoundPage } from '@/src/pages/not-found-page.tsx'
import { AppPages } from '@/src/const/app-pages.ts'

export const router = createBrowserRouter([
  {
    errorElement: <ErrorBoundaryFallbackPage />,
    children: [
      {
        path: AppPages.main,
        element: <MainPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
