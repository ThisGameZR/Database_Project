const express = require('express');
const bodyParser = require('body-parser');

const port = 3030;
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/login',require('./routes/login'));
app.use('/products',require('./routes/products'));
app.use('/sqlInjection',require('./routes/sqlInjection'));
app.use('/insertProduct',require('./routes/insertProduct'));
app.use('/customerMember',require('./routes/customerMember'));

app.listen(port,() => {console.log(`Successfully start server on port ${port}`)});