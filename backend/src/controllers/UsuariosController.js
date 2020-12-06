const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const app = require('express');

module.exports = {

    async index(request, response){ //get
        const perfil = await connection('usuarios').select('*');
        
        return response.json(perfil);
    },

    async create(request, response){ //postx
        try{


            const { matricula,  nome, sobrenome, codigo_perfil, email, password} = request.body;

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt); 
            //crypto.createHash('md5').update(password).digest("hex");
            
                const [id] = await connection('usuarios').insert({
                    matricula, 
                    nome,
                    sobrenome,
                    email,
                    password: hashedPassword,
                    codigo_perfil,
                })

    
            return response.json({ id })
        }catch{
            return response.status(401).send();
        }
    },

    async delete(request, response){
        const { id } = request.params;

        await connection('usuarios').where('id', id).first().delete();

        return response.status(204).send();
    }
}