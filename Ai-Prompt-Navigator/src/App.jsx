import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './components/Layout/Footer'

function App() {
  const [count, setCount] = useState(0)
console.log("App is rendering");

  return (
    <>
      hi wassup?
      why you not work ah?
      <Footer/>
    </>
  )
}

export default App
