exports.seed = async function (knex) {
  await knex("users").insert([
    { id: 1, username: "sarahlaw", password: "abc123", department: "finance" },
    { id: 2, username: "codelife", password: "test123", department: "it" },
    {
      id: 3,
      username: "atthebeach",
      password: "password",
      department: "sales",
    },
  ]);
};
