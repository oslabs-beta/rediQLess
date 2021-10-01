/**
 * @description Hype is a component in Hype container that explains the core features of RediQLess
 */

import React from 'react'

const Hype = () => {
  return (
    <div>
      <div className="flex justify-evenly py-12 mx-10 ">
        <div className="transform transition duration-500 hover:scale-110 text-center mx-20 text-white-default bg-deeppink-default shadow-2xl rounded-lg border-darkblue-default border-2">
          <h1 className="p-2">What is GraphQL?</h1>
          <article className="p-2">
            Graph Query Language. A spec that describes a declarative query
            language that clients can use to ask an API for the exact data that
            they want. This is achieved by creating a strongly typed Schema for
            your API, ultimate flexibility in how your API can resolve data, and
            client queries validated against your Schema. Think of TypeScript
            for your API.
          </article>
        </div>
        <img
          className="w-2/6 transition ease-out duration-700 rounded-lg"
          src="https://s3.amazonaws.com/ckl-website-static/wp-content/uploads/2017/11/Bannerposter-1280x680.png"
        />
      </div>
      <div className="flex justify-evenly py-12 mx-10">
        <img
          className="w-2/6 h-2/6 rounded-lg"
          src="https://ps.w.org/redis-cache/assets/icon-256x256.gif?rev=2568513"
        />
        <div className="transform transition duration-500 hover:scale-110 text-center mx-20 text-darkblue-default bg-white-default shadow-2xl rounded-lg border-darkblue-default border-2">
          <h1 className="p-2">What Is Redis?</h1>
          <article className="p-2">
            Remote Dictionary Service. An in-memory database with latency that
            can be less than 1 millisecond. Redis stores an object of key-value
            pairs onto your RAM, which then becomes available to your
            application as a de-facto database as a cache. Redis caches work as screenshots of your database to enable quicker access to your application's data.
          </article>
        </div>
      </div>
      <div className="flex justify-evenly py-12 mx-10 ">
        <div className="transform transition duration-500 hover:scale-110 text-center mx-20 text-deeppink-default bg-khaki-alt shadow-2xl rounded-lg border-darkblue-default border-2">
          <h1 className="p-2">So what is RediQLess?</h1>
          <article className="p-2">
          An optimization middleware that leverages the best features of GraphQL and Redis to
            give developers the most lightweight database possible, with average
            runtime speeds of under 10 milliseconds. All while avoiding an
            overabundance of calls to third-party APIs. More specific, more
            efficient, absolutely RediQLess.
          </article>
        </div>
        <div className="relative">
          <img
            className="transform transition duration-500 hover:scale-110 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-16 h-36 mx-auto object-center justify-center content-center transform transition duration-500 animate-pulse"
            src="https://i.ibb.co/ykt2gcX/REDIQLESS-LOGO-YELLOW-R.png"
          />
          <img
            className="max-w-md transition ease-out duration-700 rounded-lg top-1/2 left-1/2 object-center justify-center content-center"
            src="https://thumbs.gfycat.com/CanineSameEwe-max-1mb.gif"
          />
        </div>
      </div>
    </div>
  )
}

export default Hype
