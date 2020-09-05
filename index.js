//------------//
//  Imports   //
//------------//
const express = require("express");
require("dotenv").config()
const helmet = require("helmet");
const cors = require("cors");
// const session = require("express-session");
// const KnexSessionStore = require("connect-session-knex")(session);
const cookieParser = require("cookie-parser");
const userRouter = require("./users/users-router");

const server = express();
const port = process.env.PORT || 4000;

server.use(helmet());
server.use(cors());
server.use(express.json());
// server.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: "keep it safe",
//     store: new KnexSessionStore({
//       knex: db,
//       createtable: true,
//     }),
//   })
// );

server.use(cookieParser());

server.use(userRouter);
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong",
  });
});

server.listen(port, () => {
  console.log(`Running at http:localhost:${port}`);
});
