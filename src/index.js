// Import modules
const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const { connectDatabase } = require('./app/config/database');
const route = require('./routes');
const handlebarsHelpers = require('./app/config/helpers');

// Create an Express app
const app = express();

// Apply middlewares
app.use(bodyParser.json());
app.use(express.json({ type: "*/*" }));
app.use(bodyParser.urlencoded({ extended: true }));

// Set up morgan to log requests
app.use(morgan('combined'));

// Set up template engine with handlebars
app.engine('.hbs', handlebars.engine({ extname: '.hbs', helpers: handlebarsHelpers }));
app.set('view engine', '.hbs');
app.set('views', './src/views');

// Connect to MongoDB
connectDatabase(app);

// Routing server
route(app);

// Create a livereload server
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
app.use(connectLivereload());

// Read the certificate and key files
const cert = fs.readFileSync('./gearuit.com+5.pem');
const key = fs.readFileSync('./gearuit.com+5-key.pem');

// Create an HTTPS server with the cert and key
const server = https.createServer({cert, key}, app);

// Start the server
server.listen(3000, () => {
  console.log('Server listening on https://localhost:3000');
});
