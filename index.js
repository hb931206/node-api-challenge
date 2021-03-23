const express = require("express");
const server = express();
const projectRouter = require("./projects/projectRouter");
const actionRouter = require("./actions/actionRouter");

server.use(express.json());
server.use("/projects", projectRouter);
server.use("/actions", actionRouter);

const port = 2500;

// server.use((err, req, res, next) => {
//   console.log(err);
//   res.status(500).json({
//     message: "Whoops Something went wrong. Pleas try again later",
//   });
// });

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
