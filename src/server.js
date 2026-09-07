const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors"); // 1. Import cors

const schema = require("./schema/schema");
const resolvers = require("./resolvers/resolvers");

const app = express();
require("dotenv").config();

// 2. Enable CORS for Apollo Studio and allow credentials/headers
// Replace your existing app.use("/graphql", ...) with this:
app.use(
  "/graphql",
  (req, res, next) => {
    // Explicitly set CORS headers for Apollo Studio
    res.setHeader("Access-Control-Allow-Origin", "https://studio.apollographql.com");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Instantly respond to preflight OPTIONS requests
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  },
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
