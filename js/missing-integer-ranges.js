const { run } = require("./utils")

const solve = (vs) => {
  const h = new Map(vs.map((v) => [v, true]))

  let buf = ""
  let start = -1
  let end = -1

  const collect = () => {
    if (start === -1) {
      return
    }
    buf += end === -1 ? `,${start}` : `,${start}-${end}`
    start = -1
    end = -1
  }

  for (let i = 0; i < 100; i++) {
    if (h.get(i) !== undefined) {
      collect()
      continue
    }
    if (start === -1) {
      start = i
    } else {
      end = i
    }
  }
  collect()

  return buf.slice(1)
}

run(__filename, solve, undefined, undefined, { groupInputs: true })
