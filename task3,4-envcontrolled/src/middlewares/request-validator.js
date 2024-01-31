const reqValidator = (schema)=>{
    return (req, res, next)=>{
        try{
            const payload = req.body;
            schema.parse(payload);
            next();
        }
        catch(except){
            next(except);
        }
    }
}

module.exports = reqValidator