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

module.exports = {getMyIP};