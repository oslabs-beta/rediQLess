/**
 * @description A component that is imported in the the feature container.  It contains the Key Features of the REDIQLESS product.  
 */

 import React from "react";

 //Features is a component in the features container that houses the two small articles and RediQLess logo that the user sees right under the nav bar
 const Features = () => {
	 return (
		 <div className="flex md:flex-col md:items-center md:justify-center">
				 <div className="transform transition duration-500 hover:scale-110 text-darkblue-default w-2/5 px-8 py-6 border-2 bg-white-default border-yellow-newYellow  shadow-2xl rounded-lg md:flex-col">
					 <h1 className="text-center font-medium mb-4 italic text-xl md:text-lg">Complex Caching...</h1>
					 <article className="md:text-base">One part Redis, one part GraphQL, this is RediQLess - a caching tool for APIs. Utilizing GraphQL’s efficient and elegant querying language and Redis’ lightweight caching, we've leveraged these two features to generate a cache of API results. Built for developers, by developers, to facilitate lightweight and performant applications.</article>
				 </div>
				 <div className="flex items-center justify-center w-1/5 md:flex-col">
				 <img className="h-4/5 transform transition duration-500 hover:animate-pulse max-w-{277px}" src=" https://rediqlessprod.s3.us-east-2.amazonaws.com/REDIQLESS-LOGO-CLEAN.png"></img>
				 </div>
				 
				 <div className="transform transition duration-500 hover:scale-110 text-darkblue-default  w-2/5 px-8 py-4 bg-white-default border-2 border-yellow-newYellow  shadow-2xl rounded-lg md:flex-col">
				 <h1 className="text-center mb-4 font-medium italic text-xl md:text-lg">...Made Simple!</h1>
					 <article className="md:text-base">Leveraging GraphQL’s declarative query language and strongly typed API with Redis’ inimitable caching mechanism, RediQLess caches unique calls to third-party APIs for ultimate comportability and maximum reusability. RediQLess’ cache functions as a replacement for the API, which can be memory-intensive on the client and server side.
 </article>
				 </div>
			 </div>
	 )
 }
 
 export default Features;

