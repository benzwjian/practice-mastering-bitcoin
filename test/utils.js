/* global describe, it */

var assert = require('assert')
var Utils = require('../src/utils')

describe('Utils', function () {
  it('should decode WIF in base58check', function () {
    var wrapper = Utils.decodeBase58Check('5J3mBbAH58CpQ3Y5RNJpUKPE62SQ5tfcvU2JpbnkeyhfsYB1Jcn')
    assert.deepEqual(wrapper, {
      checksum: 4286807748,
      payload: '1e99423a4ed27608a15a2616a2b0e9e52ced330ac530edcc32c8ffc6a526aedd',
      version: 128
    })
  })

  it('should decode compressed WIF in base58check', function () {
    var wrapper = Utils.decodeBase58Check('KxFC1jmwwCoACiCAWZ3eXa96mBM6tb3TYzGmf6YwgdGWZgawvrtJ')
    assert.deepEqual(wrapper, {
      checksum: 2339607926,
      payload: '1e99423a4ed27608a15a2616a2b0e9e52ced330ac530edcc32c8ffc6a526aedd01',
      version: 128
    })
  })
})
