const express = require('express');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
    res.send('Strona główna');
});


app.get('/data', (req, res) => {
    const data = {
        imie: 'Nikodem',
        wiek: 18,
        hobby: ['gry', 'muzyka', 'programowanie']
    };
    res.json(data);
});


app.get('/html', (req, res) => {
    const html = `
    <html>
      <head><title>HTML z Node.js</title></head>
      <body>
        <h1>DWADAWDWADWADAW</h1>
        <p>Serwer działa poprawnie </p>
      </body>
    </html>
  `;
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
});


app.get('/file', (req, res) => {
    const filePath = path.join(__dirname, 'assets', 'plik.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Nie udało się odczytać pliku' });
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.send(data);
        }
    });
});


app.get('/get_params', (req, res) => {
    console.log('Odebrane parametry GET:', req.query);

    const paramsArray = Object.entries(req.query).map(([key, value]) => ({ key, value }));
    const timestamp = Date.now();
    const filePath = path.join(__dirname, `params_${timestamp}.json`);

    fs.writeFile(filePath, JSON.stringify(paramsArray, null, 2), (err) => {
        if (err) {
            console.error('Błąd zapisu pliku:', err);
            res.status(500).json({ error: 'Błąd zapisu pliku' });
        } else {
            res.json({ ok: 'ok' });
        }
    });
});

app.get('*', (req, res) => {
    const filePath = path.join(__dirname, 'assets', req.path);
    fs.stat(filePath, (err, stats) => {
        if (!err && stats.isFile()) {
            const mimeType = mime.lookup(filePath) || 'application/octet-stream';
            res.setHeader('Content-Type', mimeType);
            fs.createReadStream(filePath).pipe(res);
        } else {
            res.status(404).json({ error: 'Plik nie został znaleziony' });
        }
    });
});


app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});
