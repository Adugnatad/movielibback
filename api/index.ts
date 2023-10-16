import "dotenv/config";
import express, { Response } from "express";
import movie_routes from "../router/movie.router";
import cors from "cors";
import http from "http";
import fs from "fs";

const app = express();
app.use(express.json());

app.use(cors());

app.use("/movie", movie_routes);

app.use((req, res) => {
  res.status(405).send();
});

// app.listen(3000, () => {
//   console.log(`
//     🚀 Server ready at: http://localhost:3000`);
// });

// const privateKey = fs.readFileSync("key.pem", "utf-8");
// const certificate = fs.readFileSync("cert.pem", "utf-8");

// const credentials = { key: privateKey, cert: certificate };

const httpServer = http.createServer(app);

const server = httpServer.listen(3000, () => {
  console.log("Server ready at: http://localhost:3000");
});

export default server;
