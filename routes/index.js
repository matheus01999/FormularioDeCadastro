var express = require('express');
var router = express.Router();
var pessoas = [];
var fs = require ('fs')
var arquivo = "./dados/file.js"



/* GET HOMEPAGE */
router.get('/', function(req, res, next) {
  dados = {title: 'Homepage'}
  loadFile(function read(err, data){
    if(err){
      console.log(err)
      dados['pessoas'] = []
    }else{
      dados['pessoas'] = JSON.parse(data)
    }
    res.render('index', dados)
  })
});

/* ROTA DE CADASTRO */

router.post('/cadastrarPessoa', function(req, res, next){
  loadFile(function read(err, data){
    if(err){
      console.log(err)
      return
    }

    pessoas = JSON.parse(data)
    hash = {
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      email: req.body.email
    }
    saveBase(hash)
    res.render('index', {title:"Cadastro" , pessoas:pessoas})
    
  })

})


//Funçoes Auxiliares
var loadFile = function(callback){
  var fs = require ('fs')
  fs.readFile(arquivo, callback)
}

var saveBase = function(hash){
  pessoas.push(hash)
  var fs = require ('fs')
  fs.writeFile(arquivo, JSON.stringify(pessoas), function(err){
    if(err){
      console.log(er)
    }
  })
}


module.exports = router;
