const http = require('http');
const app = require('./config/express.config');

const server = http.createServer(app);

server.listen(5000, (err)=>{
    console.log("Server is running at port 5000");
    console.log("http://localhost:5000");
    console.log("Ctrl+c to close the server");
})