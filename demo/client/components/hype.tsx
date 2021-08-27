import React from "react";



const Hype = () => {
	return (
	<div>
		<div className="flex justify-evenly py-12 mx-10 ">
			<div className="transform transition duration-500 hover:scale-110 text-center mx-20 text-white-default bg-darkblue-default shadow-2xl rounded-lg">
				<h1 className="mb-6">What is GraphQL? 
</h1>
				<article>Graph Query Language. A spec that describes a declarative query language that clients can use to ask an API for the exact data that they want. This is achieved by creating a strongly typed Schema for your API, ultimate flexibility in how your API can resolve data, and client queries validated against your Schema. Think of TypeScript for your API, or in front of your API.</article>
			</div>
            <img className="max-w-md transition ease-out duration-700 rounded-lg" src="https://media3.giphy.com/media/nvb74G5HEcQhoah9Hv/giphy.gif?cid=ecf05e470k03hxxun7hmi7jsfb5v8eh20dbwyp2t1a8qfa3m&rid=giphy.gif&ct=g"/>


		</div>
		<div className="flex justify-evenly py-12 mx-10">
			<img className="max-w-md rounded-lg"  src="https://ps.w.org/redis-cache/assets/icon-256x256.gif?rev=2568513"/>
			<div className="transform transition duration-500 hover:scale-110 text-center mx-20 text-white-default bg-darkblue-default shadow-2xl rounded-lg">
				<h1 className="mb-6">What Is Redis? 
</h1>
				<article>Remote Dictionary Service. An in-memory database with latency that can be less than 1 millisecond. Redis stores an object of key-value pairs onto your RAM, which then becomes available to your application as a de-facto database, in regards to RediQLess.</article>
			</div>
		</div>
		<div className="flex justify-evenly py-12 mx-10 ">
			<div className="transform transition duration-500 hover:scale-110 text-center mx-20 text-white-default bg-darkblue-default shadow-2xl rounded-lg">
				<h1 className="mb-6">So what is RediQLess?
</h1>
				<article>A piece of middleware that connects these two services together to give developers the most lightweight database possible, with average runtime speeds of under 5 milliseconds. All while avoiding an overabundance of calls to third-party APIs. More specific, more efficient, absolutely RediQLess.</article>
			</div>
            <img className="max-w-md transition ease-out duration-700 rounded-lg" src="http://neologisms.blogs.wm.edu/files/2016/03/vaporwave-1.jpg"/>
		</div>
	</div>
		
	)
};

export default Hype;