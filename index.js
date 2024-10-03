const bodyParser = require('body-parser');
const express = require('express');

const path = require('path');

const app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}))

app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
app.use('/public',express.static(path.join(__dirname, 'public')));
app.set('views',path.join(__dirname,'/views'));


var tarefas = ['Arrumar o quarto','Estudar'];

app.post('/', (req, res) => {
    const novaTarefa = req.body.tarefa;
    if (novaTarefa) {
        tarefas.push(novaTarefa);
    }
    res.redirect('/');  // Redireciona para a página principal após adicionar a tarefa
});

app.get('/',(req,res)=>{
    
    res.render('index',{tarefaslist:tarefas});

});

app.get('/deletar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!isNaN(id)) {
        tarefas = tarefas.filter((_, index) => index !== id);
    }
    res.redirect('/');  // Redireciona para a página principal após deletar a tarefa
});
app.listen(5000,()=>{
    console.log('server rodando!');
})