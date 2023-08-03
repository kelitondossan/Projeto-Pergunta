const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection =  require("./database/database");
const Pergunta = require("./database/Perguntas");
const Resposta = require("./database/Resposta");

//database conexao e tratamente se houver erro ao se conectar ao banco de dados 
connection
.authenticate()
.then(() =>{
    console.log("conexao feita com banco de dados")
})
.catch((msgErro) => {
   console.log("mensagem de erro ")
})


//chamando o ejs para escrever html com javascript no express
app.set('view engine', 'ejs');

//decodificar os dados enviados do formulario
app.use(bodyParser.urlencoded({extended:false}));

//permite que leia dados utilizando json
app.use(bodyParser.json());


//chamando arquivos estaticos como css,imgs, videos e blablabla
app.use(express.static('public'));

// o rednder significa renderizar pagina html ou desenha na tela o html
//Rotas
app.get("/", (req,res) =>{
    Pergunta.findAll({raw: true,order: [
        ['id','DESC'] // ACS = CRESCENTE DESC=DECRESCENTE
    ]}).then(perguntas =>{
        res.render("index.ejs",{
            perguntas: perguntas
        });        
    });

});

app.get("/perguntar", (req,res) =>{
    res.render("perguntar.ejs");});


app.post("/salvarperguntas", (req,res) =>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    



    
     Pergunta.create({
      titulo: titulo,
      descricao: descricao
     }).then(() =>{
        //redireciona o usuario para tela inicial se der sucesso 
        res.redirect("/");
     })

});
    
app.get("/pergunta/:id", (req, res) =>{
    var id = req.params.id;
    Pergunta.findOne({
        where:{id: id}
     
    }).then(pergunta =>{
        if(pergunta != undefined){// pergunta encontrada
       
            Resposta.findAll({
            where: {perguntaId: pergunta.id},
            order: [['id' , 'DESC']]
         }).then(respostas =>{
            
            res.render("pergunta",{
                pergunta: pergunta,
                respostas: respostas
              });
         });                
        }else{//nao encontrda
        res.redirect("/");
        }
    });
})

app.post("/responder",(req,res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() =>{
        res.redirect("/pergunta/"+perguntaId);
    })
});

app.listen(8080,()=>{console.log("App rodando");});