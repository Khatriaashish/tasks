const arr = [1,2,3,4,5,6,7,8,9, 10, 100];

// const sum = arr.reduce((acc, sum)=>acc+sum, 0);

const arraySum = (arr)=>{
    let sum = 0;
    arr.forEach((item)=>sum+=item)
    return sum
}

console.log(arraySum(arr))