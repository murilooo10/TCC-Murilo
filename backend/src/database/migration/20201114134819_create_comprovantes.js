
exports.up = function(knex) {
    return knex.schema.createTable('comprovantes', function(table) {
        table.increments();
        table.string('url_foto').notNullable();
        table.string('nome').notNullable();

        //table.integer('id_usuarios');
        //table.integer('id_motoristas');
        //table.foreign('id_motoristas').references('id').inTable('motoristas');
        //table.foreign('id_usuarios').references('id').inTable('usuarios');

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('comprovantes');
  
};
