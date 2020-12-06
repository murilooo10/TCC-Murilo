// const connection = require("../database/connection")

// module.exports = {
//     async index(request, response) {
//         const codigo_perfil = request.headers.authorization;

//         if( codigo_perfil == 1 || codigo_perfil == 2){

//             const veiculos = await connection('veiculos')
//                 .where('codigo_perfil', codigo_perfil)
//                 .select('*');

//             const agendamento = await connection('agendamento')
//                 .where('codigo_perfil', codigo_perfil)
//                 .select('*')

//             const pecas = await connection('pecas')
//                 .where('codigo_perfil', codigo_perfil)
//                 .select('*')

//         }else if( codigo_perfil == 1 || codigo_perfil == 3){

//             const motoristas = await connection('motoristas')
//                 .where('codigo_perfil', codigo_perfil)
//                 .select('*')

//         }else{
//             if(codigo_perfil == 1){

//                 const analise = await connection('veiculos')
//                 .where('codigo_perfil', codigo_perfil)
//                 .select('*');
//             }
//         }
//     }
// }