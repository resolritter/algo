const { run, print } = require("./utils")

const solve = (str) => {
  if (str.length <= 2) {
    return str
  }

  let pprev = [str[0], 0]
  let prev = [str[1], 1]
  let ans = ""
  let start = 0
  for (let i = 2; i < str.length; i++) {
    if (str[i] === prev[0] || str[i] === pprev[0]) {
      if (i + 1 - pprev[1] > ans.length) {
        ans = str.slice(pprev[1], i + 1)
      }
    }
    if (str[i] !== prev[0]) {
      if (str[i] === pprev[0]) {
        prev = [str[i], i]
      } else {
        pprev = prev
        prev = [str[i], i]
      }
    }
  }

  return ans
}

run(__filename, solve)
