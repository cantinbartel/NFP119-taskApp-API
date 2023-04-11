import { connect } from 'mongoose';

/* DATABASE CONNECTION */
const dbConnect = async ():Promise<void> => {
    const uri: string = process.env.MONGO_URI!;
    try {
        await connect(uri);
        console.log('Mongo Connected');
    } catch (error){
        console.log(error);
    }   
};

export default dbConnect;
