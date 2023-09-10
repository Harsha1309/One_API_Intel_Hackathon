import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Main from './components/Main/Main'

const App = () => {
  return (
    <div className='web'>
      <Navbar/>
      <Main/>
    </div>
  )
}

export default App