const { run, print } = require("./utils")

const solve = (as) => {
  let ans = 0
  for (let i = 0; i < as.length - ans; i++) {
    let streak = 1
    let cur = as[i]
    for (let j = i + 1; j < as.length; j++) {
      if (as[j] > cur) {
        cur = as[j]
        streak++
      }
    }
    if (streak > ans) {
      ans = streak
    }
  }
  return ans
}

// prettier-ignore
run(
  __filename,
  solve,
  [
    [[10, 22, 9, 33, 21, 50, 41, 60, 80], 6],
  ],
  undefined,
  { paired: true },
)
