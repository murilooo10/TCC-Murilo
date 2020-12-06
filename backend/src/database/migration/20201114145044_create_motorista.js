
exports.up = function(knex) {
    return knex.schema.createTable('motoristas', function(table) {
        table.increments();
        table.string('matricula').notNullable();
        table.string('nome').notNullable();
        table.string('sobrenome').notNullable();
        table.string('idade').notNullable();
        table.string('sexo').notNullable();
        table.string('rg').notNullable();
        table.string('cpf').notNullable();
        table.string('cnh').notNullable();
        table.string('carteira_trabalho').notNullable();
        table.string('valor_venda');

        table.timestamps();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('motoristas');
};
