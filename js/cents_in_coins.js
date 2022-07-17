const { readLines } = require("./utils")
const lines = readLines()
const assert = require("assert")

const cents = parseInt(lines)
const coinsValues = [100, 25, 5, 1]
const coinsValuesSum = coinsValues.reduce(function (acc, v) {
  return acc + v
}, 0)

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

const coinSet = divide(coinsValuesSum)
assert.deepStrictEqual(coinSet, coinsValues)
