import express from "express";
import * as authController from './Controller/Auth.controller.js';
import { asyncHandler } from "../../Middleware/ErrorHandling.js";
import  validation  from "../../Middleware/Validation.js";
import { signinSchema, signupSchema } from "./Auth.validation.js";

const app = express();

app.post('/signup',validation(signupSchema),asyncHandler(authController.signup));
app.post('/signin',validation(signinSchema),asyncHandler(authController.signin));
app.get('/confirmEmail/:token',asyncHandler(authController.confirmEmail));
app.get('/newConfirmEmail/:refreshToken',asyncHandler(authController.newConfirmEmail));

export default app;
