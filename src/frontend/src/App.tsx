import { useState } from 'react'
import './App.css'
import FullBoard from './components/Board/FullBoard'
import InfoSection from './components/InformationSection/InfoSection'

function App() {

  return (
    <>
      <InfoSection />
      <FullBoard />
    </>
  )
}

export default App
