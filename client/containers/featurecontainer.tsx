/**
 * @description This section of the SPA is the feature component.  It describes the key features of our product.
 */

 import React from "react";
 import Features from "../components/features";
 
 
  const FeaturesContainer = () => {
 
	 return (
		 <div className="items-center px-16 mb-20 font-bold xs:px-0 xs:m-auto">
			 <h1 className="text-center mt-10 mb-10 text-khaki-alt xs:text-base">Not just caching, it's RediQLess.</h1>
			 <Features />
		 </div>
	 )
  }
 
  export default FeaturesContainer;