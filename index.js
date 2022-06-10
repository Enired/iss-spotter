const {getMyIP, getCoordsByIP} = require('./iss');

// getMyIP((error, ip) => {
//   if(error){
//     console.log(err)
//   }
//   else{
//     console.log(ip)
//   }
// })

getCoordsByIP('174.7.230.78', (err, data) =>{
  if(err){
  console.log(err);
  }

  console.log(data)

})
