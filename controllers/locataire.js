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


app.get('/locataire', (req, res) => {
    let sql = "SELECT *from locataire";
    let query = conn.query(sql, (err, resul) => {
        if (err) {
            throw err;
        } else {
            res.render('locataire', { test: resul })
            //console.log(test);
        }
    });
});

app.post('/locataire/ajout', (req, res) => {
    let data = { Num_locataire: req.body.Num_locataire_add, Nom: req.body.Nom_add, Adresse: req.body.Adresse_add };
    let sql = "INSERT INTO locataire SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) {
            // req.flash('message',"Le numero que vous venez d'entrer existe déjà")
            //  res.send("Le numero que vous venez d'entrer existe déjà"); 
            alert("Le numero que vous venez d'entrer existe déjà");
            res.redirect('/locataire')
        }
        else {
            //     req.flash('message','Ajout avec succées')
          //  alert("Ajout avec succées");
            res.redirect('/locataire')
        }
        ;
    });
});

app.post('/locataire/modifier', (req, res) => {
    let sql = "UPDATE locataire SET Nom='" + req.body.Nom + "', Adresse='" + req.body.Adresse + "'  WHERE Num_locataire='" + req.body.Num_locataire + "'";
    let query = conn.query(sql, (err, results) => {
        if (query) {
            //  req.flash('message',"Mis à jour  éffectuée")
          //  alert("Mis à jour  éffectuée");
            res.redirect('/locataire')
        };
    });
});

app.post('/locataire/supprimer', (req, res) => {

    let sql = "DELETE from louer where Num_locataire= '" + req.body.Num_locataire + "'";
    let query = conn.query(sql, (err, results) => {
        if (query) {
            conn.query("DELETE from locataire where Num_locataire='" + req.body.Num_locataire + "'")
            //req.flash('message',"Suppression éffectuée")}
         //   alert("Suppression éffectuée");
            res.redirect('/locataire');
        }
    });
});
module.exports = app;