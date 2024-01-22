const emailValidation = (email)=>{
    //checks if email contains spaces
    if(email.split("").includes(" ")){
        return "Validation Failed 1"
    }

    const arr = email.split("@");

    //check @ occurs only once
    if(arr.length!==2){
        return "Validation Failed 2"
    }

    //check string before @ is more than length 2
    if(arr[0].length<2){
        return "Validation Failed 3"
    }

    const arr2 = arr[1].split(".");
    if(arr2.length<2){
        return "Validation Failed 4"
    }
    //check if string in either side of "." is more than length 2
    arr2.forEach((elem)=>{
        if(elem.length<2)
            return "Validation Failed 5"
    })

    return "Email validated successfully"
}

console.log(emailValidation("snld@adskflml.cc"))