const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI');
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false);
const connectDB = async()=>{
    try {
         await mongoose.connect(db,{ useNewUrlParser: true})
        console.log('MongoDB connected..')
    }catch(err) {
        console.log(err.message)
        // Exit process with failure
        process.exit(1)
    }
}

module.exports = connectDB;
