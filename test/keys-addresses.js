/* global describe, it */

var assert = require('assert')
var Ecpair = require('../src/ecpair')
var Address = require('../src/address')

describe('Keys', function () {
  var privateKey = Buffer.from('1E99423A4ED27608A15A2616A2B0E9E52CED330AC530EDCC32C8FFC6A526AEDD', 'hex')
  var ecpair = new Ecpair(privateKey)

  it('should be valid uncompressed public key', function () {
    var publicKey = ecpair.generatePublicKey(false)
    assert(publicKey.toString('hex'), '04F028892BAD7ED57D2FB57BF33081D5CFCF6F9ED3D3D7F159C2E2FFF579DC341A07CF33DA18BD734C600B96A72BBC4749D5141C90EC8AC328AE52DDFE2E505BDB')
  })

  it('should be valid compressed public key', function () {
    var publicKey = ecpair.generatePublicKey(true)
    assert(publicKey.toString('hex'), '03F028892BAD7ED57D2FB57BF33081D5CFCF6F9ED3D3D7F159C2E2FFF579DC341A')
  })
})

describe('Address', function () {
  var publicKey = Buffer.from('0202a406624211f2abbdc68da3df929f938c3399dd79fac1b51b0e4ad1d26a47aa', 'hex')
  var address = new Address(publicKey)

  it('should be valid bitcoin address', function () {
    var addressHex = address.generateAddress()
    assert(addressHex, '1PRTTaJesdNovgne6Ehcdu1fpEdX7913CK')
  })
})
