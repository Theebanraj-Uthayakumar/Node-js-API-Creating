const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors')
const app = express();
app.use(cors())

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());

//Import Routers
const doctorsRoute = require('./routes/doctors');
const cleaningRoute = require('./routes/cleaning');

app.use('/doctors', doctorsRoute);
app.use('/cleaning', cleaningRoute);

app.get('/', (req, res) => {
    res.send("we are on home");
})

//Connect to DB
mongoose.connect('mongodb+srv://Theebanraj:Theeban2021@cluster0.ig2tw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
}, () =>
    console.log('Connectd to DB!')
)

//How to we start listening to the server
app.listen(5000);

//http://localhost:5000/