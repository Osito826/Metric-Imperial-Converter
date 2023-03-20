function numberStringSplitter(input) {
  let number = input.match(/[.\d\/]+/g) || ["1"];
  let string = input.match(/[a-zA-Z]+/g)[0];

  return [number[0], string];
}
function ConvertHandler() {
  //1.splits numbers and letters
  let inputRegex = /[a-zA-Z]+|[^A-Za-z]+/g///[a-z]+|[^a-z]+/gi

  this.getNum = function(input) {
    //let result;
    //2.grabs first index being the number value
    result = input.match(inputRegex)[0]
    console.log(result)
    //30.convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
    let numberRegex = /\d/

    if (numberRegex.test(result) === false) {
      result = 1
      console.log(result)
    }
    //26.I can use fractions in my parameter(ie. 5, 1/2, 2.5/6)
    if (result.toString().includes('/')) {
      let values = result.toString().split('/');
      if (values.length != 2) {
        return 'invalid number'
      }
      values[0] = parseFloat(values[0]);
      values[1] = parseFloat(values[1]);
      result = parseFloat((values[0] / values[1]).toFixed(5))
    }
    //20.If my number is invalid, returned with 'invalid number'.
    if (isNaN(result)) {
      return "invalid number"
    }

    return result;
  };

  this.getUnit = function(input) {
    let result = numberStringSplitter(input)[1].toLowerCase();
    switch (result) {
      case "km":
        return "km";
      case "gal":
        return "gal";
      case "lbs":
        return "lbs";
      case "mi":
        return "mi";
      case "l":
        return "L";
      case "kg":
        return "kg";
      default:
        return 'invalid unit';
    }

  };

  /*this.getUnit = function(input) {
    //let result;
    //const inputRegex = /[A-Z]/gi;
    //3.grabs second index being the letter value
    result = input.match(inputRegex)[1]
    //31.In case of no # put in
    if (!result) {
      result = input.match(inputRegex)[0]
    }
    //17.If the unit of measurement is invalid, returned will be 'invalid unit'.
    let validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];

    if (!validUnits.includes(result)) {
      return 'invalid unit'
    }

    return result;
  };*/



  this.getReturnUnit = function(initUnit) {
    let result;
    //7.returned unit expected
    switch (initUnit.toLowerCase()) {
      case 'l':
        result = "gal";
        break;
      case 'gal':
        result = 'L';
        break;
      //14.
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      default:
        result = "invalid unit";
    }

    return result;
  };
  //34.Your return will consist of the initNum, initUnit, returnNum, returnUnit, and string spelling out units in the format '{initNum} {initUnitString} converts to {returnNum} {returnUnitString}' with the result rounded to 5 decimals.
  this.spellOutUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();

    switch (unit) {
      case "km":
        return "kilometers";
      case "gal":
        return "gallons";
      case "lbs":
        return "pounds";
      case "mi":
        return "miles";
      case "l":
        return "liters";
      case "kg":
        return "kilograms";
      default:
        return "don't know";
    }
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    //4.gal to l and vice versa-return number not string
    if (initUnit === 'gal' || initUnit === 'GAL') {
      result = (initNum * galToL).toFixed(5)
    } else if (initUnit === 'l' || initUnit === 'L') {
      result = (initNum / galToL).toFixed(5)
    }
    //12.lbs to kg and  vice versa-return number not string
    if (initUnit === 'lbs' || initUnit === 'LBS') {
      result = (initNum * lbsToKg).toFixed(5)
    } else if (initUnit === 'kg' || initUnit === 'KG') {
      result = (initNum / lbsToKg).toFixed(5)
    }
    //15. mi to km vice versa-return number not string
    if (initUnit === 'mi' || initUnit === 'MI') {
      result = (initNum * miToKm).toFixed(5)
    } else if (initUnit === 'km' || initUnit === 'KM') {
      result = (initNum / miToKm).toFixed(5)
    }

    return parseFloat(result);
  };
  //36.Make the getString() method set result to the string format specified in the homepage
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}


module.exports = ConvertHandler;
