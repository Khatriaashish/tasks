const generateRandom = (len=10)=>{
    let random = "";
    const chars = "0123456789asdfghjklqwertyuiopzxcvbnm";

    for (let i=1; i<=len; i++){
        let pos = Math.ceil(Math.random()*chars.length);
        random += chars[pos-1];
    }
    return random;
}

const getTokenFromHeaders = (req)=>{
    let token = null;

        if(req.headers['authorization'])
            token = req.headers['authorization'];

        if(req.headers['x-xsrf-token'])
            token = req.headers['x-xsrf-token'];

        if(req.query['token'])
            token = req.query['token'];

    return token;
}

module.exports = {generateRandom, getTokenFromHeaders};