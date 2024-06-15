exports.up = (knex) =>
  knex.schema.createTable('stablishmentStars', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.integer('establishment_id').unsigned().notNullable();
    table.integer('stars').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.foreign('user_id').references('id').inTable('Users');
    table.foreign('establishment_id').references('id').inTable('Users');
  });

exports.down = (knex) => knex.schema.dropTable('stablishmentStars');
