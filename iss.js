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
    if (err) {
      return cb(err);
    }

    if (resp.statusCode !== 200) {
      err = `Error: ${JSON.parse(body).message}`;
      return cb(err);
    }

    const lat = JSON.parse(body).latitude;
    const long = JSON.parse(body).longitude;
    const coords = {lat,long};
    cb(null, coords);

  });
};

const getISS = (coords, cb) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.lat}&lon=${coords.long}`, (err, resp, body) =>{
    if (err) {
      return cb(err);
    }

    if (resp.statusCode !== 200) {
      err = `Error`;
      return cb(err);
    }

    const data = JSON.parse(body);
    return cb(null,data.response);

  });
};


const getNextISSTimeAtLocation = (cb) =>{
  getMyIP((err, ip) => {
    if (err) {
      return cb(err);
    }
    getCoordsByIP(ip, (err, coords) => {
      if (err) {
        return cb(err);
      }
      getISS(coords, (err, times) => {
        if (err) {
          return cb(err);
        }
        return cb(null,times);
      });
    });
  });
};

module.exports = {getMyIP, getCoordsByIP, getISS, getNextISSTimeAtLocation};
