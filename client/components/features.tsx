/**
 * @description A component that is imported in the the feature container.  It contains the Key Features of the REDIQLESS product.  
 */

import React from "react";

//Features is a component in the features container that houses the two small articles and RediQLess logo that the user sees right under the nav bar
const Features = () => {
	return (
		<div className="flex">
				<div className="transform transition duration-500 hover:scale-110 text-darkblue-default w-2/5 px-8 py-6 border-2 bg-white-default border-sand-default shadow-2xl rounded-lg">
					<h1 className="text-center mb-4">Complex Caching</h1>
					<article>One part Redis, one part GraphQL, this is RediQLess - a caching tool for APIs. Utilizing GraphQL’s efficient and elegant querying language and Redis’ lightweight caching, we've leveraged these two features to generate a cache of API results. Built for developers, by developers, to facilitate lightweight and performant applications.</article>
				</div>
				<div className="flex items-center justify-center w-1/5">
				<img className="h-4/5 transform transition duration-500 hover:animate-pulse " src="https://i.ibb.co/0f1hmdb/REDIQLESS-LOGO-CLEAN.png"></img>
				</div>
				
				<div className="transform transition duration-500 hover:scale-110 text-darkblue-default  w-2/5 px-8 py-6 bg-white-default border-2 border-sand-default  shadow-2xl rounded-lg">
				<h1 className="text-center mb-4">Made Simple</h1>
					<article>Leveraging GraphQL’s declarative query language and strongly typed API with Redis’ inimitable caching mechanism, RediQLess caches unique calls to third-party APIs for ultimate comportability and maximum reusability. RediQLess’ cache functions as a replacement for the API, which can be memory-intensive on the client and server side.
</article>
				</div>
			</div>
	)
}

export default Features;