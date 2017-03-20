var crypto = require('crypto')
var BigInt = require('bigi')

var ecurve = require('ecurve')
var ecurveSecp256k1 = ecurve.getCurveByName('secp256k1')
var maxBound = ecurveSecp256k1.n

var Utils = function () {}

/* Generate random number with number of bytes
 * @param len {Integer}: number of bytes
 * @return random {Buffer}: the random number
 *
 * @references: 
 *  1. signum() refers to https://github.com/andyperlitch/jsbn/blob/master/index.js#L597
 *  2. compareTo() refers to https://github.com/andyperlitch/jsbn/blob/master/index.js#L212
 */
Utils.getRandom = function (len) {
  var random, bigiRandom

  do {
    random = crypto.randomBytes(len)
    bigiRandom = BigInt.fromBuffer(random)
  } while (bigiRandom.signum() <= 0 || bigiRandom.compareTo(maxBound) >= 0)
  return random
}

/* Generate points on elliptic curve
 * @param privateKey {BigInt}: private key
 * @return ecPoints {Object} : points on ec curve
 */
Utils.getEcPoints = function (privateKey) {
  var ecPoints = ecurveSecp256k1.G.multiply(privateKey)
  return ecPoints
}

module.exports = Utils
