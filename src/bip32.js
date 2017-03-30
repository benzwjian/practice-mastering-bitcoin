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

/* Generate private/public extended key
 * @param key {Buffer}: The EC private or public key, 32 bytes
 * @param chainCode {Buffer}: The chain code
 * @param isPrivate {boolean}: TRUE for private extended key, FALSE for public extended key
 * @return extended key in base58check
 */
var generateExtendedKey = function (key, chainCode, isPrivate) {
  var bVersion = isPrivate ? Buffer.from([0x04, 0x88, 0xAD, 0xE4]) : Buffer.from([0x04, 0x88, 0xB2, 0x1E])
  var bDepth = Buffer.from([0x00])
  var bFingerprint = Buffer.from([0x00, 0x00, 0x00, 0x00])
  var bChildNumber = Buffer.from([0x00, 0x00, 0x00, 0x00])
  var bChainCode = chainCode
  var suffix = Buffer.allocUnsafe(1)
  suffix.writeUInt8(0x00, 0)
  var bKey = isPrivate ? Buffer.concat([suffix, key], 33) : key
  var bExtendedKey = Buffer.concat([bVersion, bDepth, bFingerprint, bChildNumber, bChainCode, bKey], 78)
  return Utils.base58Check(bExtendedKey)
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
