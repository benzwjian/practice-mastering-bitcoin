var Bip32 = require('./bip32')

/* Hierarchical Deterministic Wallets constructor
 * @param seed {Hex String}: root seed of wallet, between 128 and 512 bits
 */
var Wallet = function (seed) {
  this.seed = Buffer.from(seed, 'hex')
  this.masterKeys = Bip32.generateMasterKeys(this.seed)
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
