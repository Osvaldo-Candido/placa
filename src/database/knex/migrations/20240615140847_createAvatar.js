exports.up = (knex) =>
  knex.schema.createTable('avatar', (table) => {
    table.increments('id').primary();
    table.string('name', 255);
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.createTable('avatar');
