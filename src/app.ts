import http from "http";
import { test } from "./test";

const server = http
  .createServer((req, res) => {
    console.log("Test", test);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: "test",
      })
    );
  })
  .listen(3000);
