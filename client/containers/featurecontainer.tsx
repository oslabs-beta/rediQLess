/**
 * @description This section of the SPA is the feature component.  It describes the key features of our product.
 */

 import React from "react";
 import Features from "../components/features";
 
 
  const FeaturesContainer = () => {
 
	 return (
		 <div className="items-center px-16 mb-20 font-bold
		 xs:px-0
		 xs:m-auto

		 sm:px-0
		 sm:m-auto
		 
		 
		 ">
			 <h1 className="text-center mt-10 mb-10 text-khaki-alt xs:text-base sm:text-2xl xl:text-7xl">Not just caching, it's RediQLess.</h1>
			 <Features />

			 <div className="
		 		hidden
				align-middle
				flex-grow
				 w-52
				 h-52
				 m-auto
				 mx-auto
				 md:flex
				 ">
				 <img className="
				 
				 transform transition duration-500 
				 hover:animate-pulse 
				 
				" 
				 src="https://rediqlessprod.s3.us-east-2.amazonaws.com/REDIQLESS-LOGO-CLEAN.png"></img>
				 </div>
		 </div>
	 )
  }
 
  export default FeaturesContainer;