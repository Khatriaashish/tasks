const calcPower = (num, pow)=>{
    let res = 1;
    for(let i=1; i<=pow; i++){
        res*= num;
    }
    return res;
}

console.log(calcPower(5, 5));