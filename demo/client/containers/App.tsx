import React, { createContext, useState } from 'react'
import '../index.css'
import Navbar from './navcontainer'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AuthorsContainer from './authorscontainers'
import FeaturesContainer from './featurecontainer'
import HypeContainer from './hypecontainer'
import DemoContainer from './democontainer'



// Exporting the TimeContext by way of createContext, passing in Null as an initial value
export const TimeContext = React.createContext<any>(0)

export const App: React.FC = () => {
  // setting up useState hook for timeData - initialized to an empty array
  const [timeData, setTimeData] = useState([])
  // changeTimeData takes in timeData (a number) and passes the prevState as a callback to state into setTimeData
  const changeTimeData = (timeData: number) => {
    setTimeData(prevState => [...prevState, timeData])
  }

  const [currentNav, changeCurrentNav] = useState<any>({
    features: false,
    demo: true,
    team: false
  });

  return (
    <>
      <Navbar currentNavChange={changeCurrentNav}/>
      {currentNav.features &&
        <div>
          <FeaturesContainer />
          <HypeContainer />
        </div> 
      }
      {currentNav.demo && 
        <TimeContext.Provider value={{  timeData, setTimeData, changeTimeData }}>
          <DemoContainer />
        </TimeContext.Provider>
      }
      {currentNav.team && 
        <AuthorsContainer />
      }
      
      { /* setting up TimeContext provider  and passing it the values we want to pass into DemoContainer as props (query.tsx utilizes timeData and ChangeTimeData, chart.tsx utilizes timeData to poppulate graph with information) */ } 
    </>
  )
}
