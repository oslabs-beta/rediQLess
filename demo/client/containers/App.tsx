import React, {createContext} from "react";
import '../index.css';
import Navbar from "./navcontainer"
import "@fortawesome/fontawesome-free/css/all.min.css";
import AuthorsContainer from "./authorscontainers";
import SpaceXApp from "./SpaceXApp";
import FeaturesContainer from "./featurecontainer";
import HypeContainer from "./hypecontainer";
import DemoContainer from "./democontainer";

let initialTime = 0;
export const TimeContext = React.createContext(initialTime)

export const App:React.FC = () => {
  
    return (
    <>
    <Navbar />
    <FeaturesContainer />
    <HypeContainer />
    <TimeContext.Provider value={initialTime}>
      <DemoContainer/>
    </TimeContext.Provider>

    <AuthorsContainer/>
    </>
  )
}
