const solve = (a) => {
  let h = new Map()
  for (const v of a) {
    if (v < 0) {
      continue
    }
    h.set(v, true)
  }

  let min = undefined
  for (const v of h.keys()) {
    if (h.get(v + 1)) {
      continue
    }
    if (min === undefined && v < min) {
      min = v
    }
  }

  return (min || h.size) + 1
}
