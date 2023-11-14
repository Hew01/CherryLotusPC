const siteRouter = require('./site')
const pagesRouter = require('./pages')
const userRouter = require('./user')

const route = (app) => {
    app.use('/',siteRouter)
    app.use('/pages', pagesRouter)
    app.use('/users', userRouter)
} 

module.exports = route