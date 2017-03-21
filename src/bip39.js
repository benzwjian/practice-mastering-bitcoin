var Utils = require('./utils')
var bip39Words = require('../asset/wordlist/english.json')

/* Generate entropy + checksum
 * 128 bits + 4 bits
 * 160 bits + 5 bits
 * 192 bits + 6 bits
 * 224 bits + 7 bits
 * 256 bits + 8 bits
 * @param entropy {Buffer}: random number, length 128, 160, 192, 224 or 256 bits
 * @return entropyCheck {String}: entropy + checksum
 */
var generateEntropyCheck = function (entropy) {
  var entropyCheck
  // checksum by SHA256, then bytes to bits
  var checksum = Utils.bytesToBits(Utils.sha256(entropy))
  // entropyCheck = entropy + checksum(first 4 bits)
  entropyCheck = Utils.bytesToBits(entropy) + checksum.substring(0, entropy.length * 8 / 32)
  return entropyCheck
}

/* Generate mnemonic <===> entropy+checksum
 * 12 words <===> 132 bits
 * 15 words <===> 165 bits
 * 18 words <===> 198 bits
 * 21 words <===> 231 bits
 * 24 words <===> 264 bits
 * @param entropyCheck {String}: entropy + checksum
 * @return memonic {String}: memonic
 */
var generateMnemonic = function (entropyCheck) {
  // divide into a piece of 11-bits
  var pieces = entropyCheck.match(/(.{1,11})/g)
  var words = pieces.map(function (binary) {
    return bip39Words[parseInt(binary, 2)]
  })
  return words.join(' ')
}

/* Generate HD wallet root seed
 * @param opt {Object}: contains =>
 *   entropy {String}: input entropy in Hex string
 *   length {Integer}: number bits of input entropy, only for 128, 160, 192, 224 or 256 bits
 *   salt {String}: passphrase for PBKDF2
 * @return seed {String}: 512-bits seed in Hex string
 */
var getSeed = function (opt) {
  var entropy = opt.entropy
  var len = opt.length
  var salt = opt.salt ? 'mnemonic' + opt.salt : 'mnemonic'

  var bEntropy = entropy ? Buffer.from(entropy, 'hex') : Utils.getRandom(len / 8)
  var entropyCheck = generateEntropyCheck(bEntropy)
  var mnemonic = generateMnemonic(entropyCheck)
  var seed = Utils.hmac512(Buffer.from(mnemonic), Buffer.from(salt)).digest('hex')

  return seed
}

module.exports = {
  getSeed: getSeed
}
