var express = require('express');
var Twig = require('twig'), 
    twig = Twig.twig;  
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'imran'
});

connection.connect();

connection.query('SELECT * FROM mee', function (err, rows, fields) {
  if (err) throw err
});

/* GET home page. */
router.get('/', (req, res, next) => {
  connection.query('SELECT * FROM mee', function (err, rows, fields) {
    if (err) throw err
    var rows1 = rows;
    res.render('index.twig', {rows1});
  });
});

router.post('/', (req, res) => {
  connection.query('INSERT INTO mee (name, age, likes) VALUES (?, ?, ?)', [req.body.name, req.body.age, req.body.likes], function (err, result) {
    if (err) throw err
    console.log(result);
  });
  res.redirect('/');
});

router.get('/delete/:id', (req, res) => {
    var id = req.params.id;
    connection.query('DELETE FROM mee WHERE id = ?', [id], function (err, result) {
      if (err) throw err
      console.log(result);
    });
    res.redirect('/');
});

module.exports = router;
