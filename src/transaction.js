var Tx = function (utxoSets, address) {
  this.utxoSets = utxoSets || []
  this.toAddress = address
  this.inputs = []
  this.outputs = []
  this.fee = 0
}

Tx.prototype.addInput = function () {

}

Tx.prototype.addOutput = function () {

}

/* Sign with Ecpair keys
 */
Tx.prototype.sign = function (ecpair, sigHash) {

}

module.exports = Tx
