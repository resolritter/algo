const { permutator } = require("./utils")

const sum = function(input) {
  let lowestSum
  let chosenSeq

  for (let i = 0; i < input.length; ++i) {
    const seq = []
    for (let j = 0; j < i; ++j) {
      seq.push(-1)
    }
    for (let j = i; j < input.length; ++j) {
      seq.push(1)
    }
    for (const p of permutator(seq)) {
      const sum = input.reduce(function(acc, v, i) {
        return acc + v * p[i]
      }, 0)
      if (sum > -1) {
        if (lowestSum == undefined || sum < lowestSum) {
          lowestSum = sum
          chosenSeq = p
        }
      }
    }
  }

  return { lowestSum, chosenSeq }
}

console.log(sum([1, 5, 2, -2]))
console.log(sum([-8, 4, 5, -10, 3]))
console.log(sum([1, 4, -3]))
console.log(sum([2, -4, 6, -3, 9]))
