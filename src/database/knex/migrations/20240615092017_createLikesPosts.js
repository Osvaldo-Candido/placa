exports.up = (knex) =>
  knex.schema.createTable('likesPosts', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.integer('post_id').unsigned().notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.foreign('user_id').references('id').inTable('Users');
    table
      .foreign('post_id')
      .references('id')
      .inTable('Posts')
      .onDelete('CASCADE');
  });

exports.down = (knex) => knex.schema.dropTable('likesPosts');
