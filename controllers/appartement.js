const express = require('express');
const mysql = require('mysql');
const app = express.Router();
//const flash = require('connect-flash')


//connexion a la base de donnee
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database'
});

//app.use(flash())


// routes


app.get('/appartement', (req, res) => {
    let sql = "SELECT *from appartement";
    let query = conn.query(sql, (err, resul) => {
        if (err) {
            throw err;
        } else {
            res.render('appartement', { test: resul })
            //console.log(test);
        }
    });
});

app.post('/appartement/ajout', (req, res) => {
    let data = { Num_app: req.body.Num_appartement_add, Designation: req.body.designation_add, lieu: req.body.lieu_add, loyer_mensuel: req.body.loyer_mensuel_add };
    let sql = "INSERT INTO appartement SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) {
            // req.flash('message',"Le numero que vous venez d'entrer existe déjà")
            // res.send("Le numero que vous venez d'entrer existe déjà"); 
            alert("Le numero que vous venez d'entrer existe déjà");
            res.redirect('/appartement')
        }
        else {
            //     req.flash('message','Ajout avec succées')
            //alert("Ajout avec succées");
            res.redirect('/appartement')
        }
        ;
    });
});

app.post('/appartement/modifier', (req, res) => {
    let sql = "UPDATE appartement SET Designation='" + req.body.Designation + "', lieu='" + req.body.lieu + "' , loyer_mensuel='" + req.body.loyer_mensuel + "'  WHERE Num_app='" + req.body.Num_app + "'";
    let query = conn.query(sql, (err, results) => {
        if (query) {
            //  req.flash('message',"Mis à jour  éffectuée")
           // alert("Mis à jour  éffectuée");
            res.redirect('/appartement')
        };
    });
});

app.post('/appartement/supprimer', (req, res) => {

    let sql = "DELETE from louer where Num_app= '" + req.body.Num_app + "'";
    let query = conn.query(sql, (err, results) => {
        if (query) {
            conn.query("DELETE from appartement where Num_app='" + req.body.Num_app + "'")
            //req.flash('message',"Suppression éffectuée")}
          //  alert("Suppression éffectuée");
            res.redirect('/appartement');
        }
    });
});
module.exports = app;