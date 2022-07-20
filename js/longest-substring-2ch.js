const { run, print } = require("./utils")

const solve = (str) => {
  if (str.length <= 2) {
    return str
  }

  let ppre = [str[0], 0]
  let pre = [str[1], 1]
  let ans = ""
  for (let i = 2; i < str.length; i++) {
    if (str[i] === pre[0] || str[i] === ppre[0]) {
      if (i + 1 - ppre[1] > ans.length) {
        ans = str.slice(ppre[1], i + 1)
      }
    }
    if (str[i] !== pre[0]) {
      if (str[i] === ppre[0]) {
        pre = [str[i], i]
      } else {
        ppre = pre
        pre = [str[i], i]
      }
    }
  }

  return ans
}

run(__filename, solve)
