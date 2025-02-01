const mongose = require("mongoose");

const connDB = async () => {
    try
    {
        await mongose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDb connected...')
    } 
    catch (error)
    {
        console.log('Error to connect with MongoDb',error)
        process.exit(1);
    }
}

module.exports = connDB;