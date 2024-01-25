const httpServer = require('http');
httpServer.on("connection", ()=>{
    console.log("Connected to http server");
})

httpServer.on("request", (req, res)=>{
    switch(req.url){
        case "/":
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.write("<html><body>Hello World</body></html>");
            
            res.end();
            break;

        case "/json":
            res.setHeader("Content-Type", "appication/json");
            res.writeHead(200);
            res.write("{'foo': 'bar'}");
            
            res.end();
            break;

        default:
            res.write("404");
            res.end();
            break;
    }

})

httpServer.listen(8080, ((err)=>{
    console.log("Server is running at port 8080");
}))