
exports.up = function(knex) {
    return knex.schema.createTable('usuarios', function(table) {
        table.increments();
        table.string('matricula').notNullable();
        table.string('nome').notNullable();
        table.string('sobrenome').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.integer('codigo_perfil').notNullable(); 
  
        table.integer('id_motorista');
        table.foreign('id_motorista').references('id').inTable('motoristas');

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuarios');
};
