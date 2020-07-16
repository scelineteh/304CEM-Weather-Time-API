const Record = require('./connect');
const express = require('express');
const app = express();
const axios = require('axios');
const router = express.Router();
const apikey = '027600ec6ec64e6da0389a46cae71161';

//localhost:5000/getstate?loc=
app.get('/getstate',(req,res)=>{
    const loc = req.query.loc;
    const querystr = `http://api.weatherstack.com/current?access_key=${apikey}&query=${loc}`;
    axios.get(querystr).then(response=>{
        state = response.data.location.name;
        country = response.data.location.country;
        weathericon = response.data.current.weather_icons[0];
        weatherdes = response.data.current.weather_descriptions[0];
        timezone = response.data.location.timezone_id;

        const querystr = `http://worldtimeapi.org/api/timezone/${timezone}`;
        axios.get(querystr).then(response=> {
            
            const locValue = new Record({
                state :state,
                country : country,
                weathericon : weathericon,
                weatherdes : weatherdes,
                countrytime : response.data.datetime,
                dayofweek : response.data.day_of_week,
                dayofyear : response.data.day_of_year
            });
            
            if (!locValue.state){
              res.status(200).json('Not Found')
            }
            locValue
            .save()
            .then(response=>{
                res.status(200).json(response);
            })
            .catch(error=>{
                res.status(400).json(error);
            });
            
        });
    })
    .catch(error => {
        res.status(400).json(error);
      });
});

//localhost:5000/getallstates
app.get('/getallstates', (req,res) => {
 Record.find({})
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost:5000/delete?loc=
app.get('/deletestate', (req,res) => {
  const loc = req.query.loc;
  console.log(loc);
    Record.deleteOne({state:loc})
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(400).json(error);
      });
});

//localhost:5000/deletestate (testing only)
app.get('/delete',(req,res) => {
    Record.deleteMany({state:'Penang'})
    .then(response =>{
      res.status(200).json(response);
    })        
    .catch(error => {
      res.status(400).json(error);
    });
}); 

app.listen(5000, () => {
    console.log('server listening on port 5000');
});