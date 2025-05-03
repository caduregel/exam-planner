import { Outlet } from 'react-router'
import PrivateNav from '@/components/PrivateNav'

function App() {

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-svh">
        <header>
          <PrivateNav />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default App
