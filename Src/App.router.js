import messageRouter from './Modules/Message/Message.router.js';
import authRouter from './Modules/Auth/Auth.router.js';
import userRouter from './Modules/User/User.router.js';
import connectDB from './DB/connection.js';
import cors from 'cors';

const initApp = (app,express) => {
    connectDB();   
    app.use(cors());
    app.use(express.json());
    app.use('/message',messageRouter);
    app.use('/auth',authRouter);
    app.use('/user',userRouter);

    app.use('*',(req,res)=>{
        return res.json('page not found');
    })
    
}

export default initApp;