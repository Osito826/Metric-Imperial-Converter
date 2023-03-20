'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

  let convertHandler = new ConvertHandler();
  //11.Complete the necessary routes in /routes/api.js
  app.route('/api/convert')
    .get(function(req, res) {
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      //24.If both the unit and number are invalid, returned will be 'invalid number and unit'.
      if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        res.json('invalid number and unit')
      }
      //22.checks invalid input = 'invalid number' in api route
      if (initNum === 'invalid number') {
        res.json('invalid number')
      }
      //19.check invalid input = 'invalid unit' in the api route
      if (initUnit === 'invalid unit') {
        res.json('invalid unit')
      }

      let responseObject = {}
      responseObject['initNum'] = initNum
      responseObject['initUnit'] = initUnit
      responseObject['returnNum'] = returnNum
      responseObject['returnUnit'] = returnUnit
      responseObject['string'] = toString

      res.json(responseObject)
    });

};
