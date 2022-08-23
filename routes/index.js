var express = require('express');
var router = express.Router();
var pessoas = [];
var fs = require ('fs')
var arquivo = "./dados/file.js"



/* GET home page. */
router.get('/', function(req, res, next) {

  fs.readFile(arquivo, 'utf8' , (err,pessoas) => {
    if (err) {
      console.log(err)
      return
    }
    res.render('index', { title: 'Express', pessoas:pessoas });
  })
  
  
});

/* ROTA DE CADASTRO */

router.post('/cadastrarPessoa', function(req, res, next){
  var nome = req.body.nome;
  hash = {
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    cpf: req.body.cpf,
    telefone: req.body.telefone,
    email: req.body.email
  }

  pessoas.push(hash);


  fs.writeFile(arquivo, JSON.stringify(pessoas), function(err){
    if(err){
      console.log(err)
      return
    }
    res.render('index', {title: 'cadastro', pessoas:pessoas})
  })
  
  

})

module.exports = router;
