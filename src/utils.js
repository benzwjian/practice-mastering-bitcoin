var crypto = require('crypto')
var BigInt = require('bigi')

var Ripemd160 = require('ripemd160')
var base58 = require('bs58')

var ecurve = require('ecurve')
var ecurveSecp256k1 = ecurve.getCurveByName('secp256k1')
var maxBound = ecurveSecp256k1.n

var sha256 = function (buffer) {
  return crypto.createHash('sha256').update(buffer).digest()
}

var ripemd160 = function (buffer) {
  return new Ripemd160().update(buffer).digest()
}

var doubleHash = function (buffer) {
  return ripemd160(sha256(buffer))
}

var doubleSha256 = function (buffer) {
  return sha256(sha256(buffer))
}

/* Generate base58check
 * @param payload {Buffer}: payload data
 * @param prefix {Integer}: 0x00 for bitcoin address, 0x80 for private key
 * @return base58check of payload
 */
var base58Check = function (payload, prefix) {
  var version = Buffer.allocUnsafe(1)
  version.writeUInt8(prefix, 0)

  // prepend version to payload
  payload = Buffer.concat([version, payload], version.length + payload.length)

  // do double SHA256 to get checksum version+payload
  var checksum = doubleSha256(payload)

  // append first 4 bytes of checksum to version+payload
  payload = Buffer.concat([payload, checksum], payload.length + 4)

  return base58.encode(payload)
}

/* Generate WIF
 * @param payload {Buffer}: payload data
 */
var wif = function (payload) {
  return base58Check(payload, 0x80)
}

/* Generate compressed WIF
 * @param payload {Buffer}: payload data
 */
var wifCompressed = function (payload) {
  var suffix = Buffer.allocUnsafe(1)
  suffix.writeUInt8(0x01, 0)
  payload = Buffer.concat([payload, suffix], payload.length + 1)
  return wif(payload)
}

/* Generate random number with number of bytes
 * @param len {Integer}: number of bytes
 * @return random {Buffer}: the random number
 * @references:
 *  1. signum() refers to https://github.com/andyperlitch/jsbn/blob/master/index.js#L597
 *  2. compareTo() refers to https://github.com/andyperlitch/jsbn/blob/master/index.js#L212
 */
var getRandom = function (len) {
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
var getEcPoints = function (privateKey) {
  var ecPoints = ecurveSecp256k1.G.multiply(privateKey)
  return ecPoints
}

module.exports = {
  getRandom: getRandom,
  getEcPoints: getEcPoints,
  base58Check: base58Check,
  doubleHash: doubleHash,
  wif: wif,
  wifCompressed: wifCompressed
}
