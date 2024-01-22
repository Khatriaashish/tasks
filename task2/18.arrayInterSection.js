const arrayIntersection = (arr1, arr2)=>{
    let newArr = [];
    arr2.forEach(element => {
        if(arr1.includes(element)){
            newArr.push(element);
        }       
    });

    //filtering multiple occured elements
    newArr = Array.from(new Set(newArr));

    return newArr
}

console.log(arrayIntersection([1,2,3,4,5, 9], [3,4,5,6,7,8,9]))