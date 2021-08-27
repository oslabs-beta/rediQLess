import React, { createContext, useState } from 'react'
import '../index.css'
import Navbar from './navcontainer'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AuthorsContainer from './authorscontainers'
import SpaceXApp from './SpaceXApp'
import FeaturesContainer from './featurecontainer'
import HypeContainer from './hypecontainer'
import DemoContainer from './democontainer'

export const TimeContext = React.createContext(null)

export const App: React.FC = () => {
  const [time, setTime] = useState(0)
  const changeTime = (num: number) => {
    setTime(num)
  }
  return (
    <>
      <Navbar />
      <FeaturesContainer />
      <HypeContainer />
      <TimeContext.Provider value={{ time, setTime, changeTime }}>
        <DemoContainer />
      </TimeContext.Provider>

      <AuthorsContainer />
    </>
  )
}
