const fibonacciSequence = (noOfTerms)=>{
    let a=1;
    let b=1;
    let fib;
    let fibSeq = a+", "+b+", ";
    for(let i=2; i<noOfTerms; i++){
        fibSeq += (a+b) + ', ';
        fib = a+b;
        a=b;
        b=fib
    }
    //omitting extra comma at last
    return fibSeq.slice(0, (fibSeq.length)-2)
}

console.log(fibonacciSequence(10))