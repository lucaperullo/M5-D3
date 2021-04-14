import express from "express";
import projectRoutes from "./projects/index.js";
import {
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  badRequestHandler,
  catchAllHandler,
} from "./errorHandling.js";

const server = express();
const port = process.env.PORT;

server.use(express.json());
server.use("/projects", projectRoutes);

server.use(notFoundHandler);
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(badRequestHandler);
server.use(catchAllHandler);

server.listen(port, () => {
  console.log(
    "database listening on at http://localhost:" + port,
    "you can get the students route on " +
      "http://localhost:" +
      port +
      "/projects"
  );
});
