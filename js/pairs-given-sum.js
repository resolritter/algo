const { run } = require("./utils")

const solve = (input) => {
  const [k, ...as] = input
  const ans = new Set()
  for (let i = 0; i < as.length; i++) {
    if (as[i] * 2 === k) {
      ans.add(`${i},${i}`)
    }
    for (let j = i + 1; j < as.length; j++) {
      if (as[i] + as[j] === k) {
        ans.add(`${i},${j}`)
        ans.add(`${j},${i}`)
      }
    }
  }
  return ans.size
}

run(__filename, solve)
