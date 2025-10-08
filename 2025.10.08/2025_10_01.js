const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('url');

const PORT = 3000;

http.createServer((req, res) => {
    const { pathname, query } = parse(req.url, true);

    const send = (status, type, data) => {
        res.writeHead(status, { 'Content-Type': `${type}; charset=utf-8` });
        res.end(data);
    };

    switch (pathname) {
        case '/':
        case '':
            send(200, 'text/plain', 'Strona główna');
            break;

        case '/json':
            send(200, 'application/json', JSON.stringify({
                name: "Nikodem Szadejko",
                age: 18,
                profession: "Programista"
            }));
            break;

        case '/html':
            send(200, 'text/html', `
        <!DOCTYPE html>
        <html lang="pl">
        <head><meta charset="UTF-8"><title>Generowany HTML</title></head>
        <body><h1>To jest strona</h1><p>b lalblbblablblaabl</p></body>
        </html>
      `);
            break;

        case '/plik':
            fs.readFile(path.join(__dirname, 'page.html'), (err, data) => {
                if (err) return send(500, 'text/plain', 'Błąd odczytu pliku');
                send(200, 'text/html', data);
            });
            break;

        case '/get_params':
            console.log('Otrzymane parametry GET:', query);

            const timestamp = Date.now();
            const fileName = `params_${timestamp}.json`;
            const filePath = path.join(__dirname, fileName);
            const paramsArray = Object.entries(query);

            fs.writeFile(filePath, JSON.stringify(paramsArray, null, 2), err => {
                if (err) console.error('Błąd zapisu pliku:', err);
                else console.log(`Zapisano parametry do ${fileName}`);
            });

            send(200, 'application/json', JSON.stringify({ ok: 'ok' }));
            break;

        default:
            send(404, 'text/plain', 'Nie znaleziono strony');
    }

}).listen(PORT, () => console.log(`Serwer działa na http://localhost:${PORT}`));
