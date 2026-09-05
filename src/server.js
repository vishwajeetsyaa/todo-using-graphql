
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema/schema");
const resolvers = require("./resolvers/resolvers");

const app = express();
require("dotenv").config();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
});