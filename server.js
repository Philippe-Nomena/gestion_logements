const express = require('express');
const bodyParser = require('body-parser');
const mysql= require('mysql');
const locataire = require('./controllers/locataire');
const appartement = require('./controllers/appartement');
const louer = require('./controllers/louer');
//const flash= require('connect-flash');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));

//connexion a la base de donnee
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database'
});
conn.connect(function(err){
    if(err) throw err
    console.log('Base de données connectées');
});

//routes
app.get('/',  (req, res) => {
	res.render("index");
});

app.get('/index',(req,res)=>{
    res.render("index");
})

//middleware
app.set('view engine', 'ejs');
app.set("views", "./views");
app.use('/assets', express.static("public"));
app.use('/',locataire);
app.use('/',appartement);
app.use('/',louer);

//app.use(flash())
app.listen(1234, () => {
    console.log('le port est 1234');
    });
    module.exports = app;
