# socket-chat

A [socket.io](http://socket.io/) powered chat application using WebSockets to offer real-time
syncing between users. User interfaces are rendered using [React](https://facebook.github.io/react/).

## Getting started

To get started, simply clone or download this repo and install the dependencies.

#### Clone this repo

```bash
git clone https://github.com/tobysteward/socket-chat.git
cd socket-chat
```

#### Install dependencies

This project depends on [Node.js](https://www.nodejs.org/), [npm](https://www.npmjs.com/)
and [Bower](http://bower.io/). To the build the project run the following:

```bash
$ npm install && bower install
$ gulp build
```

#### Starting server

To start the server run:

```bash
node server.js
```

Navigate to [http://localhost:3000](http://localhost:3000) to check it out.
