import React, { Component, useState, useContext} from 'react';
import {TimeContext} from '../containers/App';
import axios from 'axios';

const Query = () => {
    const [spaceXData, setSpaceXData] = useState('');
    const {responseTime, setResponseTime} = useContext<any>(TimeContext);

const queryText = `
SpaceX API GQL Query
query { 
	launches {
	  flight_number
	  mission_name
	  launch_success
	}
  }
`

const request = async () => {
    const sentRequest = Date.now()
   const {data} = await axios('http://localhost:1500/rediql')
   .then(data => data)
   const response = Date.now()
   const timeElapsed = response - sentRequest;
   setResponseTime(timeElapsed);
   console.log(`time elapsed = ${response - sentRequest}ms`)
        console.log(data)
    setSpaceXData(JSON.stringify(data.launches))
   return data
}
 
const clearCache = () => {
    axios('http://localhost:1500/clearCache')
}

    return (
        <div className="w-3/6"> 
			<h2 className="text-center">See For Yourself!</h2>
			{/* <p className="text-center">some instructions here</p> */}
			<div className="h-4/5 p-3 mx-10">
				<textarea className="rounded-lg p-5 py-0.5 resize-none w-full h-full" placeholder={spaceXData || queryText}></textarea>  
                <div className="flex flex-center">
				<button className="transform transition duration-500 hover:scale-110 bg-darkblue-lighter text-sand-default active:bg-gray-100 
                  text-xl font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg hover:bg-green-500 outline-none focus:ring-4 focus-ring-green-500 lg:mr-auto lg:mb-5 ml-auto mb-3" 
                  onClick={() => request()}
                  >Query</button>
				<button className="transform transition duration-500 hover:scale-110 bg-darkblue-lighter text-sand-default active:bg-gray-100 
                  text-xl font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg hover:bg-green-500 outline-none focus:ring-4 focus-ring-green-500 lg:mr-auto lg:mb-5 ml-auto mb-3" 
                  onClick={() => clearCache()}
                  >Clear Cache</button>
			</div>    
			</div>
			
        </div>
    )
};

export default Query;