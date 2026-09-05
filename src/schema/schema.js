const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Todo {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    todos: [Todo!]!
    todo(id: ID!): Todo
  }

  type Mutation {
    createTodo(
      title: String!
      description: String
    ): Todo!

    updateTodo(
      id: ID!
      title: String
      description: String
      completed: Boolean
    ): Todo

    deleteTodo(id: ID!): Boolean!
  }
`);

module.exports = schema;