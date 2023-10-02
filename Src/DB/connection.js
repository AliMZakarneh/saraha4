import mongoose from 'mongoose';

 const connectDB = async()=>{
    
    return await mongoose.connect(process.env.DB_LOCAL).then(()=>{
        console.log('connect database');
    })
    .catch( ()=>{
        console.log('error connect database');
    })

}

export default connectDB;