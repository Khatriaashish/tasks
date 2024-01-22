const factCalc = (num)=>{
    let fact=1;

    for(let i=1; i<=num; i++){
        fact *= i;
    }

    return fact;
}


console.log(factCalc(10));