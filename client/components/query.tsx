 /**
 * @description Query is a component that is a child of the Demo container.  It allows the user to demo a query to the GraphQL/Redis feature.
 */

import React, { Component, useState, useContext } from 'react'
import { TimeContext } from '../containers/App'
import axios from 'axios'
import QueryInfo from '../util/queryinfo';
// import { performance } from 'perf_hooks';

const Query = () => {
  //spaceXData is the state for the query to the SpaceXAPi.  The state changes once GraphQL and Redis have sent back the request.
  const [spaceXData, setSpaceXData] = useState('Please select a query.')
  // create state for the dropdown menu
  const [isOpen, setIsOpen] = useState(false)
  //useContext which is defined in the App.tsx is the state for time (time of the query) and 
  const { changeTimeData, timeData, setTimeData, resetTimeData } = useContext<any>(TimeContext)
  
  const [ queryPreview, setQueryPreview] = useState<any>({
   firstQuery: false,
   secondQuery: false,
   thirdQuery: false,
   queryNum: 0
 })
 
 const queryFill = () => {

  return (queryPreview.firstQuery ? QueryInfo[0] : ''
  || queryPreview.secondQuery ? QueryInfo[1] : ''
  || queryPreview.thirdQuery ? QueryInfo[2] : '' )
  
}

  //GraphQL request which is an async request to the GraphQL Api
  const request = async () => {

    // Establishing current time the request is sent
    
    const timeSent = Date.now()

    // SENDS QUERY TO THE BACKEND BASED ON THE SELECTION MADE

    // let time = performance.now()

   let data: any

   await axios.post('/rediql', {
                data: {
                  query: queryFill()
                }
              })
              .then((res) => {
                
                console.log('Response recieved from the back: ', res.data)
                data = res.data.query.launches
                changeTimeData(res.data.responseTime)
              })
              .catch(err => console.log(`An error occurred: ${err}`))

  
    
console.log('Data from query: ', data)

setSpaceXData(JSON.stringify(data))

  return data;

  }




  const clearCache = async () => {
    await axios('/clearcache')
    .then(resetTimeData())
    .catch((err) => { console.log(err)});
    setSpaceXData('Please select a query.')   
  }
  
  return (
    <div className="w-3/6 pb-8 xs:pb-0 sm:pb-0 md:pb-0 md:flex-col md:w-auto xs:flex-col sm:flex-col xs:w-96 sm:w-96">
      <h2 className="text-center animate-bounce mt-1 md:hidden sm:hidden xs:hidden">↓ Seeing Is Believing ↓</h2>
      {/* <p className="text-center">some instructions here</p> */}
      <div className="h-4/5 p-3 mx-10 text-center
      xs:w-auto
      sm:w-auto
      md:w-auto">
        {!isOpen && <button className="bg-white 
        text-center 
        mb-2 
        hover:underline
        xs:w-auto
        sm:w-auto
        xs:text-sm
        sm:text-sm
        md:w-auto
        md:text-sm" 
        onClick={() => setIsOpen(true)}>
          Click Here For Some Sample Queries
        </button>}


      {isOpen &&
      
      <div className="bg-white rounded-lg mb-2">
        <span
        className="px-2 py-2 cursor-pointer hover:underline xs:text-xs sm:text-base "
        onClick = { (e) => {
          e.preventDefault()
          setQueryPreview({
            firstQuery: true,
            secondQuery: false,
            thirdQuery: false,
            queryNum: 1  
          })
          setSpaceXData('')
          console.log(queryPreview.queryNum)
        }
        }
        >
          Query I
        </span>
        <span
        className="px-2 py-2 cursor-pointer hover:underline xs:text-xs sm:text-base"
        onClick = { (e) => {
          // queryNum: 1
          e.preventDefault()
          setQueryPreview({
            firstQuery: false,
            secondQuery: true,
            thirdQuery: false,
            queryNum: 2  
          })
          setSpaceXData('')
          console.log(queryPreview.queryNum)
        }
        }
        >
          Query II
        </span>
        <span
        className="px-2 py-2 cursor-pointer hover:underline xs:text-xs sm:text-base"
        onClick = { (e) => {
          e.preventDefault()
          setQueryPreview({
            firstQuery: false,
            secondQuery: false,
            thirdQuery: true,
            queryNum: 3  
          })
          setSpaceXData('')
          console.log(queryPreview.queryNum)
        }
        }
        >
         Query III
        </span>
      </div>

      }

        <textarea
          className="rounded-lg p-5 py-0.5 resize-none w-full h-full md:pb-20"
          placeholder={spaceXData || queryFill()}
          readOnly
        >
        </textarea>
        <div className="flex flex-center mt-2 mb-8 xs:mb-0 sm:mb-0 md:mb-0">
          <button
            className="transform transition duration-500 hover:scale-110 bg-darkblue-default text-khaki-alt active:bg-gray-100 
                  text-xl font-bold uppercase px-2 py-2 rounded shadow hover:shadow-lg hover:bg-green-500 outline-none focus:ring-4 focus-ring-green-500 mb-5 mr-auto lg:mb-5 ml-auto mb-3 xs:p-2 xs:text-sm sm:p-2 sm:text-sm md:p-2 md:text-base"
            onClick={() => request()}
          >
            Send Query
          </button>
          <button
            className="transform transition duration-500 hover:scale-110 bg-darkblue-default text-khaki-alt active:bg-gray-100 
                  text-xl font-bold uppercase px-2 py-2 rounded shadow hover:shadow-lg hover:bg-green-500 outline-none focus:ring-4 focus-ring-green-500 mb-5 mr-auto lg:mb-5 ml-auto mb-3 xs:p-2 xs:text-sm sm:p-2 sm:text-sm md:p-2 md:text-base"
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