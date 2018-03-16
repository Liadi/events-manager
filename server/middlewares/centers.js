const fs = require('fs');

module.exports = {
	validateCenterFields(req, res, next) {
    // if (req.centerImageArray && typeof(req.centerImageArray) === 'object') {
    //   for (let i in req.centerImageArray) {

    //     if (typeof(req.centerImageArray[i]) === 'object' && req.centerImageArray[i].file){
    //       console.log(process.cwd());
    //       fs.appendFile(process.cwd() + '/uploads/' + new Date().getTime().toString(), req.centerImageArray[i].file, (err) => {
    //         if (err) {
    //           console.log('error occurred! err => ', err);
    //         }
    //         console.log('Yippee, should heve worked!!!!');
    //       })


    //       console.log('file => ', req.centerImageArray[i].file, typeof(req.centerImageArray[i].file));
    //     } 
    //   }
    // }
    next();
  },
};
