
/**
 * @description Demo container houses the query component and the chart component.  The Demo container is wrapped in Create Context to pass state and bubble it back up to its parent component.
 */

 import React from "react";
 import Query from "../components/query";
 import Chart from "../components/chart";
 
 
 
 const DemoContainer = () => {
	 return (
	 <div className="bg-khaki-lighter ml-auto mr-auto mt-10 mb-4  border-2 p-5 w-4/5 text-darkblue-default border-deeppink-default shadow-2xl rounded-lg">
		 <div className="p-0 m-0">
			 <h1 className="text-center p-0 m-0">RediQLess Speeds...</h1>
		 </div>
		 <div className="flex justify-evenly mb-14">
		 <Query />
		 <Chart/>
		 </div>
	 </div>
	 )
 }
 
 export default DemoContainer;
