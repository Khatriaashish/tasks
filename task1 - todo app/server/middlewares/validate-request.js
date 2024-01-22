const validateRequest = (schema)=>{
    return (req, res, next)=>{
        try{
            const data = req.body;
            schema.parse(data);
            next();
        }
        catch(except){
            next(except)
        }
    }
}

module.exports = validateRequest