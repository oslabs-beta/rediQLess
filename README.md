<p align="center">
<img src="https://rediqless.s3.us-east-2.amazonaws.com/REDIQLESS_LOGOV1.png" width="250" />
</p>
<h1 align ="center">RediQLess</h1>
<p align="center">One part Redis, one part GraphQL, this is RediQLess - a caching tool for APIs.</p>
<p align="center">
<a href="https://github.com/oslabs-beta/rediQLess//blob/main/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/oslabs-beta/rediQLess"></a>
<img alt="npm" src="https://img.shields.io/npm/v/rediQLess">
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

An optimization middleware that leverages the best features of GraphQL and Redis to give developers the most lightweight database possible, with average runtime speeds of under 10 milliseconds. All while avoiding an overabundance of calls to third-party APIs. More specific, more efficient, absolutely RediQLess.

<h2 href="#Features">Features</h2>

- Confluent : A singleton class used to instantiate a Kafka Cluster object using cluster hosted by Confluent.io</br></br>
- Consumer: A wrapper around a kafkaJS Consumer object, instantiate as many (or as few) consumers as needed</br></br>
- Subject: Used to create a new Kafka Socks Subject, which pipes the messages consumed by the Kafka consumers to the specified websocket namespace

<h2>Getting Started</h2>

Install Kafka Socks as an npm module and save it to your package.json as a dependency.

`npm install kafka-socks`

Once installed, you can now require the modules necessary to implement Kafka Socks:

`import { Confluent, Consumer, Subject } from 'kafka-socks';`

<h2 href="#Example">How to Use</h2>

1. Import the library classes needed:

```javascript
import { Confluent, Consumer, Subject } from 'kafka-socks';
```

2. Instantiate a websocket server.  (Done here using socket.io to wrap around an express server):

```javascript
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

```

3. Instantiate the Kafka Cluster object using the Kafka Socks Confluent class:

```javascript
const kafka = new Confluent(
    API_KEY,
    API_SECRET,
    KAFKA_BOOTSTRAP_SERVER
  )
  .create("client-id");

```

4. Instantiate Kafka Socks Consumer object - you can create as many as you need:
 ```javascript
 const kafkaConsumer = kafka.consumer({ groupId: 'your-groupId-here' });
 const kafkaSocksConsumer = new Consumer(kafkaConsumer, 'kafka-topic', 'websocket-event-ID')
 ```

5. Link the Kafkasocks Consumers with websocket namespaces for the front end:
```javascript
const kafkaSocksSubject = new Subject(io, 'websocket-namespace-ID')
```

6. Then simply set up your WebSocket listener on the front end using your favorite WebSockets framework!

<h2 href="#Contributors">Contributors</h2>

Kafka Socks is an open-source community project on Github. While the project is maintained by a small group of dedicated engineers (below), we are grateful to the community for bug fixes, feature development and other contributions.

<table align="center">
  <tr>
    <td valign="top"> <img src="https://rediqless.s3.us-east-2.amazonaws.com/profile.jpg" width="250"/></td>
    <td valign="top"> <img src="https://rediqless.s3.us-east-2.amazonaws.com/1629337049016.jpeg" width="250"/></td>
    <td valign="top"> <img src="https://media-exp1.licdn.com/dms/image/C4D03AQHYrToMqrX8_Q/profile-displayphoto-shrink_800_800/0/1618435070746?e=1635379200&v=beta&t=DeONQx4zzECVOTDOUFKjiAyFCyup0vPv2YDj863yGuE" width="250"/></td>
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
