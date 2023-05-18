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


app.get('/louer', (req, res) => {
    let sql = "SELECT *from louer";
    let query = conn.query(sql, (err, resul) => {
        if (err) {
            throw err;
        } else {
            res.render('louer', { test: resul })
            //console.log(test);
        }
    });
});

app.post('/louer/ajout', (req, res) => {
    let data = { Num_locataire: req.body.Num_locataire_add, Num_app: req.body.Num_appartement_add, nbmois: req.body.nbmois_add, date_d_entree: req.body.date_d_entree_add };
    let sql = "INSERT INTO louer SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) {
             // req.flash('message',"Le numero que vous venez d'entrer existe déjà")
            // res.send("Le numero que vous venez d'entrer existe déjà"); 
           // alert("Le numero que vous venez d'entrer existe déjà");
            res.redirect('/louer')
        }
        else {
            //req.flash('message','Ajout avec succées')
           //alert("Ajout avec succées");
            res.redirect('/louer')
        }
        ;
    });
});

app.post('/louer/modifier', (req, res) => {
    let sql = "UPDATE louer SET date_d_entree='" + req.body.date_d_entree + "', nbmois='" + req.body.nbmois + "'  WHERE Num_locataire='"+req.body.Num_locataire+"' and Num_app='" + req.body.Num_app + "'";
    let query = conn.query(sql, (err, results) => {
        if (query) {
           //req.flash('message',"Mis à jour  éffectuée")
           //alert("Mis à jour  éffectuée");
            res.redirect('/louer')
        };
    });
});

app.post('/louer/supprimer', (req, res) => {
    let sql = "DELETE from louer where Num_locataire='"+req.body.Num_locataire+"' and Num_app= '" + req.body.Num_app + "'";
    let query = conn.query(sql, (err, results) => {
        if (query) {
            res.redirect('/louer');
        }
    });
});
module.exports = app;