const {getMyIP, getCoordsByIP, getISS, getNextISSTimeAtLocation} = require('./iss');

// getMyIP((error, ip) => {
//   if(error){
//     console.log(err)
//   }
//   else{
//     console.log(ip)
//   }
// })

// getCoordsByIP(ip, (err, data) =>{
//   if(err){
//   return console.log(err);
//   }

//   console.log(data)

// })

// getISS({ lat: 35.69628143310547, long: 139.73855590820312 }, (err, data) => {
//   if (err) {
//     return console.log(err);
//   }

//   return console.log(data);
// });

getNextISSTimeAtLocation((err, passTimes) => {
  if(err){
    return console.log(err)
  }

  console.log(passTimes)
} )
