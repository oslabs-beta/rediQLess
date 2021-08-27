import React from "react";



const Query = () => {

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

    return (
        <div className="w-3/6"> 
			<h2 className="text-center">Query Instructions</h2>
			<p className="text-center">some instructions here</p>
			<div className="h-4/5 p-3 mx-10">
				<textarea className="rounded-lg p-5 py-0.5 resize-none w-full h-full" placeholder={queryText}></textarea>  
                <div className="flex flex-center">
				<button className="transform transition duration-500 hover:scale-110 bg-darkblue-lighter text-sand-default active:bg-gray-100 
                  text-xl font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg hover:bg-green-500 outline-none focus:ring-4 focus-ring-green-500 lg:mr-auto lg:mb-5 ml-auto mb-3">Query</button>
				<button className="transform transition duration-500 hover:scale-110 bg-darkblue-lighter text-sand-default active:bg-gray-100 
                  text-xl font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg hover:bg-green-500 outline-none focus:ring-4 focus-ring-green-500 lg:mr-auto lg:mb-5 ml-auto mb-3">Clear Cache</button>
			</div>    
			</div>
			
        </div>
    )
};

export default Query;