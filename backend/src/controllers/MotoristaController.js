const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const app = require('express');

module.exports = {

    async index(request, response){
    
        const{page = 1} = request.query;
        const [count] = await connection('motoristas').count();
        const motoristas = await connection('motoristas')
        .limit(5)
        .offset((page - 1) * 5)
        .select('*');

        response.header('X-Total-Count', count['count(*)']);
        return response.json(motoristas);
    },

    async create(request, response){

        try{
            const { matricula,  nome, sobrenome, cpf, cnh, rg, idade, sexo, valor_venda, email, password, carteira_trabalho} = request.body;

            //crypto.createHash('md5').update(password).digest("hex");
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt); 

            const data = new Date(Date.now()).toLocaleDateString();
            const [id] = await connection('motoristas').insert({
                    matricula, 
                    nome,
                    sobrenome,
                    idade,
                    sexo,
                    rg,
                    cpf,
                    cnh,
                    carteira_trabalho,
                    valor_venda,
                    email,
                    password: hashedPassword,
                    created_at: data,
                    updated_at: data,
            })
            await connection('usuarios').insert({
                matricula, 
                nome,
                sobrenome,
                email,
                password: hashedPassword,
                codigo_perfil: 3,
                id_motorista:id
            })

    
            return response.json({ id});
        }catch{
            return response.status(401).send();
        }
    },

    async delete(request, response){
        const { id } = request.params;
        await connection('motoristas').where('id', id).first().delete();

        await connection('usuarios').where('id_motorista', id).first().delete();

        return response.status(204).send();
    },

    async update(request, response){
        const{valor_venda, id} = request.params;

        await connection('motoristas').where('id', id).update({
            valor_venda
        })

        return response.json({ id});
    }
}