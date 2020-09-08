
exports.seed = async function (knex) {
  await knex("users").insert([
    { id: 1, username: "sarahlaw", password: "abc123", department: "hr" },
    { id: 2, username: "sml11", password: "abc122", department: "finance" },
  ]);
};