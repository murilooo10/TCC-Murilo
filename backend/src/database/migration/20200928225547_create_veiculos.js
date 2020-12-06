exports.up = function(knex) {
    return knex.schema.createTable('veiculos', function(table) {
        table.increments();
        table.string('chassi').notNullable();
        table.string('renavam').notNullable();
        table.string('placa').notNullable();
        table.string('cor').notNullable();
        table.string('ano').notNullable();
        table.string('fabricante').notNullable();
        table.string('modelo').notNullable();
        table.string('quilometragem').notNullable();
        table.string('avarias').notNullable();    

        //table.integer('codigo_perfil');
        //table.foreign('codigo_perfil').references('codigo_perfil').inTable('usuarios');
  
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('veiculos');
};
