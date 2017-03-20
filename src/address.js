
var Utils = require('./utils')

/* Bitcoin address constructor
 * @param publicKey {Buffer}: public key
 */
var Address = function (publicKey) {
  this.publicKey = publicKey
}

/* Generate bitcoin address in Hex
 * @return address {Hex}
 */
Address.prototype.generateAddress = function () {
  var hashedPublicKey = Utils.doubleHash(this.publicKey)
  var address = Utils.base58Check(hashedPublicKey, 0x00)
  return address
}

module.exports = Address
