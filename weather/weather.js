const request=require('request');

const API_KEY='ba7870c78a0264456441961f017287a2';

var getWeather= (lat,lng,callback) =>{
  request({
    url: `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`,
    json: true
  },(error, response, body) => {
    if(!error && response.statusCode===200){
      callback(undefined,{
        temperature: `${body.currently.temperature}`,
        apparentTemperature: `${body.currently.apparentTemperature}`
      });
    }
    else {
      callback('Unable to fetch weather');
    }
  });
};
// ba7870c78a0264456441961f017287a2

module.exports={
  getWeather
};
