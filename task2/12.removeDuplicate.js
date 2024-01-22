const removeDuplicate = (arr)=>{
    //using Set
    // const newArr = new Set(arr);
    // return Array.from(newArr);

    let newArr = [arr[0]];
    arr.map((item)=>{
        if(!(newArr.includes(item)))
            newArr.push(item);
    })
    return newArr
}

const arr = [1, 1, 2, 3, 2, 3];
console.log(removeDuplicate(arr));