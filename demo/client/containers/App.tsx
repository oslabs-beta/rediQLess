import React, { useState } from 'react'
import { useTransition, animated } from 'react-spring'
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

  const transitionStyle = {
    from: {x: -100, y: 800, opacity: 0, delay: 500 },
    enter: {x: 0, y: 0, opacity: 1, delay: 500 },
    leave: {x: 100, y: 800, opacity: 0, delay: 0 }
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
                  <HypeContainer />
                </animated.div> : ''
      )}
      {demoTransition((style, item) =>
        item ? <animated.div style={style} className="itemB">
           { /* setting up TimeContext provider  and passing it the values we want to pass into DemoContainer as props (query.tsx utilizes timeData and ChangeTimeData, chart.tsx utilizes timeData to poppulate graph with information) */ } 
                <TimeContext.Provider value={{  timeData, setTimeData, changeTimeData }}>
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
