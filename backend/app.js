const express = require('express');
const bodyParser = require('body-parser');

const port = 3030;

const routeHandler = require('./routes/handler.js');
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/',routeHandler);

app.listen(port,() => {console.log(`Successfully start server on port ${port}`)});