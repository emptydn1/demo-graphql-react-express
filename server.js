const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const indexRouter = require("./src/routes/index");

const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const context = require("./context");
const recipe = require("./src/models/recipe");
const user = require("./src/models/user");

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connect success");
  })
  .catch((err) => {
    console.log(err, "err");
  });

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

app.use(morgan("common"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.log(err);
    }
  }
  next();
});

server.applyMiddleware({
  app,
  path: "/graphql",
});

const PORT = process.env.PORT || 4000;
app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
