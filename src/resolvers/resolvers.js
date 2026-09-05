const pool = require("../db/database");

const resolvers = {
  todos: async () => {
    const result = await pool.query(
      "SELECT * FROM todos ORDER BY id DESC"
    );

    return result.rows;
  },

  todo: async ({ id }) => {
    const result = await pool.query(
      "SELECT * FROM todos WHERE id = $1",
      [id]
    );

    return result.rows[0] || null;
  },

  createTodo: async ({ title, description }) => {
    console.log("TITLE:", title);
    console.log("DESCRIPTION:", description);

    const result = await pool.query(
      `
      INSERT INTO todos (title, description)
      VALUES ($1, $2)
      RETURNING *
      `,
      [title, description]
    );

    return result.rows[0];
  },

  updateTodo: async ({
  id,
  title,
  description,
  completed,
}) => {
  const result = await pool.query(
    `
    UPDATE todos
    SET
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      completed = COALESCE($3, completed),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *
    `,
    [title, description, completed, id]
  );

  return result.rows[0] || null;
},

deleteTodo: async ({ id }) => {
  const result = await pool.query(
    "DELETE FROM todos WHERE id = $1 RETURNING id",
    [id]
  );

  return result.rowCount > 0;
},
};

module.exports = resolvers;