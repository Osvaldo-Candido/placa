exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table
      .enu('category', [
        'restaurante',
        'placa livre',
        'geladaria',
        'hamburgaria',
        'churrascaria',
        'bar',
      ])
      .notNullable();
    table.string('location', 255).notNullable();
    table.string('business_hours', 255).notNullable();
    table.string('email', 255);
    table.string('phone', 20);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.createTable('users');
