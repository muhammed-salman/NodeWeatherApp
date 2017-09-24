const yargs=require('yargs');
const axios=require('axios');

const API_KEY='ba7870c78a0264456441961f017287a2';

const argv=yargs
.options({
    a:{
      describe: 'Address to fetch weather for',
      demand: true,
      alias: 'address',
      string: true
    }
})
.help()
.alias('help','h')
.argv;

var address=encodeURIComponent(argv.address);
var geocodeUrl=`http://maps.googleapis.com/maps/api/geocode/json?address=${address}`;

axios.get(geocodeUrl).then((response)=>{

  if(response.data.status==='ZERO_RESULTS'){
    throw new Error('Unable to find that address');
  }

  var lat=response.data.results[0].geometry.location.lat;
  var lng=response.data.results[0].geometry.location.lng;
  var weatherUrl=`https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`;

  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
})
.then((response)=>{
  var temperature=response.data.currently.temperature;
  var apparentTemperature=response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
})
.catch((e)=>{
  if(e.code==='ENOTFOUND'){
    console.log('Unable to connect to API servers.');
  }
  else{
    console.log(e.message);
  }
});
