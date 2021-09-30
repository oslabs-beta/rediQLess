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

Kafka Socks is an easy-to-use and lightweight framework that combines Kafka consumer functionality with WebSockets to pipe the Kafka messages directly to the frontend client, in realtime. Kafka Socks abstracts away much of the boilerplate and setup of this oft-used Kafka-Websocket architecture, providing developers with a simple and intuitive set of classes to achieve a powerful result on the client-side.

The typical use case for the Kafka Socks library is rendering realtime data on a frontend client, but Kafka Socks framework is unopinionated and flexible enough to process realtime data in whatever way the developer may see fit.

Without a WebSocket, the only way a web client could access data consumed by the Kafka consumer on the server side would be fetch requests. Not only are fetch requests notoriously slow, browsers also limit the number of responded fetch requests a client may have at any given time (most browers set this limit below 10). In short, fetch requests could get the data to the frontend, but doing so would mean that the frontend would lose the ability to access this data in realtime; in applications where frontend rendering in realtime is necessary, fetch requests simply won't work.

Using the observer design pattern, WebSockets permit the server to pipe data in time because there is always an established and open link between the server and client. Kafka Socks did not invent this system design. In fact, it is a relatively common pattern to achieve realtime data processing on the frontend. Instead, Kafka Socks abstracts away the details of implementing this kafka-websocket design pattern, providing developers with an easy way to implement this pattern in a few lines of code.

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
    <td valign="top"> <img src="./docs/ericprofile.jpeg" width="250"/></td>
    <td valign="top"> <img src="./docs/charlieprofile.png" width="250"/></td>
    <td valign="top"> <img src="./docs/cameronprofile.jpeg" width="250"/></td>
    <td valign="top"> <img src="./docs/ianprofile.jpeg" width="250"/></td>
  </tr>
  <tr>
      <td valign="top"><h2 align="center">Eric Saldivar</h2></td>
      <td valign="top"><h2 align="center">Charles Malave</h2></td>
      <td valign="top"><h2 align="center">Travis Woolston</h2></td>
      <td valign="top"><h2 align="center">Ian Judd</h2></td>
  </tr>
   <tr>
      <td align="center"><a href="https://github.com/esaldivar" target="_blank" align="center"> <img src="./docs/githubIcon.png" alt="ericGitHub" width="50" height="50"/></a></td>
      <td align="center"><a href="https://github.com/cmalave13" target="_blank" align="center"> <img src="./docs/githubIcon.png" alt="charlieGitHub" width="50" height="50"/></a></td>
      <td align="center"><a href="https://github.com/cwalls45" target="_blank" align="center"> <img src="./docs/githubIcon.png" alt="travisGitHub" width="50" height="50"/></a></td>
      <td align="center"><a href="https://github.com/ikjudd" target="_blank" align="center"> <img src="./docs/githubIcon.png" alt="IanGitHub" width="50" height="50"/></a></td>
  </tr>
</table>

We welcome contributions to Kafka Socks, but we also would love to see a thriving third-party ecosystem. If you are interest in creating an open-source project that builds on top of Kafka Socks, please don't hesitate to reach out, and we'd be happy to provide feedback and support.

<h2 href="#License">License</h2>

This product is licensed under the MIT License - see the LICENSE.md file for details.

This is an open source product. We are not affiliated nor endorsed by either the Apache Software Foundation or KafkaJS.

This product is accelerated by [OS Labs](https://opensourcelabs.io/).
