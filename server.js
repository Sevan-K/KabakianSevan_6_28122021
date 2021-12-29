// import du paquet http
const http = require("http");
// import du fichier app 
const app = require("./app");

app.set("port", process.env.PORT || 3000);

const server = http.createServer(app);

server.listen(process.env.PORT || 3000);
