const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')


const port = 3030,
      SESSION_NAME = 'sid',
      SESSION_SECRET = 'mysecretpass123',
      SESSION_LIFETIME = 3600000;

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(
    session({
        name: SESSION_NAME,
        secret:SESSION_SECRET,
        saveUninitialized: false,
        resave:false,
        cookie:{
            httpOnly: true,
            maxAge: SESSION_LIFETIME, // Life time of cookie in milliseconds, in this case will be 1 hour
            secure: false, // note that if deploy this needs to be set as true
        }
    })
)

app.use('/login',require('./routes/login'));
app.use('/products',require('./routes/products'));
app.use('/sqlInjection',require('./routes/sqlInjection'));
app.use('/insertProduct',require('./routes/insertProduct'));
app.use('/customerMember',require('./routes/customerMember'));

app.listen(port,() => {console.log(`Successfully start server on port ${port}`)});