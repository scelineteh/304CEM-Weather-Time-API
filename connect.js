const mongoose = require('mongoose');

const db = "mongodb+srv://celine:celine1222@cluster0-wspuy.mongodb.net/WeatherTime?retryWrites=true&w=majority";

mongoose
.connect(
    db,
    {useNewUrlParser: true}
    )
    .then(() =>{
    console.log("Connected to database");
})
.catch(error =>{
    console.log("Error connecting to database", error);
});

const locationSchema = new mongoose.Schema({
    state:{type:String},
    country:{type:String},
    weathericon:{type:String},
    weatherdes:{type:String},
    countrytime:{type:String},
    dayofweek:{type:String},
    dayofyear:{type:String}
});

const Record = mongoose.model('WeatherTime',locationSchema,'countries');//collection tablename, schema name
module.exports = Record;