const siteRouter = require('./site')
const pagesRouter = require('./pages')
const userRouter = require('./user')
const productRouter = require('./product')
const cartRouter = require('./cart')

const route = (app) => {
    app.use('/',siteRouter)
    app.use('/pages', pagesRouter)
    app.use('/users', userRouter)
    app.use('/products', productRouter)
    app.use('/cart', cartRouter)
} 

module.exports = route