/**
 * @description Query is a component that is a child of the Demo container.  It allows the user to demo a query to the GraphQL/Redis feature.
 */

import React, { Component, useState, useContext } from 'react'
import { TimeContext } from '../containers/App'
import axios from 'axios'

const Query = () => {
  //spaceXData is the state for the query to the SpaceXAPi.  The state changes once GraphQL and Redis have sent back the request.
  const [spaceXData, setSpaceXData] = useState('')
  // create state for the dropdown menu
  const [isOpen, setIsOpen] = useState(false)
  //useContext which is defined in the App.tsx is the state for time (time of the query) and 
  const { timeData, changeTimeData } = useContext<any>(TimeContext)
  //hardcoded Query to GraphQL - need to change to be dynamic
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
const [ queryPreview, setQueryPreview] = useState<any>({
  firstQuery: false,
  secondQuery: false,
  thirdQuery: false
})



  //GraphQL request which is an async request to the GraphQL Api
  const request = async () => {
    // Establishing current time the request is sent
    const timeSent = Date.now()
    // data is requested from reqiql on the backend
    const { data } = await axios('http://localhost:1500/rediql').then(
      (data) => data
    )
    // After the data comes back, and we recieve a response, we create a variable for the time the response came back
    const timeReceived = Date.now()
    // Establishing the time it took  from the time is was sent to the time it was received
    const timeElapsed = timeReceived - timeSent;

    //setting the context of timeData by passing the timeElapsed into changeTimeData
    changeTimeData(timeElapsed)

    //NOTE: Will most likely return to the below to create a streamlined algo to get the data from the backend and turn into a readable string on the front
    //creating a dataArray with Object.entries on data.launches
    const dataArray = Object.entries(data.launches)
    //creating a dataObj by mapping over the dataArray and grabing the values at x[1]
    const dataObj = dataArray.map((x) => Object.values(x[1]))
    //Setting the dataString from the dataObj, this will provide a readible string on the front end
    const dataString = dataObj.map((x) => {
      return `Flight Number: ${x[0]}
        Mission Name: ${x[1]}
        Cost: ${x[2]}
        Launch Success: ${x[3]}
        
        `
    })
    //set state of spaceXdata to be the GraphQL query response
    setSpaceXData(`${dataString}`)
    return data
  }

  const queryArray = [
    `query { 
    launches {
      flight_number
    }`,
    `query { 
      launches {
        flight_number
        mission_name
        launch_success
      }
      }`,
      `query { 
        launches {
          flight_number
          mission_name
          launch_success
          rocket{
            name
          }
        }
        }`
  
  ]

  const clearCache = () => {
    axios('http://localhost:1500/clearCache')
  }
  const queryFill = () => {

    return (queryPreview.firstQuery ? queryArray[0] : ''
    || queryPreview.secondQuery ? queryArray[1] : ''
    || queryPreview.thirdQuery ? queryArray[2] : '' )
    
  }
  return (
    <div className="w-3/6">
      <h2 className="text-center animate-bounce mt-1">↓ Seeing Is Believing ↓</h2>
      {/* <p className="text-center">some instructions here</p> */}
      <div className="h-4/5 p-3 mx-10 text-center">
        <button className="bg-white text-center mb-2 hover:underline" onClick={() => setIsOpen(true)}>
          Click Here For Some RediQLess Sample Queries
        </button>


      {isOpen &&
      
      <div className="bg-white rounded-lg mt-2 mb-2">
        <span
        className="px-2 py-2 cursor-pointer hover:underline"
        onClick = { (e) => {
          e.preventDefault()
          setQueryPreview({
            firstQuery: true,
            secondQuery: false,
            thirdQuery: false  
          })
        }
        }
        >
          Try Query 1
        </span>
        <span
        className="px-2 py-2 cursor-pointer hover:underline"
        onClick = { (e) => {
          e.preventDefault()
          setQueryPreview({
            firstQuery: false,
            secondQuery: true,
            thirdQuery: false  
          })
        }
        }
        >
          Try Query 2
        </span>
        <span
        className="px-2 py-2 cursor-pointer hover:underline"
        onClick = { (e) => {
          e.preventDefault()
          setQueryPreview({
            firstQuery: false,
            secondQuery: false,
            thirdQuery: true  
          })
        }
        }
        >
          Try Query 3
        </span>
      </div>

      }

        {/* {isOpen &&
        <div className="bg-white rounded-lg mt-2">

        <span 
        className="no-underline hover:text-blue px-2 py-2"
        onClick = {(e) =>
        e.preventDefault()
        setQueryPreview({firstQuery: true }) }
        >
          Query 1
        </span>

        <a href="#" 
        className="no-underline hover:text-blue px-2 py-2"
    
        >
          Query 2
        </a>

        <span
        className="no-underline hover:text-blue px-2 py-2"
        >
          Query 3
        </span>

        </div>
      } */}

        <textarea
          className="rounded-lg p-5 py-0.5 resize-none w-full h-full"
          placeholder={spaceXData || queryFill()}
        >
        </textarea>
        <div className="flex flex-center">
          <button
            className="transform transition duration-500 hover:scale-110 bg-darkblue-lighter text-khaki-alt active:bg-gray-100 
                  text-xl font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg hover:bg-green-500 outline-none focus:ring-4 focus-ring-green-500 lg:mr-auto lg:mb-5 ml-auto mb-3"
            onClick={() => request()}
          >
            Query
          </button>
          <button
            className="transform transition duration-500 hover:scale-110 bg-darkblue-lighter text-khaki-alt active:bg-gray-100 
                  text-xl font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg hover:bg-green-500 outline-none focus:ring-4 focus-ring-green-500 lg:mr-auto lg:mb-5 ml-auto mb-3"
            onClick={() => clearCache()}
          >
            Clear Cache
          </button>
        </div>
      </div>
      </div>
    
  )
}

export default Query
