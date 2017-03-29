
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
  var version = Buffer.from([0x00])
  var hashedPublicKey = Utils.doubleHash(this.publicKey)
  var payload = Buffer.concat([version, hashedPublicKey], version.length + hashedPublicKey.length)
  var address = Utils.base58Check(payload)
  return address
}

module.exports = Address
