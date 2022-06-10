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
  request(`https://api.ipbase.com/v1/json/${ip}`, (err, resp, body) => {
    if(err){
      return cb(err);
    }

    if(resp.statusCode !== 200){
      err = `Error: ${JSON.parse(body).message}`
      return cb(err)
    }

    let lat = JSON.parse(body).latitude
    let long = JSON.parse(body).longitude
    coords = {lat,long}
    cb(null, coords)

  })
}

module.exports = {getMyIP, getCoordsByIP};
