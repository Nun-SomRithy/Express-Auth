import mongoose from 'mongoose';
import config from '../config/default';


async function connect(){
    const dbUri = config.dbUri;
    try{
        await mongoose.connect(dbUri);
        console.log('Connected to database');
    }catch(err){
        console.log('Error connecting to database', err);
        process.exit(1)
    }

}

export default connect;