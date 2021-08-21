import React from "react";
import '../index.css';
import Navbar from "./navcontainer"
import "@fortawesome/fontawesome-free/css/all.min.css";
import AuthorsContainer from "./authorscontainers";
import SpaceXApp from "./SpaceXApp";
import FeaturesContainer from "./featurecontainer";


export const App:React.FC = () => {
  
    

    return (
    <>
    <Navbar />
    <FeaturesContainer />
      {/* <h1>TS test - before implementing TW Css</h1> */}
    <AuthorsContainer/>
    <SpaceXApp />
    </>
  )
}