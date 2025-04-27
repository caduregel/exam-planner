import './App.css'
import { Button } from './components/ui/button'

function App() {

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-svh">
        <a href="/exam-info" ><Button className='hover:cursor-pointer' variant="outline">Make a study plan</Button></a>
      </div>
    </>
  )
}

export default App
