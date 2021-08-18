import React from "react";
import './index.css';
import Navbar from "./containers/navcontainer"
import "@fortawesome/fontawesome-free/css/all.min.css";
import AuthorsContainer from "./containers/authorscontainers";


export const App:React.FC = () => {
  
    return (
    <>
    <Navbar />
      {/* <h1>TS test - before implementing TW Css</h1> */}
    <AuthorsContainer />
     
       
    </>
  )
}