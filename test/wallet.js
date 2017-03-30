/* global describe, it */

var assert = require('assert')
var Wallet = require('../src/wallet')
var Address = require('../src/address')

describe('Wallet', function () {
  var seed = '000102030405060708090a0b0c0d0e0f'
  var wallet = new Wallet(seed)
  var masterKeys = wallet.getMasterKeys()
  var ecpair = masterKeys.ecpair
  var chainCode = masterKeys.chainCode

  var wifPrivateKey = ecpair.generateWIFPrivateKey(true)
  var publicKey = ecpair.generatePublicKey(true)
  var address = new Address(publicKey).generateAddress()

  var extendedPublicKey = wallet.getMasterExtendedPublicKey()
  var extendedPrivateKey = wallet.getMasterExtendedPrivatekey()

  it('should be valid WIF private key', function () {
    assert(wifPrivateKey, 'L52XzL2cMkHxqxBXRyEpnPQZGUs3uKiL3R11XbAdHigRzDozKZeW')
  })

  it('should be valid public key', function () {
    assert(publicKey, '0339a36013301597daef41fbe593a02cc513d0b55527ec2df1050e2e8ff49c85c2')
  })

  it('should be valid address', function () {
    assert(address, '15mKKb2eos1hWa6tisdPwwDC1a5J1y9nma')
  })

  it('should be valid chain code', function () {
    assert(chainCode, '873dff81c02f525623fd1fe5167eac3a55a049de3d314bb42ee227ffed37d508')
  })

  it('should be valid extended public key', function () {
    assert(extendedPublicKey, 'xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8')
  })

  it('should be valid extended private key', function () {
    assert(extendedPrivateKey, 'xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi')
  })
})
