const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors"); // 1. Import cors

const schema = require("./schema/schema");
const resolvers = require("./resolvers/resolvers");

const app = express();
require("dotenv").config();

// 2. Enable CORS for Apollo Studio and allow credentials/headers
app.use(
  cors({
    origin: ["https://apollographql.com", "http://localhost:4000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 3. Explicitly handle OPTIONS preflight requests
app.options("*", cors());

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
