var Utils = require('./utils')
var BigInt = require('bigi')

/* EC pair keys constructor
 * @param privateKey {Buffer}: private key
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

Ecpair.prototype.generateWIFPrivateKey = function () {
  return Utils.wif(this.privateKey)
}

Ecpair.prototype.generateWIFCompressedPrivateKey = function () {
  return Utils.wifCompressed(this.privateKey)
}

module.exports = Ecpair
