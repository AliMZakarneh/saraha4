import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import initApp from './Src/App.Router.js'; 
const app = express();
const PORT = process.env.PORT || 3000;

initApp(app,express);
app.listen(PORT, ()=>{
    console.log(`server is runing at ${PORT}`);
});