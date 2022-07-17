const { readInput } = require("./utils")
const lines = readInput()
const assert = require("assert")

// Determine if the given number is a power of some non-negative integer.
// Example
//     For n = 125, the output should be
//     isPower(n) = true;
//     For n = 72, the output should be
//     isPower(n) = false.

function isPower(n) {
  if (n == 1) {
    return true
  }
  const startAt = Math.floor(Math.sqrt(n))
  for (let i = startAt; i > 1; i--) {
    const multipliers = [i, i]
    let result = 0
    while (true) {
      result = multipliers.reduce((acc, v) => acc * i, 1)
      if (result == n) {
        return true
      } else if (result > n) {
        break
      }
      multipliers.push(i)
    }
  }

  return false
}

assert.strictEqual(isPower(parseInt(lines[0])), true)
assert.strictEqual(isPower(parseInt(lines[1])), true)
assert.strictEqual(isPower(parseInt(lines[2])), false)
