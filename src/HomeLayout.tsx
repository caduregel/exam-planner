import { Outlet } from 'react-router'
import PrivateNav from '@/components/PrivateNav'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@radix-ui/react-separator'
import { ProtectedRoute } from './components/ProtectedRoute'
import { DynamicBreadCrumbs } from './components/DynamicBreadCrumbs'

import { UserDropdown } from './components/UserDropdown'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { Toaster } from 'sonner'

function HomeLayout() {


  return (
    <>
      <ProtectedRoute>
        <div className="flex flex-col items-center justify-center min-h-svh duration-700 transition-all">
          <SidebarProvider>
            <PrivateNav />
            <main className='p-2 w-full min-h-screen flex flex-col'>
              <div
                className='flex items-center gap-2 justify-between sticky top-0 z-30 bg-background/80 backdrop-blur-md py-2'
                style={{ WebkitBackdropFilter: 'blur(8px)' }}
              >
                <div className='flex items-center'>
                  <SidebarTrigger className='hover:cursor-pointer' />
                  <Separator orientation='vertical' />
                  <DynamicBreadCrumbs />
                </div>
                <div className='flex items-center gap-2'>
                  <ThemeSwitcher />
                  <UserDropdown />
                </div>
              </div>
              <Outlet />
              <Toaster richColors/>
            </main>
          </SidebarProvider>
        </div>
      </ProtectedRoute>
    </>
  )
}

export default HomeLayout
