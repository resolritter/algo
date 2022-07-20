const { run, print } = require("./utils")

const solve = ([s, t]) => {
  let ans = 0

  const rec = (rem, cur) => {
    for (let i = 0; i < rem.length; i++) {
      if (rem[i] === cur[i]) {
        if (cur.length === 1) {
          ans++
        } else {
          rec(rem.slice(1), cur.slice(1))
        }
      }
    }
  }

  rec(s, t)

  return ans
}

run(
  __filename,
  solve,
  // prettier-ignore
  [
    [["rabbbit", "rabbit"], 0],
  ],
  // prettier-ignore
  undefined,
  { paired: true },
)
