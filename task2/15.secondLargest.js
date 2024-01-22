const removeLargest = (arr)=>{
    let large = arr[0];
    let newArr = [];
    for(let i=1; i<arr.length; i++){
        if(arr[i]>large){
            large =arr[i];
        }
    }

    arr.forEach(element => {
        if(element !== large){
            newArr.push(element)
        }
    });

    return newArr;
}

const secondLargest = (arr)=>{
    //removing largest element from array
    const newArr = removeLargest(arr);

    //finding largest element in new Array which gives second largest
    let secondLarge = arr[0];
    for(let i=1; i<newArr.length; i++){
        if(secondLarge<newArr[i]){
            secondLarge = newArr[i];
        }
    }

    return secondLarge;
}

console.log(secondLargest([5,2,78,65,105,654,,2,6,45,85]))

