var crypto = require('crypto')
var BigInt = require('bigi')

var ecurve = require('ecurve')
var maxBound = ecurve.getCurveByName('secp256k1').n

var Utils = function () {}

/* Generate random number with number of bytes
 * @param len {Integer}: number of bytes
 * @return number {BigInt}
 */
Utils.getRandom = function (len) {
  var number

  do {
    var buf = crypto.randomBytes(len)
    number = BigInt.fromBuffer(buf)
  } while (number.signum() <= 0 || number.compareTo(maxBound) >= 0)
  // signum() refers to https://github.com/andyperlitch/jsbn/blob/master/index.js#L597
  // compareTo() refers to https://github.com/andyperlitch/jsbn/blob/master/index.js#L212
  
  return number
}

module.exports = Utils
