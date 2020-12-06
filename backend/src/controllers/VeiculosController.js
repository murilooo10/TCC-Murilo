const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const{page = 1} = request.query;
        const [count] = await connection('veiculos').count();
        const veiculos = await connection('veiculos')
            .limit(5)
            .offset((page - 1) * 5)
            .select('*');

        response.header('X-Total-Count', count['count(*)']);

        return response.json(veiculos);

    },

    async create(request, response){
        const { chassi, renavam, placa, ano, cor, fabricante, modelo, quilometragem, avarias} = request.body;
        const codigo_perfil = request.headers.authorization;

        const [id] = await connection('veiculos').insert({
            chassi,
            renavam,
            placa,
            ano, 
            cor, 
            fabricante,
            modelo,
            quilometragem,
            avarias
        })
        
        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;

        await connection('veiculos').where('id', id).first().delete();

        return response.status(204).send();
    },

    async update(request, response){
        const{quilometragem, avarias, id} = request.params;

        await connection('veiculos').where('id', id).update({
            quilometragem,
            avarias
        })

        return response.json({ id });
    }
}