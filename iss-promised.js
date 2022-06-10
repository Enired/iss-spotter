const request = require('request-promise-native');

const getMyIP = function() {
  return request(`http://api.ipify.org?format=json`);
};

const getCoordsByIP = function(ip) {
  ip = JSON.parse(ip).ip;
  return request(`https://api.ipbase.com/v1/json/${ip}`);
};

const getFlyOverTime = function(coords) {
  const lat = JSON.parse(coords).latitude;
  const long = JSON.parse(coords).longitude;
  return request(`https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${long}`);
};

const printPassTimes = function(passTimes){
  for(const time of passTimes){
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(time.risetime)
    const duration = time.duration
    console.log(`Next Pass at ${dateTime} for ${duration} seconds`);
  }
}

getFlyOverTimeForMyLocation = function() {
  getMyIP()
    .then(getCoordsByIP)
    .then(getFlyOverTime)
    .then((body)=> {
      printPassTimes(JSON.parse(body).response)
    }).catch((err) => {
      console.log(`Error: ${err}`);
    });
};


module.exports = {getFlyOverTimeForMyLocation };