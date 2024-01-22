const reverseString = (str)=>{
    let revStr = "";
    for(let i = str.length-1; i>=0; i--){
        revStr += str[i];
    }
    return revStr;
}

const str = "Hi this is a practise problem 1";
console.log("Original String: ", str);
console.log("Reversed String: ", reverseString(str));