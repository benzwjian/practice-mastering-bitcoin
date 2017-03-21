var Utils = require('./utils')
var BigInt = require('bigi')

/* EC pair keys constructor
 * @param privateKey {Buffer}: private key, 256 bits
 */
var Ecpair = function (privateKey) {
  this.privateKey = privateKey || Utils.getRandom(32)
}

/* Generate EC public key
 * @param isCompressed {boolean}: compress publick key or not
 * @return publicKey {Buffer}: public key
 */
Ecpair.prototype.generatePublicKey = function (isCompressed) {
  var bPrivateKey = BigInt.fromBuffer(this.privateKey)
  var publicKey = Utils.getEcPoints(bPrivateKey).getEncoded(isCompressed)
  return publicKey
}

/* Generate EC private key in WIF
 * @param isCompressed {boolean}: compress WIF or not
 * @return wif {String}: WIF string
 */
Ecpair.prototype.generateWIFPrivateKey = function (isCompressed) {
  var wif = Utils.wif(this.privateKey, isCompressed)
  return wif
}

module.exports = Ecpair
