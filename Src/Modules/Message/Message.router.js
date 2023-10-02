import express from 'express';
import * as messageController from './Controller/Message.controller.js';
import { asyncHandler } from '../../Middleware/ErrorHandling.js';
import { auth } from '../../Middleware/Auth.middleware.js';
const app = express();

app.post('/:receiverId',asyncHandler(messageController.sendMessage));
app.get('/',auth,asyncHandler(messageController.getMessage));

export default app;