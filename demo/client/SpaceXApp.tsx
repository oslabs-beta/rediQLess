import React, { Component, useState} from 'react';
import axios from 'axios';
// import { request, gql } from 'graphql-request'


const SpaceXApp = () => {
    
const [spaceXData, setSpaceXData] = useState('');

const request = async () => {
   const {data} = await axios('http://localhost:1500/rediql')
   .then(data => data)
//    console.log('spaceXApp request => ', data.data.launches[0].mission_name)
console.log(data)
    setSpaceXData(JSON.stringify(data.launches))
    // console.log(typeof data)
   return data
}
 
const clearCache = () => {
    axios('http://localhost:1500/clearCache')
    

}
// const request = () => console.log('button clicked')

        return (
            <div className="SpaceXApp">
                <textarea>{spaceXData}</textarea>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"  onClick={() => request()}>SpaceX Button</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"  onClick={() => clearCache()}>Clear Cache</button>
                
            <div className="spaceXData"> {spaceXData} </div>
            </div>
        )
    
}

export default SpaceXApp