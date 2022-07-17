const { readLines } = require("./utils")
const lines = readLines()

const cents = parseInt(lines[0])
const coinsValues = [100, 25, 5, 1]
let possibilies = 0

function divide(cents) {
  for (const v of coinsValues) {
    if (cents > v) {
      possibilies++
      divide(cents - v)
    }
  }
}

divide(cents)
console.log(possibilies)
