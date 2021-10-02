import React, { useState } from 'react'
import { useTransition, animated } from 'react-spring'
import '../index.css'
import Navbar from './navcontainer'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AuthorsContainer from './authorscontainers'
import FeaturesContainer from './featurecontainer'
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

  const resetTimeData = () => {
    setTimeData([])
    console.log('timeData has been reset ', timeData)
  }

  const [currentNav, changeCurrentNav] = useState<any>({
    features: true,
    demo: false,
    team: false
  });

  const transitionStyle = {
    from: {x: 0, y: 1000, opacity: 0},
    enter: {x: 0, y: 0, opacity: 1 },
    leave: {x: 0, y: 0, opacity: 0},
    trail: 1000
  }

  const featuresTransition = useTransition(currentNav.features, transitionStyle);

  const demoTransition = useTransition(currentNav.demo, transitionStyle);

  const teamTransition = useTransition(currentNav.team, transitionStyle);

  return (
    <>
      <Navbar currentNav={currentNav} currentNavChange={changeCurrentNav}/>
      {featuresTransition((style, item) =>
          item ? <animated.div style={style} className="itemA">
                  <FeaturesContainer />
                </animated.div> : ''
      )}
      {demoTransition((style, item) =>
        item ? <animated.div style={style} className="itemB">
           { /* setting up TimeContext provider  and passing it the values we want to pass into DemoContainer as props (query.tsx utilizes timeData and ChangeTimeData, chart.tsx utilizes timeData to poppulate graph with information) */ } 
                <TimeContext.Provider value={{  timeData, setTimeData, changeTimeData, resetTimeData }}>
                    <DemoContainer />
                </TimeContext.Provider>
              </animated.div> : ''
      )}
        {teamTransition((style, item) =>
          item ? <animated.div style={style} className="itemC">
                  <AuthorsContainer />
                </animated.div> : ''
        )}    
    </>
  )
}
