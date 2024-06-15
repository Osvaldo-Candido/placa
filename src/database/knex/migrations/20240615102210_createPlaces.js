exports.up = (knex) =>
  knex.schema.createTable('places', (table) => {
    table.increments('id').primary();
    table.string('city', 255).notNullable();
    table.text('description').notNullable();
    table.text('images');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
exports.down = (knex) => knex.schema.dropTable('places');
