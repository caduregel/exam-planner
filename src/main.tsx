import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import routes from './routes.tsx';
import { AuthProvider } from './components/providers/AuthProvider.tsx';
import { ThemeProvider } from './components/providers/ThemeProvider.tsx';
import { Analytics } from "@vercel/analytics/react"

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <div className='transition-colors duration-700 bg-white dark:bg-neutral-950'>
        <AuthProvider>
          <RouterProvider router={router} />
          <Analytics framework="react" />
        </AuthProvider>
      </div>
    </ThemeProvider>
  </StrictMode >,
)