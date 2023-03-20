const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  //9.tests for Whole Number Input
  test('Whole number input', function() {
    let input = '32L';
    assert.equal(convertHandler.getNum(input), 32);
  });
  //27.convertHandler should correctly read a decimal number input.
  test('Decimal Input', function() {
    var input = '32.65L';
    assert.equal(convertHandler.getNum(input), 32.65);
  });
  //28.convertHandler should correctly read a fractional input.
  test('Fractional Input', function() {
    var input = '12/8L';
    assert.equal(convertHandler.getNum(input), 1.5);
  });
  //29.convertHandler should correctly read a fractional input with a decimal.
  test('Fractional Input w/ Decimal', function() {
    let input = '27/5.4mi';
    assert.equal(convertHandler.getNum(input), 5);
  });
  //21.checks that when using an invalid input like a double fraction, the getNum() method returns 'invalid number'. convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
  test('Invalid Input (double fraction)', function() {
    let input = '3/7.2/4kg'
    assert.equal(convertHandler.getNum(input), 'invalid number')
  });
  //32.tests/checks if an input with just a unit, like 'kg' will set the number to 1.
  test('No Numerical Input', function() {
    let input = 'kg'
    let expected = 1
    assert.equal(convertHandler.getNum(input), 1);
    assert.equal(convertHandler.getUnit(input), 'kg');
  });
  //tests check getUnit() is returning correctly in unit_tests.js
  test("valid input metric & imperial units", function() {
    assert.equal(convertHandler.getUnit("KG"), "kg");
    assert.equal(convertHandler.getUnit("MI"), "mi");
    assert.equal(convertHandler.getUnit("KM"), "km");
    //assert.equal(convertHandler.getUnit("GAL"), "gal");
    assert.equal(convertHandler.getUnit("GAL"), "gal");
    assert.equal(convertHandler.getUnit("L"), "L");
    assert.equal(convertHandler.getUnit("LBS"), "lbs");
  });
  //17.tests invalid input
  test('Unknown Unit Input', function() {
    let input = 'g'
    let expected = 'invalid unit'
    assert.equal(convertHandler.getUnit(32 + input), expected)
  });
  //8.tests for Valid Unit Inputs/getReturnUnit
  test('For Each Valid Unit Inputs', function() {
    let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    let expected = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
    input.forEach(function(ele, i) {
      assert.equal(convertHandler.getReturnUnit(ele), expected[i]);
    });
  });
  //35.This basically checks for each input if the spellOutUnit method is returning the correct full form.
  test('For Each Valid Unit Inputs', function() {
    //see above example for hint
    let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    let expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
    input.forEach(function(ele, i) {
      assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
    });
  });
  //5.tests for gal to l/vice versa
  test('Gal to L', function() {
    let input = [5, 'gal'];
    let expected = 18.9271;
    //.approximately(actual, expected, delta, [message])  
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);/*delta tolerance*/
  });
  //6.tests for l to gal
  test('L to Gal', function() {
    let input = [5, 'L'];
    let expected = 1.32086;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);//delta tolerance
  });
  //13.tests for lbs to kg/vice versa
  test('Lbs to Kg', function() {
    let input = [5, 'lbs'];
    let expected = 2.26796;
    //.approximately(actual, expected, delta, [message])  
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);/*delta tolerance*/
  });
  test('Kg to Lbs', function() {
    let input = [5, 'kg'];
    let expected = 11.0231;
    //.approximately(actual, expected, delta, [message])  
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);/*delta tolerance*/
  });
  //16.
  test('Mi to Km', function() {
    let input = [5, 'mi'];
    let expected = 8.04672;
    //.approximately(actual, expected, delta, [message])  
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);/*delta tolerance*/
  });
  test('Km to Mi', function() {
    let input = [5, 'km'];
    let expected = 3.10686;
    //.approximately(actual, expected, delta, [message])  
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);/*delta tolerance*/
  });
});

