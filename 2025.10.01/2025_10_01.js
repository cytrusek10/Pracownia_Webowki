const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Strona główna');

    } else if (req.url === '/json') {

        const data = {
            name: "Nikodem Szadejko",
            age: 18,
            profession: "Programista"
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));

    } else if (req.url === '/html') {

        const html = `
      <!DOCTYPE html>
      <html lang="pl">
      <head>
        <meta charset="UTF-8" />
        <title>Generowany HTML</title>
      </head>
      <body>
        <h1>To jest strona </h1>
        <p>b lalblbblablblaabl</p>
      </body>
      </html>
    `;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);

    } else if (req.url === '/plik') {

        const filePath = path.join(__dirname, 'page.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Błąd odczytu pliku');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Nie znaleziono strony');
    }
});

server.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});
