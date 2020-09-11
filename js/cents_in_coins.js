const { lines } = require("./utils")
const assert = require("assert")

const cents = parseInt(lines)
const coinsValues = [100, 25, 5, 1]

function divide(cents) {
  function iter(cents, coinSet = []) {
    for (const v of coinsValues) {
      if (cents >= v) {
        return iter(cents - v, [...coinSet, v])
      }
    }
    return coinSet
  }

  return iter(cents)
}

const coinSet = divide(131)
assert.deepStrictEqual(coinSet, coinsValues)
