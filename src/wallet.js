var Bip32 = require('./bip32')

/* Hierarchical Deterministic Wallets constructor
 * @param seed {Hex String}: root seed of wallet, between 128 and 512 bits
 */
var Wallet = function (seed) {
  this.seed = Buffer.from(seed, 'hex')
  this.masterKeys = Bip32.generateMasterKeys(this.seed)
}

module.exports = Wallet
