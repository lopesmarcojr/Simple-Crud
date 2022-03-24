const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser'); //Necessário para converter o body da requisição para o formato JSON
const app = express();
const path = require('path');
const handlebars = require('express-handlebars');
const urlencondeParser = bodyParser.urlencoded({extended:false});

//Rotas e chamada do template
app.use(express.static('/public'))
app.use('/imgs', express.static('imgs'))
app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));
app.get("/public/css/styles.css", (req,res) => { res.sendFile(__dirname+ "/public/css/styles.css")})
app.get("/public/js/main.js", (req,res) => { res.sendFile(__dirname+ "/public/js/main.js")})
app.get('/', (req,res) => res.render('index'));
app.get('/insert', (req,res) => res.render('insert'));
app.get('/select/:id?', (req,res) => {
  if(!req.params.id){
    let QUERY = "SELECT * FROM usuario"
    db.query(QUERY, (err,result,fields) => {
      res.render('select', {data:result});
    })
  }}
)

//Abertura da conaxão com o banco
const db = mysql.createConnection({
  host:"localhost",
  user:'root',
  password:'root',
  database:'sistema'
})

//Verificação de conexão com o servidor
app.listen(3000, () => console.log('Servidor na porta 3000'));

//Rota para inserir novo usuario no banco de dados
app.post('/controllerForm', urlencondeParser, (req,res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;

  let QUERY = "INSERT INTO usuario (nome,email,senha) VALUES (?, ?, ?)";
  db.query(QUERY, [nome,email,senha], (err,result) => {
    if(err) console.log(err)
    else res.render('controllerForm')
  })
});

//Rota para deletar usuario do banco de dados
app.get('/delete/:id', (req,res) => {
  let QUERY = "DELETE FROM usuario WHERE id=?";
  db.query(QUERY, [req.params.id], (err,result) => {
    if(err) console.log(err)
    else res.render('delete');
  })

})

//Rotas de atualização do usuario
app.get('/update/:id', (req,res) => {
  let QUERY = "SELECT * FROM usuario WHERE id=?";
  db.query(QUERY,[req.params.id], (err,results,fields) => {
    if(err) consolr.log(err);
    res.render('update', {id:req.params.id,nome:results[0].nome,email:results[0].email,senha:results[0].senha})
  })
})

app.post('/controllerUpdate',urlencondeParser, (req,res) => {
  let QUERY = "UPDATE usuario SET nome=?,email=?,senha=? WHERE id=?";
  db.query(QUERY,[req.body.nome,req.body.email,req.body.senha,req.body.id], (err,result) => {
    if(err) console.log(err);
    res.render('controllerUpdate');
  })
})
