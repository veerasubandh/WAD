const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public'); // Static files directory

const server = http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url);
    let pathname = decodeURIComponent(parsedUrl.pathname);
    let filePath = path.join(PUBLIC_DIR, pathname);

    console.log(`Requested file: ${filePath}`);

    // Default to index.html if accessing root
    if (pathname === '/' || pathname === '') {
        filePath = path.join(PUBLIC_DIR, 'index.html');
    } else if (pathname.endsWith('/')) {
        filePath = path.join(PUBLIC_DIR, pathname, 'index.html');
    }

    // Ensure file exists before serving
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('404 - Page Not Found');
        }

        // Read and serve file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('500 - Internal Server Error');
            }

            // MIME Types for different file extensions
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'application/javascript',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.gif': 'image/gif',
                '.json': 'application/json',
            };

            const contentType = mimeTypes[ext] || 'text/plain';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`✅ Educational Portal running at: http://localhost:${PORT}/`);
});
