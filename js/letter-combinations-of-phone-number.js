const { run, print } = require("./utils")

const solve = (input) => {
  let as = input.split("")

  const letters = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  }
  let sets = []
  for (let a of as) {
    sets.push(letters[a])
  }

  const rec = (sets, pfix = "", res = []) => {
    if (sets.length) {
      for (const s of sets[0]) {
        rec(sets.slice(1), pfix + s, res)
      }
    } else {
      res.push(pfix)
    }
    return res
  }

  const ans = rec(sets)

  return ans
}

run(
  __filename,
  solve,
  // prettier-ignore
  [
    ["23", ["ad","ae","af","bd","be","bf","cd","ce","cf"]],
    ["", []],
    ["2", ["a", "b", "c"]],
  ],
  // prettier-ignore
  undefined,
  { paired: true },
)
