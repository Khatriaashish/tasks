const revWords = (sentence)=>{
    const arr = sentence.split(" ");
    let newSentence = "";
    for(let i=arr.length-1; i>=0; i--){
        newSentence += arr[i] + " ";
    }
    return newSentence;
}

console.log(revWords("Hi this is a test for above function"))