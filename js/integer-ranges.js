/*
  You are given a sorted list of distinct integers from 0 to 99, for instance [0, 1, 2, 50, 52, 75].
  Your task is to produce a string that describes numbers missing from the list; in this case "3-49,51,53-74,76-99".
  The items should be sorted in ascending order and separated by commas.
  When a gap spans only one number, the item is the number itself;
  when a gap is longer, the item comprises the start and the end of the gap, joined with a minus sign.
*/

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

console.log(solve([0, 1, 2, 50, 52, 75], "3-49,51,53-74,76-99"))
