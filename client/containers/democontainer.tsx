/**
 * @description Demo container houses the query component and the chart component.  The Demo container is wrapped in Create Context to pass state and bubble it back up to its parent component.
 */

 import React from "react";
 import Query from "../components/query";
 import Chart from "../components/chart";
 
 
 
 const DemoContainer = () => {
	 return (
	 <div className="
	 bg-khaki-lighter 
	 ml-auto mr-auto mt-10 mb-4  
	 border-2 
	 p-5 
	 w-4/5 
	 text-darkblue-default 
	 border-deeppink-default shadow-2xl rounded-lg 

	 xs:flex-col 
	 xs:items-center 
	 xs:justify-center 
	 xs:text-center 
	 xs:p-0 
	 xs:max-w-md

	 md:flex-col 
	 md:items-center 
	 md:justify-center 
	 md:text-center 
	 md:p-0 
	 md:max-w-md">
		 <div className="p-0 m-0">
			 <h1 className="text-center p-2 mb-1 mt-1 font-semibold
			 md:text-2xl md:font-bold xs:text-2xl sm:text-2xl sm:font-bold">RediQLess Speeds</h1>
		 </div>
		 <div className="flex justify-evenly 
		 xs:flex-col 
		 xs:items-center 
		 xs:justify-evenly

		 md:flex-col 
		 md:items-center 
		 md:justify-center">
		 <Query />
		 <Chart/>
		 </div>
	 </div>
	 )
 }
 
 export default DemoContainer;
