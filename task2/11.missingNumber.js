const missingNumber = (n, arr)=>{
    arr = arr.sort();
    missingArr = [];
    for(let i=1; i<=n; i++){
        if(!arr.includes(i)){
            missingArr.push(i)
        }
    }

    return missingArr
}

const arr = [1,2,4,6,7,9,10];
const n = 10;
console.log(missingNumber(n, arr))