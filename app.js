const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const db = require('./query');
const app = express();

var distDir = __dirname + "/dist/";
app.use(express.static(__dirname + '/public'));
app.use(express.static(distDir));
const port = process.env.PORT || 3100;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    return next();
  });

// const port = 3100;
app.use(cors());
app.use(bodyparser.json());
app.use(
    bodyparser.urlencoded({
        extended: true,
    })
);
app.post('/createpeon',db.createpeon);
app.get('/getpeon',db.getpeon);
app.get('/getpeonById/:pid',db.getpeonById);
app.put('/updatepeon',db.updatepeon);
app.delete('/deletepeon/:pid',db.deletepeon);

app.post('/createfaculty',db.createfaculty);
app.get('/getfaculty',db.getfaculty);
app.get('/getfacultyById/:fid',db.getfacultyById);
app.put('/updatefaculty',db.updatefaculty);
app.delete('/deletefaculty/:fid',db.deletefaculty);

app.post('/createtask',db.createtask);
app.get('/gettask',db.gettask);
app.get('/gettaskById/:tid',db.gettaskById);
app.put('/updatetask',db.updatetask);
app.delete('/deletetask/:tid',db.deletetask);

app.post('/creatework',db.creatework);
app.get('/getwork',db.getwork);
app.post('/getlogin',db.getlogin);
app.get('/', (request,response) => {
    response.json({ info: 'Node.js, Express, and Postgres API'});
});
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});