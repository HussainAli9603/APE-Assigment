### APE Assigment
This project has been generated using the ExpressJs and json file

### Using NPM

axios
body-parser
express
json-server
moment

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8089](http://localhost:8089) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Project structure
.
├── node_module
│      
├── routes
│   ├── main.js                 # Add  and Assign Excavator source code
|
└── views                       # Design template shared code
│       └── Site.html           # Assign work
│       └── View_all.html       # Show All Booking Excavator
│
├── package.json                # Include all project Details
├── data.json                   # Booking and Add Excavator data store in Json Data file
├── package-lock.json           
├── Procfile                    # Its use for online deploy
└── server.js                   # main page of all project

### Server Page

/*
* 'require' is similar to import used in Java and Python. It brings in the libraries required to be used
* in this JS file.
* */
const PORT = process.env.PORT || 8080;
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');

/*
* Loads routes file main.js in routes directory. The main.js determines which function
* will be called based on the HTTP request and URL.
*/
const mainRoute = require('./routes/main');

/*
* Creates an Express server - Express is a web application framework for creating web applications
* in Node JS.
*/
const app = express();
const http = require('http');
const server = http.createServer(app);

const jsonServer = require('json-server')
const server1 = jsonServer.create(app)
const router = jsonServer.router('data.json')
const middlewares = jsonServer.defaults(app)

server1.use(middlewares)
server1.use(router)

// Body parser middleware to parse HTTP body in order to read HTTP data
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
// set up body parsing in express  to be able  to get parse JSON posts
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);

### // HTML Middleware
/*
* 1. HTML is a front-end web templating  that helps to create dynamic web pages using variables
* from Node JS.
*
* 2. Node JS will look at HTML files under the views directory
*
* 3. 'defaultLayout' specifies the main.html file under views/Site as the main template
*
* */
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));


// Creates static folder for publicly accessible HTML, CSS and Javascript files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.static('./public'));
app.use(express.static(__dirname + './public', { maxAge: '30 days' }));
app.use(express.static(__dirname + '/../public'));
app.use(express.static(__dirname + '/static'));


// This folder is used for admin side
app.use('/admin', express.static(__dirname + '/admin'));


app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);

### // Use Routes
/*
* Defines that any root URL with '/' that Node JS receives request from, for eg. http://localhost:8080/, will be handled by
* main which was defined earlier to point to routes/main.js
* */

app.use('/', mainRoute); // mainRoute is declared to point to routes/main.js

// This route maps the root URL to any path defined in main.js

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*
* Creates a unknown port 8080 for express server since we don't want our app to clash with well known
* ports such as 80 or 8080.
* */

### //server.listen(8080);
server.listen(PORT, () => {
  console.log("Node server is running... :", PORT);
});
server1.listen("3003", () => {
  
});

