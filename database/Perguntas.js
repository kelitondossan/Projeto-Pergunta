//criando uma tabela no sequelize com javascript
const Sequelize = require("sequelize");
const connection = require("./database");
//definindo tabela e o tipo com sequelize com javascript NO BANCO DE DADOS SEM USAR SQL
const Pergunta = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING, 
        allowNull:false

    },
    descricao:{
        type: Sequelize.TEXT, 
        allowNull:false

    }
});
//criando a tabela 
Pergunta.sync({force:false}).then(() => {

    console.log("tabela criada")});
module.exports = Pergunta;