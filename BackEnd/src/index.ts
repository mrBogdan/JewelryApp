import * as http from 'http';

const PORT = 8000;

const server: http.Server = http.createServer((req, res) => {
    res.end();
});

server.listen(PORT, () => {
    console.log('Server is running on ', PORT);
});