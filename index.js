const {getNextISSTimeAtLocation} = require('./iss');

getNextISSTimeAtLocation((err, passTimes) => {
  if (err) {
    return console.log(err);
  }
  console.log(passTimes);
});
