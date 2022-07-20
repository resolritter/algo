const { run, print } = require("./utils")

const solve = (as) => {
  if (as.length === 0) {
    return 0
  }

  let ans = 1
  for (let i = 0; i < as.length - ans; i++) {
    let inc = Math.floor((as.length - i) / 2)
    for (let j = as.length - i; j > i; j--) {
      let pre = as.slice(i, i + inc)
      let post = as.slice(i + inc, j)
      if (pre.length !== post.length) {
        post = post.slice(1)
      }
      if (pre.split("").reverse().join("") === post) {
        ans = Math.max(ans, pre.length + post.length + 1)
      }
      inc--
    }
  }

  return ans
}

run(
  __filename,
  solve,
  // prettier-ignore
  [
    ["abad", 3],
    ["ababa", 5],
  ],
  // prettier-ignore
  undefined,
  { paired: true },
)
