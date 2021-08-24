import React from "react";
import '../index.css';
import Navbar from "./navcontainer"
import "@fortawesome/fontawesome-free/css/all.min.css";
import AuthorsContainer from "./authorscontainers";
import SpaceXApp from "./SpaceXApp";
import FeaturesContainer from "./featurecontainer";
import HypeContainer from "./hypecontainer";

export const App:React.FC = () => {
  
    

    return (
    <>
    <Navbar />
    <FeaturesContainer />
    <HypeContainer />
    <AuthorsContainer/>
    <SpaceXApp />
    </>
  )
}