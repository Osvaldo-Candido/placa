exports.up = (knex) =>
  knex.schema.createTable('posts', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table
      .enu('category', ['bebida', 'food', 'ice_cream', 'meat'])
      .notNullable();
    table.enu('speciality', ['não', 'sim']).notNullable();
    table.string('name', 255).notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.decimal('current_price', 10, 2);
    table.text('description');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.foreign('user_id').references('id').inTable('Users');
  });

exports.down = (knex) => knex.schema.dropTable('posts');
