const { run, print } = require("./utils")

const solve = (input) => {
  const as = input.split(",").map(function (pair) {
    return pair.split("-")
  })

  let streak = 1
  let longest = 1
  for (let i = 1; i < as.length; i++) {
    if (as[i][0] == as[i - 1][1]) {
      ++streak
    } else {
      if (streak > longest) {
        longest = streak
      }
      streak = 1
    }
  }
  if (streak > longest) {
    longest = streak
  }

  return longest
}

run(__filename, solve)
