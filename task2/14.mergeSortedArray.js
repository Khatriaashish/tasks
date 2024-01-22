const mergeArr = (arr1, arr2)=>{
    let len = arr1.length;

    for(let i=0; i<arr2.length; i++){
        arr1[len+i] = arr2[i];
    }

    const newArr = arr1.sort((a,b)=>{
        return a-b
    });

    return newArr;
}

console.log(mergeArr([1,12,45,68], [35,64,87,12]));