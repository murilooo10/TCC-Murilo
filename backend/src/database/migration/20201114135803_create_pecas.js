
exports.up = function(knex) {
  return knex.schema.createTable('pecas', function(table) {
    table.increments();
    table.string('nome').notNullable();
    table.string('marca').notNullable();
    table.integer('quantidade').notNullable();
    table.decimal('valor').notNullable();
    table.float('icms', {scale: 2}).notNullable();
    table.string('fornecedor').notNullable();
    table.string('descricao').notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('pecas');
};
