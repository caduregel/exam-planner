import { Outlet } from 'react-router'
import './App.css'
import PublicNav from './components/PublicNav'

function App() {

  
  return (
    <>
      <div>
        <PublicNav />
        <main className='flex flex-col w-full items-center justify-center'>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default App
