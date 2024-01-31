const generateRandom = (len=10)=>{
    let random = "";
    const chars = "0123456789asdfghjklqwertyuiopzxcvbnm";

    for (let i=1; i<=len; i++){
        let pos = Math.ceil(Math.random()*chars.length);
        random += chars[pos-1];
    }
    return random;
}

module.exports = {generateRandom};