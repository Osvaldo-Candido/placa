exports.up = (knex) =>
  knex.schema.createTable('imagesPosts', (table) => {
    table.increments('id').primary();
    table.string('image', 255);
    table
      .integer('id_post')
      .references('id')
      .inTable('posts')
      .onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable('imagesPosts');
