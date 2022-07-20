const { run, print } = require("./utils")

const solve = (as) => {
  const h = new Map()

  for (const a of as) {
    const l1 = a.slice(0, 1)
    const l2 = a.slice(2)
    h.set(l2, l1)
  }

  let f
  for (const [k, v] of h) {
    if (h.get(v) === undefined) {
      f = [k, v]
      break
    }
  }

  let buf = f[1] + f[0]
  while (true) {
    let found
    for (const [k, v] of h) {
      if (v === f[0]) {
        found = [k, v]
        break
      }
    }
    if (!found) {
      break
    }
    buf += found[0]
    f = found
  }

  return buf
}

run(
  __filename,
  solve,
  // prettier-ignore
  [
    [["P>E", "E>R", "R>U"], "PERU"],
    [["I>N", "A>I", "P>A", "S>P"], "SPAIN"],
    [["U>N", "G>A", "R>Y", "H>U", "N>G", "A>R"], "HUNGARY"],
    [["I>F", "W>I", "S>W", "F>T"], "SWIFT"],
    [["R>T", "A>L", "P>O", "O>R", "G>A", "T>U", "U>G"], "PORTUGAL"],
    [["W>I", "R>L", "T>Z", "Z>E", "S>W", "E>R", "L>A", "A>N", "N>D", "I>T"], "SWITZERLAND"]
  ],
  // prettier-ignore
  undefined,
  { paired: true },
)
