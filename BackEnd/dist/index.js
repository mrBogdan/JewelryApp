"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 8000;
const server = http.createServer((req, res) => {
    let indexHtml = '';
    const indexFilePath = `${path.resolve(__dirname)}/views/index.html`;
    console.log('path --> ', indexFilePath);
    fs.readFile(indexFilePath, function (err, buf) {
        console.log();
    });
    console.log(indexHtml);
    res.end();
});
server.listen(PORT, () => {
    console.log('Server is running on ', PORT);
});
