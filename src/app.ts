import http from 'http';

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        data: 'test',
      }),
    );
  })
  .listen(3000);
