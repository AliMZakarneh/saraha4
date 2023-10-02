 const dataMethod = ['body','query','params','headers'];
 const validation = (Schema)=>{
    return (req,res,next)=>{
        const vlaidationArray = [];
        dataMethod.forEach( (key)=>{
            if(Schema[key]){
                const validationResult = Schema[key].validate(req[key],{abortEarly:false});
                if(validationResult.error){
                    vlaidationArray.push(validationResult.error.details);
                }
            }
        })
        
        if(vlaidationArray.length > 0){
            return res.json({message:"validation error",vlaidationArray});
        }
        else{
            return next();
        }
        

    }
}

export default validation;