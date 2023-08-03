//criando uma tabela no sequelize com javascript
const Sequelize = require("sequelize");
const connection = require("./database");
const Pergunta = require("./Perguntas");

const Resposta = connection.define('resposta',{
  corpo:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  perguntaId:{
  type: Sequelize.INTEGER,
    allowNull: false
  }
});

Resposta.sync({force:false}).then(() => {});
module.exports = Resposta;