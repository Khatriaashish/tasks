const balancedBrackets = (str)=>{
    let strArr = str.split("");
    let stack = [];

    //with left
    strArr.forEach(element => {
        if(element === "[" || element === "{" || element === "("){
            stack.push(element);
        }
        if(element === "]") {
            if(stack[stack.length-1]==='[')
                stack.pop()
            else {
                return "Not balanced brackets 1"
            }
        }
        
        if(element === "}") {
            if(stack[stack.length-1]==='{')
                stack.pop()

            else {
                return "Not balanced brackets 1"
            }
        }
        
        if(element === ")") {
            if(stack[stack.length-1]==='(')
                stack.pop()
            else {
                return "Not balanced brackets 1"
            }
        }
        


        // if((element === "]"&&stack[stack.length-1]==='[') || (element === "}"&&stack[stack.length-1]==='{') || (element === ")"&&stack[stack.length-1]==='(')) {
        //     stack.pop()
        // }
        // else {
        //     return "Not balanced brackets 1"
        // }
        
    });

    if(stack.length !== 0){
        return "Not balanced brackets 2"
    }

    return "Balanced Brackets"
}

console.log(balancedBrackets("()([()])}"));