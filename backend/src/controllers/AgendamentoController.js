const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const agendamento = await connection('agendamento').select('*');

        return response.json(agendamento);

    },

    async create(request, response){
        const { data, hora, titulo, descricao} = request.body;

        const [id] = await connection('agendamento').insert({
            titulo,
            data,
            hora,
            descricao,
        })
        
        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;

        await connection('agendamento').where('id', id).delete();

        return response.status(204).send();
    }
}