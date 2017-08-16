var mongoose = require('mongoose');
var winston = require('winston');

var count = 0;
module.exports = function(app){
  app.post('/api/usages', function(req, res){
    mongoose.model('Patient').create({
      patientId : req.body.patientId,
      timestamp : req.body.timestamp,
      medication : req.body.medication
    }, function (err, patient) {
      if (err) {
        res.send("There was a problem adding the information to the database.");
      } else {
        count++;
        winston.info('Stored usage count: ' + count);
        res.status(201).json({'id':patient._id});
      }
    });
  });
};
