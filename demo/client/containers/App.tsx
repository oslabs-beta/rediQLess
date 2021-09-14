import React, { createContext, useState } from 'react'
import '../index.css'
import Navbar from './navcontainer'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AuthorsContainer from './authorscontainers'
import SpaceXApp from './SpaceXApp'
import FeaturesContainer from './featurecontainer'
import HypeContainer from './hypecontainer'
import DemoContainer from './democontainer'
import StretchContainer from './stretchcontainer'

export const TimeContext = React.createContext(null)

export const App: React.FC = () => {
  const [time, setTime] = useState(0)
  const [timeData, setTimeData] = useState([])
  const changeTime = (num: number) => {
    setTime(num)
  }
  const changeTimeData = (timeData: number) => {
    setTimeData(prevState => [...prevState, timeData])
  }
  return (
    <>
      <Navbar />
      <FeaturesContainer />
      <HypeContainer />
      <TimeContext.Provider value={{ time, setTime, timeData, setTimeData, changeTime, changeTimeData }}>
        <DemoContainer />
      </TimeContext.Provider>
      <StretchContainer/>
      <AuthorsContainer />
    </>
  )
}
