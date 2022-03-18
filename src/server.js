const express = require("express");
const app = express();
const PORT = 6969;
const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graphql");
const cors = require("cors");

app.use(
  "/graphql",
  cors(),
  graphqlHTTP({ schema: graphqlSchema, graphiql: true })
);

app.listen(PORT, () => {
  console.log("Server running");
});
