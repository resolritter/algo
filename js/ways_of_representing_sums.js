const { readInput } = require("./utils")
const lines = readInput()
const assert = require("assert")
const lines = rawLines.map(e => parseInt(e))

// Find the number of ways to express n as sum of some (at least two) consecutive positive integers.
//    Example
//     There are 2 ways to represent n = 9
//     - 2 + 3 + 4
//     - 4 + 5
//
//     There are no ways to represent 8

function getWaysOfRepresentingConsecutiveSums(n) {
  const startAt = Math.ceil(n / 2)
  let waysOfRepresenting = 0
  
  for (let i = startAt; i > 1; i--) {
    let summandOffset = 1
    let summands = [i, i - summandOffset]
    while (summandOffset < i) {
      const sum = summands.reduce((acc, v) => acc + v, 0)

      if (sum > n) {
        break
      }

      if (sum === n) {
        waysOfRepresenting++
      }

      summandOffset++
      summands.push(i - summandOffset)
    }
  }

  return waysOfRepresenting
}

assert.strictEqual(getWaysOfRepresentingConsecutiveSums(lines[0]), 2)
assert.strictEqual(getWaysOfRepresentingConsecutiveSums(lines[1]), 5)
assert.strictEqual(getWaysOfRepresentingConsecutiveSums(lines[2]), 1)
