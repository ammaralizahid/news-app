const mongoose=require("mongoose")
const dotenv= require('dotenv');
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

dotenv.config();

app.use(express.json());



//connecting mongodb
mongoose.connect(process.env.mongo_url,{
    //setting somethings to true 
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
    }) 
    .then(console.log('DB Started'))
    .catch((err) => console.log(err));

    const port = process.env.PORT || 3009;

    
// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))

// Templating Engine 
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended : true }))

// Routes
const newsRouter = require('./src/routes/news')
const authRoute = require("./src/routes/auth");


app.use('/', newsRouter)
app.use('/article', newsRouter)
app.use('/api/auth', authRoute)


// Listen on port 5000
app.listen(port, () => console.log(`Server Started ${port}`))