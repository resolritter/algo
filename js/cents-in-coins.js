const { run } = require("./utils")
const assert = require("assert")

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

run(__filename, solve, undefined, undefined, { groupAnswers: true })
