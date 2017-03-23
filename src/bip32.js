var Utils = require('./utils')
var Ecpair = require('./ecpair')

// secret of HMAC-SHA512
var secret = Buffer.from('Bitcoin seed')

/* Generate master private/public key and chain code
 * @param seed {Buffer}: root seed, between 16 and 64 bytes
 * @return ec pair keys and chain code
 */
var generateMasterKeys = function (seed) {
  var I = Utils.hmac512(seed, secret)
  var IL = I.slice(0, 32)
  var IR = I.slice(32)

  return {
    ecpair: new Ecpair(IL),
    chainCode: IR
  }
}

/* Generate extended key
 */
var generateExtendedKey = function (ecpair, chainCode, isPrivate) {
  // TODO
}

/* Derivate child key
 */
var derivateChildKey = function (path, isHardened) {
  // TODO
}

module.exports = {
  generateMasterKeys: generateMasterKeys,
  generateExtendedKey: generateExtendedKey,
  derivateChildKey: derivateChildKey
}
