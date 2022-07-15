<p align="center">
<img src="https://rediqless.s3.us-east-2.amazonaws.com/REDIQLESS-LOGO-CLEAN+(2).png" width="250" />
</p>
<h1 align ="center">RediQLess</h1>
<p align="center">One part Redis, one part GraphQL, this is RediQLess - a caching tool for APIs.</p>
<p align="center">
<a target="_blank" href="https://github.com/oslabs-beta/rediQLess//blob/main/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/oslabs-beta/rediQLess"></a> 
<a href="https://www.npmjs.com/package/rediqless"><img alt="npm" src="https://img.shields.io/npm/v/rediqless"></a>
<a href="https://github.com/oslabs-beta/rediQLess/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/oslabs-beta/rediQLess"></a>
<a href="https://github.com/oslabs-beta/rediQLess/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/oslabs-beta/rediQLess"></a>
<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/oslabs-beta/rediQLess">

</p>
<h2>Table of Contents</h2>

- [About](https://github.com/oslabs-beta/rediQLess/#About)
- [Features](https://github.com/oslabs-beta/rediQLess/#Features)
- [Getting Started](https://github.com/oslabs-beta/rediQLess/#Getting-Started])
- [Example](https://github.com/oslabs-beta/rediQLess/#Example)
- [Contributors](https://github.com/oslabs-beta/rediQLess/#Contributors)
- [License](https://github.com/oslabs-beta/rediQLess/#License)

<h2 href="#About">About</h2>

One part Redis, one part GraphQL, this is RediQLess - a caching tool for APIs. Utilizing GraphQL’s efficient and elegant querying language and Redis’ lightweight caching, we've leveraged these two features to generate a cache of API results. Built for developers, by developers, to facilitate lightweight and performant applications.

Leveraging GraphQL’s declarative query language and strongly typed API with Redis’ inimitable caching mechanism, RediQLess caches unique calls to third-party APIs for ultimate comportability and maximum reusability. RediQLess’ cache functions as a replacement for the API, which can be memory-intensive on the client and server side.

An optimization middleware that leverages the best features of GraphQL and Redis to give developers the most lightweight database possible, with runtime speeds that average to around eighty to ninety percent faster than standard calls to an API. All while avoiding an overabundance of calls to third-party APIs. More specific, more efficient, absolutely RediQLess.

## How It Works

RediQLess as a middleware is powered by two class objects, RediQL and RediCache. RediQL is a dynamic query caching mechanism which leverages the RediCache Class Object to communicate with Redis on your local Redis port to initialize Redis functionaly. The RediCache Class Object uses incoming queries as a map to navigate Redis' key-value store; destructuring the queries into a series of constant time-readable key-value pairs with references to connected nodes. If RediCache finds that incoming query information is stored within Redis, RediCache is able to return that requested data in sub-15ms time. If RediCache does not find the incoming query within the Redis Store, the query is sent back through RediQL to grab the information in the requested API schema via GraphQL. As the data returns to the client, it is simultaneously sent back to RediCache to store that data for future use.

## Getting Started

### 1. Installing and Connecting to a Redis Server

This package is meant to work in conjunction with redis. To install redis:

- Mac-HomeBrew:

  - At the terminal, `brew install redis`
  - Start redis server with `redis-server`

- Linux or Window:
  - Download appropriate version of Redis from [redis.io/download](redis.io/download)
  - Once installation is completed, start redis server with `redis-server`

Once Redis is installed, your server should reflect the below:

- Note: The default port is `6379`

```javascript
const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});
```

### 2. Installing RediQLess

Install RediQLess as an npm module and save it to your package.json as a dependency.

`npm install rediqless --save-dev`

### 3. Setting up your Server Port

Create a .env file, to create your PORT which will be leveraged by the RediQLess middleware

Your Server file should reflect the below:

```javascript
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
```

## 4. Require GraphQL and Schema

The Express GraphQL Server is leveraged by RediQLess

```javascript
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
```

## 5. Implementing RediQLess for Queries and Caching

```javascript
const { RediQLess } = require("rediqless");
const RediQL = new RediQLess(redisClient);
const RediQLQuery = RediQL.query;
const RediQLClear = RediQL.clearCache;
```

## How to Use RediQLess

Below is a typical Express Server set up utilizing RediQLess:

```javascript
// Require in Express and app
const express = require('express');
const app = express();

// Require/Config dotenv for access to your PORT
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;

// Require GraphQL and Schema
const graphql  = require('express-graphql');
const schema = require('./schema/schema');

// Initialize up Redis Client
const redis = require('redis');
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
});

// Require in RediQLess middleware
const { RediQLess } = require('rediqless');
// Pass redisClient into RediqLess Constructor
const RediQL = new RediQLess(redisClient);
// Implement RediQLess' query capability
const RediQLQuery = RediQL.query;
// Implement RediqLess' cache clearing capability
const RediQLClear = RediQL.clearCache;

// Leverage RediQLess Queries
// ** Assign queries on the front-end to 'req.body.data.query'
app.use('/rediql', RediQLQuery, (req, res) => {
  return res.status(202).send(res.locals.query)
});

// Leverage RediQLess Cache Clearing
app.use('/clearcache', RediQLClear, (req, res) => {
  return res.status(202).send('Cache Cleared')
});

// RediQLess query will forward request to this Middleware if information is not yet cached
app.use('/graphql', graphqlHTTP.graphqlHTTP({ schema, graphiql: true }));
```

<h2 href="#Contributors">Contributors</h2>

RediQLess is an open-source community project on Github. While the project is maintained by a small group of dedicated engineers (below), we are grateful to the community for bug fixes, feature development and other contributions.

<table align="center">
  <tr>
    <td valign="top"> <img src="https://rediqless.s3.us-east-2.amazonaws.com/profile.jpg" width="250"/></td>
    <td valign="top"> <img src="https://rediqless.s3.us-east-2.amazonaws.com/1629337049016.jpeg" width="250"/></td>
    <td valign="top"> <img src="https://rediqless.s3.us-east-2.amazonaws.com/Screen+Shot+2021-10-21+at+10.30.15+PM.png" width="250"/></td>
    <td valign="top"> <img src="https://media-exp1.licdn.com/dms/image/C4D03AQEOE2BopNqOmg/profile-displayphoto-shrink_800_800/0/1529432272197?e=1635379200&v=beta&t=CcNs7vSOXoStA_orsa2VazEHGbAwNPJMWmvxvYmQkok" width="250"/></td>
  </tr>
  <tr>
      <td valign="top"><h2 align="center">Eric Saldivar</h2></td>
      <td valign="top"><h2 align="center">Charles Malave</h2></td>
      <td valign="top"><h2 align="center">Travis Woolston</h2></td>
      <td valign="top"><h2 align="center">Ian Judd</h2></td>
  </tr>
   <tr>
      <td align="center"><a href="https://github.com/esaldivar" target="_blank" align="center"> <img src="https://rediqless.s3.us-east-2.amazonaws.com/ghicon.png" alt="ericGitHub" width="50" height="50"/></a></td>
      <td align="center"><a href="https://github.com/cmalave13" target="_blank" align="center"> <img src="https://rediqless.s3.us-east-2.amazonaws.com/ghicon.png" alt="charlieGitHub" width="50" height="50"/></a></td>
      <td align="center"><a href="https://github.com/TravisWoolston" target="_blank" align="center"> <img src="https://rediqless.s3.us-east-2.amazonaws.com/ghicon.png" alt="travisGitHub" width="50" height="50"/></a></td>
      <td align="center"><a href="https://github.com/ikjudd" target="_blank" align="center"> <img src="https://rediqless.s3.us-east-2.amazonaws.com/ghicon.png" alt="IanGitHub" width="50" height="50"/></a></td>
  </tr>
</table>

We welcome contributions to RediQLess, but we also would love to see a thriving third-party ecosystem. If you are interest in creating an open-source project that builds on top of RediQLess, please don't hesitate to reach out, and we'd be happy to provide feedback and support.

<h2 href="#License">License</h2>

This product is licensed under the MIT License - see the LICENSE.md file for details.

This is an open source product.

This product is accelerated by [OS Labs](https://opensourcelabs.io/).
