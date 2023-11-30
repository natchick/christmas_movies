/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movies_table').del()
  await knex('movies_table').insert([
    {id: 1, title: 'Polar Express', year: 2004},
    {id: 2, title: 'Elf', year: 2003},
    {id: 3, title: 'Home Alone', year: 1990},
    {id: 4, title: `It's a Wonderful Life`, year: 1946}
  ]);
};
