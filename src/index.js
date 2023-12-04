const express = require('express')
const path = require('path')
const livereLoad = require('livereload')
const connectLivereload = require('connect-livereload')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const { connectDatabase } = require('./app/config/database')
const route = require('./routes')
const handlebarsHelpers = require('./app/config/helpers')
const helmet = require('helmet');

const app = express()

const liveReloadServer = livereLoad.createServer()

// apply midlewares
app.use(bodyParser.json())
app.use(express.json({
    type: "*/*"
}))
app.use(bodyParser.urlencoded({ extended : true }))

liveReloadServer.watch(path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname,'public')))
app.use(connectLivereload())

// set up morgan to log requests
app.use(morgan('combined'))

// Use Helmet!
app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["'self'", "data:", "https://product.hstatic.net"],
        "script-src": ["'self'", "http://localhost:35729"],
        "connect-src": ["'self'", "ws://localhost:35729"],
      },
    },
  }));
  

// set up template engine with handlebars
app.engine('.hbs', handlebars.engine({ extname : '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', '.hbs')
app.set('views', './src/views')

// connect to MongoDB
connectDatabase(app)

// routing server
route(app)

