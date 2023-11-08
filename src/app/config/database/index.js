const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000
const connectionString = 'mongodb+srv://duythanhpham2603:gearvn@cluster0.hp4s4im.mongodb.net/gearvn?retryWrites=true&w=majority'

const connectDatabase = async (app) => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser :  true,
            useUnifiedTopology : true,
        })
        console.log('Connect to database successfully')
        app.listen(PORT, () => console.log(`App is running on port ${PORT}`))
    }
    catch(err) {
        console.log('Connect to database failed', err)
    }
}

module.exports = { connectDatabase }