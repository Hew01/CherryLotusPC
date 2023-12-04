const mongoose = require('mongoose')
const fs = require('fs')

const PORT = process.env.PORT || 3000
const connectionString = 'mongodb+srv://duythanhpham2603:gearvn@cluster0.hp4s4im.mongodb.net/gearvn?retryWrites=true&w=majority'

const connectDatabase = async (app, https) => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser :  true,
            useUnifiedTopology : true,
        })
        console.log('Connect to database successfully')
        const options = {
            key: fs.readFileSync('./gearuit.com+5-key.pem'),
            cert: fs.readFileSync('./gearuit.com+5.pem')
        };
        https.createServer(options, app).listen(PORT, () => console.log(`App is running on port ${PORT}`))
    }
    catch(err) {
        console.log('Connect to database failed', err)
    }
}

module.exports = { connectDatabase }