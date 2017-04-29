# InstaBing

A web app similar to Instagram that allows users to create accounts and save images from Bing to their profile. Users can create an account, browse a feed of all users' images, view specific accounts, search for images using the Bing search API, and attach comments to their images.


### Getting Started
The project includes a Node authentication/content server and a React/Redux/Webpack frontend.

#### Server
Create a MySQL database on your system.

Cd into server directory and install dependencies:
```
	> cd server
	> npm install
```

In "/server/config/" rename "config.default.json" to "config.json" and fill in your database details.

In "/server" rename "config.default.js" to "config.js" and change the secret key if you want to.


Create and seed database tables:

```
	> npm run setup
```

Start the server:
```
	> npm start
```

#### Client
Cd into client directory, install dependencies, then run Webpack dev server:
```
	> cd client
	> npm install
	> npm start
```
