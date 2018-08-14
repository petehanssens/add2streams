'use strict';
const AWS = require('aws-sdk');
const kinesis = new AWS.Kinesis();

module.exports.addARecord = (event, context, callback) => {
    const myValue = 'hello';
    const partitionKey = 'auth0|12345';
    const data = new Buffer('{"VALUE":"' + myValue + '"}');
    const recordParams = {
        Data: data,
        PartitionKey: partitionKey,
        StreamName: 'FirstStream'
    };
    console.log('Try Put to Kinesis Stream');
    let i = 0;
    kinesis.putRecord(recordParams, function(err, data) {
        if (err) {
            console.log('Failed Put');
            i = event.length;
        } else {
            console.log('Successful Put');
            i += 1;
        }
        if (i === event.length) {
            console.log('All done');
            callback(err);
        }
    });
};


module.exports.add2Record = function(event, context, callback) {
  //console.log(JSON.stringify(event, null, 2));
  event.Records.forEach(function(record) {
      // Kinesis data is base64 encoded so decode here
      const payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
      console.log('Decoded payload:', payload);
      const partitionKey = 'auth0|12345';
      const data = new Buffer(`{${payload}, "newMessage": "helloAgain"}`);
      const recordParams = {
          Data: data,
          PartitionKey: partitionKey,
          StreamName: 'SecondStream'
      };
      console.log('Try Put to Kinesis Stream');
      let i = 0;
      kinesis.putRecord(recordParams, function(err, data) {
          if (err) {
              console.log('Failed Put');
              i = event.length;
          } else {
              console.log('Successful Put');
              i += 1;
          }
          if (i === event.length) {
              console.log('All done');
              callback(err);
          }
      });
  });
};


module.exports.OutputUpdatedRecord = function(event, context, callback) {
  //console.log(JSON.stringify(event, null, 2));
  event.Records.forEach(function(record) {
      // Kinesis data is base64 encoded so decode here
      const payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
      console.log('Decoded payload:', payload);
  });
  callback(null, payload);
};