const longestWord = (sentence)=>{
    const wordArray = sentence.split(" ");
    let longest = wordArray[0].length;
    let pos = 0;
    for(let i=1; i<wordArray.length; i++){
        if(longest < wordArray[i].length){
            longest = wordArray[i].length;
            pos = i;
        }
    }

    return wordArray[pos];
}

console.log(longestWord("Hi this is a test for Longest Word function abcdefghijklmnopqrstuvwxyz"));