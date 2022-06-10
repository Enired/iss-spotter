const {getNextISSTimeAtLocation} = require('./iss');
const printPassTimes = function(passTimes){
  for(const time of passTimes){
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(time.risetime)
    const duration = time.duration
    console.log(`Next Pass at ${dateTime} for ${duration} seconds`);
  }
}
getNextISSTimeAtLocation((err, passTimes) => {
  if (err) {
    return console.log(err);
  }
 printPassTimes(passTimes);
});
