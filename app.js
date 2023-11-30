const express = require('express');
const cors = require('cors');


const app = express();


//app. functionaltieis include get post use
//let's say we create app. for '/admin' and latter text includes use
// by just typing the url, we can directly access the admin portal. 
//but if we use app.post(...'/admin'...) we can only access this page if we send a valid post request through a form or button 


var corOptions = {
    origin: 'https://localhost:3000'
    
}



//middleware 
app.use(cors(corOptions));


//for api we are getting information in json format
app.use(express.json());


//used to parse and return middeware which looks at the request 
app.use(express.urlencoded({extended: true}));

//routers

//User
const Userrouter = require('./routes/userRoutes.js')

app.use('/api/users', Userrouter )

//PostRouter

const Postrouter = require('./routes/postRoutes.js');

app.use('/api/posts', Postrouter );

//testing api

app.get('/', (req, res) => {
    res.json({message: 'Hello world'})
})


//Port 

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is running on port  ${PORT}`)
})