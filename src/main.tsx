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
      <AuthProvider>
        <RouterProvider router={router} />
        <Analytics framework="react" />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)