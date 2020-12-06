const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const{page = 1} = request.query;
        const [count] = await connection('pecas').count();
        const pecas = await connection('pecas')
        .limit(5)
        .offset((page - 1) * 5)
        .select('*');

        response.header('X-Total-Count', count['count(*)']);


        return response.json(pecas);

    },

    async create(request, response){
        const { nome, marca, quantidade, valor, icms, fornecedor, descricao} = request.body;
        try{

                const [id] = await connection('pecas').insert({
                    nome,
                    marca,
                    quantidade,
                    valor,
                    icms,
                    fornecedor,
                    descricao
                })
                
                return response.json({ id });
            
        }catch{
            return response.status(401).send();
        }
    },

    async delete(request, response){
        const { id } = request.params;

        await connection('pecas').where('id', id).first().delete();

        return response.status(204).send();
    },

    async put(request, response){
        const{ id} = request.params;
        const {quantidade} = request.body;

        await connection('pecas').where('id', id).update({
            quantidade
        })

        return response.json({ id });
    }
}