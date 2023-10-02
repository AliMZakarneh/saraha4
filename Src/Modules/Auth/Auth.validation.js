import joi from 'joi';

export const signupSchema = {
 body: joi.object({
    userName:joi.string().alphanum().required(),
    email:joi.string().email().required(),
    password:joi.string().required(),
    cPassword:joi.string().valid(joi.ref('password')).required(),
    gender:joi.string().valid('Male','Female'),
    age:joi.number().integer().min(20).max(50).required(),
 }),
 query: joi.object({
    test:joi.boolean().required(),
 })    

};

export const signinSchema = joi.object({
    email:joi.string().email().min(5).required().messages({
        'string.email':"plz enter valid email",
        'string.empty':"email is required"
    }),
    password:joi.string().min(3).required().messages({
        'string.empty':"password is required"
    }),
});