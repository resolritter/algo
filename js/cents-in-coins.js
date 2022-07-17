const { readInput } = require("./utils")
const assert = require("assert")

const inputs = readInput(__filename)

const coinsValues = [100, 25, 5, 1]
const solve = (money) => {
  const ans = []
  loop: while (true) {
    for (const v of coinsValues) {
      if (money >= v) {
        ans.push(v)
        money -= v
        continue loop
      }
    }
    break
  }
  return ans
}

for (const input of inputs[0]) {
  const coins = solve(input)
  assert.deepStrictEqual(coins, coinsValues)
}
