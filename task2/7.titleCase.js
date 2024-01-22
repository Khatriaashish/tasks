const wordTransform = (word)=>{
    let firstChar = word.slice(0, 1);
    firstChar = firstChar.toUpperCase();
    let remWord = word.slice(1, word.length);
    return firstChar+remWord;
}


const titleCase = (sentence)=>{
    const wordArray = sentence.split(" ");
    let newSentence = "";
    wordArray.forEach((word)=>{
        newSentence += wordTransform(word) + " ";
    })
    return newSentence;
}

console.log(titleCase("hi this is test sentence for transforming each word of sentence into title case"))


