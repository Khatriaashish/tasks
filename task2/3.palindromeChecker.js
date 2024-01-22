const reverseString = (str)=>{
    let revStr = "";
    for(let i = str.length-1; i>=0; i--){
        revStr += str[i];
    }
    return revStr;
}

const palindromeChecker = (str)=>{
    if(str === reverseString(str)){
        return "Yes, they are palindrome";
    }
    else{
        return "No..no, they aren't palindrome";
    }   
}

console.log("isisia: ", palindromeChecker("isisia"));
console.log("isisi: ", palindromeChecker("isisi"));