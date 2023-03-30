import { connect } from 'mongoose';


declare var process : {
    env: {
      NODE_ENV: string
      MONGO_URI: string
    }
}

const dbConnect = async ():Promise<void> => {
    const uri: string = process.env.MONGO_URI;

    try {
        const cnx: any = await connect(uri);
        console.log('Mongo Connected');
    } catch (error){
        console.log(error);
    }
    
};

export default dbConnect;
