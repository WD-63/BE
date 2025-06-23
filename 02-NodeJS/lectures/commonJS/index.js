// creating http variable and storing the http module in it
const http = require('http');

// creating a server using the http module
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello Class!');
});

// create a port variable and store the port number in it
const port = 4000;

// server listens on the port variable
server.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));