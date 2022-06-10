const request = require("request");

const getMyIP = (cb) =>{
  request(`http://api.ipify.org?format=json`, (err, resp, body) => {
    if (err) {
      return cb(Error(err));
    }
    
    if (resp.statusCode !== 200) {
      err = `Status Code ${resp.statusCode} when fetching IP. Response: ${body}`;
      return cb(Error(err));
    }


    let data = JSON.parse(body);
    let ip = data.ip;
    return cb(null, ip);
    
  });
};

const getCoordsByIP = (ip, cb) => {
  request(`https://api.ipbase.com/v2/info?apikey=FjeV3vnhvcsNbWfjBp2FgyFrtBBjXyvTl9uX1xUb&language=en&ip=174.7.230.78`, (err, resp, body) => {
    
    if(err){
      cb(err);
    }

    let lat = JSON.parse(body).data.location.latitude
    let long = JSON.parse(body).data.location.longitude
    coords = {lat,long}
    cb(null, coords)

  })
}

module.exports = {getMyIP, getCoordsByIP};
