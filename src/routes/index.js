const siteRouter = require('./site')
const pagesRouter = require('./pages')

const route = (app) => {
    app.use('/',siteRouter)
    app.use('/pages', pagesRouter)
} 

module.exports = route