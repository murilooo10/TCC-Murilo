
exports.up = function(knex) {
    return knex.schema.createTable('agendamento', function(table) {
        table.increments();
        table.string('titulo');
        table.date('data').notNullable();
        table.time('hora', {precision: 6}).notNullable();
        table.string('descricao');

        // table.integer('id_pecas');
        // table.integer('id_veiculo');
        // table.integer('codigo_perfil');

        // table.foreign('id_pecas').references('id').inTable('pecas');
        // table.foreign('id_veiculo').references('id').inTable('veiculos');
        // table.foreign('codigo_perfil').references('id').inTable('usuarios');
        
    
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('agendamento');
  
};
