const { run, print } = require("./utils")

const solve = (as) => {
  let ans = 0

  let max = Math.max(...as)
  outer: for (; max > 0; max--) {
    let ct = 0
    for (const a of as) {
      if (a >= max) {
        ct++
      }
      if (ct === 2) {
        break outer
      }
    }
  }
  let min = Math.min(...as)

  // gaps around on the right edge of the elevation map don't form a gap with
  // something following it, so cull them
  let end = as.length - 1
  for (; end > 0; end--) {
    if (as[end] > as[end - 1]) {
      break
    }
  }
  as = as.slice(0, end)

  for (let i = min || 1; i < max + 1; i++) {
    let height = 0
    for (const a of as) {
      if (a < i && height >= i) {
        ans++
      }
      height = Math.max(height, a)
    }
  }

  return ans
}

run(
  __filename,
  solve,
  // prettier-ignore
  [
    [[0,1,0,2,1,0,1,3,2,1,2,1], 6],
    [[4,2,0,3,2,5], 9]
  ],
  // prettier-ignore
  undefined,
  { paired: true },
)
