const mongose = require("mongoose");

const connDB = async () => {

    try
    {  
        const uri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/rentalDB'; 
        
        if (!uri) {
          console.error("Mongo URI is missing!");
          return;
        }

        // await mongose.connect(process.env.MONGO_URI,{
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // });
        await mongose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log('MongoDb connected...')
    } 
    catch (error)
    {
        console.log('Error to connect with MongoDb',error)
        process.exit(1);
    }
}

module.exports = connDB;