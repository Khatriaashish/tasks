const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json())

app.post('/overwrite', (req, res)=>{
    const data = JSON.stringify(req.body);
    console.log(data)
    fs.writeFileSync("data.json", data);
    res.json({
        message: "Success"
    })
})

app.post('/append', (req, res)=>{
    let data = req.body;
    if(fs.existsSync("data.json")){
        let prevData = fs.readFileSync("data.json", "utf-8");
        prevData = JSON.parse(prevData)
        console.log("data", data);
        console.log("prevdata", prevData);
        data = {...prevData, ...data}
        console.log("last", data)
    }
    
    data = JSON.stringify(data)
    fs.writeFileSync("data.json", data);
    res.json({
        message: "Success"
    })
})

app.listen(3030, (err)=>{
    if(!err){
        console.log("Server at 3030");
    }
})