import { Outlet } from 'react-router'
import PrivateNav from '@/components/PrivateNav'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@radix-ui/react-separator'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  return (
    <>
      <ProtectedRoute>
        <div className="flex flex-col items-center justify-center min-h-svh">
          <SidebarProvider>
            <PrivateNav />
            <main className='p-2 w-full'>
              <div className='flex'>
                <SidebarTrigger className='hover:cursor-pointer' />
                <Separator orientation='vertical' />
                <Breadcrumb>
                </Breadcrumb>
              </div>
              <Outlet />
            </main>
          </SidebarProvider>
        </div>
      </ProtectedRoute>
    </>
  )
}

export default App
