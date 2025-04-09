const validateBody = (req,resp, next)=>{
    const {body} = req;
    
    if(body.title === undefined){
        return resp.status(400).json({message:'O titulo é necessario!'})       
    };

    if(body.title === ''){
       return resp.status(400).json({message:'O titulo não pode ser vazio!'})       
    };

    next()
};
const validateStatus = (req,resp, next)=>{
    const {body} = req;
    
    if(body.status === undefined){
        return resp.status(400).json({message:'O status é necessario!'})       
    };

    if(body.status === ''){
       return resp.status(400).json({message:'O status não pode ser vazio!'})       
    };

    next()
};

module.exports={
    validateBody,
    validateStatus,
};