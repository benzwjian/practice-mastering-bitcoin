var Bip32 = require('./bip32')

/* Hierarchical Deterministic Wallets constructor
 * @param seed {Hex String}: root seed of wallet, between 128 and 512 bits
 */
var Wallet = function (seed) {
  this.seed = Buffer.from(seed, 'hex')
  this.masterKeys = Bip32.generateMasterKeys(this.seed)
}

/* Get master key, i.e. Ecpair + chain code
 */
Wallet.prototype.getMasterKeys = function () {
  return this.masterKeys
}

/* Generate Master extended public key
 * @return extended in base58check
 */
Wallet.prototype.getMasterExtendedPublicKey = function () {
  var publicKey = this.masterKeys.ecpair.generatePublicKey(true) // 32 bytes
  return Bip32.generateExtendedKey(publicKey, this.masterKeys.chainCode, false)
}

/* Generate master extended private key
 * @return extended in base58check
 */
Wallet.prototype.getMasterExtendedPrivatekey = function () {
  var privateKey = this.masterKeys.ecpair.privateKey // 32 bytes
  return Bip32.generateExtendedKey(privateKey, this.masterKeys.chainCode, true)
}

/* Collect UTXO under an address, maybe a daemon
 */
Wallet.prototype.collectUtxoSets = function (address) {

}

/* Spend bitcoin to target address
 */
Wallet.prototype.spend = function (toAddress) {
  sign()
  broadcast()
}

/* Sign tx with ECDSA
 */
var sign = function (tx) {

}

/* Broadcast tx to bitcoin network
 */
var broadcast = function (tx) {

}

module.exports = Wallet
