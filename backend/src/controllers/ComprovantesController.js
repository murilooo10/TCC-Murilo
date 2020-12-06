const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const{page = 1} = request.query;
        const [count] = await connection('comprovantes').count();
        const comprovantes = await connection('comprovantes')
        .limit(5)
        .offset((page - 1) * 5)
        .select('*');

        response.header('X-Total-Count', count['count(*)']);

        return response.json(comprovantes);

    },

    async create(request, response){
        const { url_foto} = request.body;
        const codigo_perfil = response.headers.authorization;

        const id_motorista = await connection('usuarios').where('codigo_perfil', 3).select('id');

        const [id] = await connection('comprovantes').insert({
            url_foto,
            nome,
        })
        
        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;

        await connection('comprovantes').where('id', id).first().delete();

        return response.status(204).send();
    }
}