const { run, flattenDeep, copyMatrix2D } = require("./utils")

const solve = (input) => {
  const grid = input.slice(0, 10).reduce((acc, x, i) => {
    acc.push(x.split(""))
    return acc
  }, [])
  const words = input[10].split(";")
  const wordSlots = {}

  const areArraysEqual = (a, b) => {
    if (a === b) return true
    if (a == null || b == null) return false
    if (a.length !== b.length) return false

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false
    }

    return true
  }

  const hashTrail = (trail) => {
    return trail.reduce((acc, e) => `${acc}[${e.toString()}]`, [])
  }

  const incrHorizontally = (i, j) => {
    return [i, j + 1]
  }

  const incrVertically = (i, j) => {
    return [i + 1, j]
  }

  const registerTrail = (trail) => {
    if (trail.length < 2) {
      return
    }

    const hash = hashTrail(trail)
    for (const trailHash of Object.keys(wordSlots)) {
      if (trailHash.endsWith(hash)) {
        return
      }
    }
    wordSlots[hash] = { trail }
  }

  const traverseTrail = (i, j, trail, progressTrail) => {
    if (grid[i] && grid[i][j] === "-") {
      const [ii, jj] = progressTrail(i, j)
      return traverseTrail(ii, jj, [...trail, [i, j]], progressTrail)
    }
    return trail
  }

  const checkIntersection = (slots, hash, candidateWord) => {
    const thisSlot = slots[hash]
    const takenSlots = Object.values(slots).filter((slot) => !!slot.word, {})

    for (const { word, trail } of takenSlots) {
      for (let i = 0; i < trail.length; i++) {
        for (let j = 0; j < thisSlot.trail.length; j++) {
          if (areArraysEqual(trail[i], thisSlot.trail[j])) {
            if (word[i] !== candidateWord[j]) {
              return false
            }
          }
        }
      }
    }

    return true
  }

  const fitIntoSlots = (slots, remainingWords) => {
    const [word, ...nextRemainingWords] = remainingWords
    if (!word) {
      return slots
    }

    const availableSlots = Object.entries(slots).filter(
      ([hash, slot]) =>
        slot.trail.length === word.length &&
        slot.word === undefined &&
        checkIntersection(slots, hash, word),
    )

    return availableSlots.map(([hash, slot]) => {
      return fitIntoSlots(
        { ...slots, [hash]: { ...slot, word } },
        nextRemainingWords,
      )
    })
  }

  // populate 'wordSlots' with the available positions in the grid
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      registerTrail(traverseTrail(i, j, [], incrHorizontally))
      registerTrail(traverseTrail(i, j, [], incrVertically))
    }
  }

  // fit all the words into the available positions in 'wordSlots'
  const results = flattenDeep(fitIntoSlots(wordSlots, words))

  for (const result of results) {
    const grd = copyMatrix2D(grid)
    for (const item of Object.values(result)) {
      let i = 0
      for (const [k, j] of item.trail) {
        grd[k][j] = item.word[i]
        i++
      }
    }
    return grd.reduce((acc, vs, i) => {
      if (i === 1) {
        acc = acc.join("")
      }
      return `${acc}\n${vs.join("")}`
    })
  }
}

run(__filename, solve, undefined, undefined, {
  groupAnswers: true,
  flattenAnswerGroup: true,
})
