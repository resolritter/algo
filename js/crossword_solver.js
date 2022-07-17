// hr/challenges/crosswords-101
const { readInput } = require("./utils")
const lines = readInput()
const { strict } = require("assert")

const crosswordLines = lines.slice(0, 10).reduce((acc, x, i) => {
  acc.push(x.split(""))
  return acc
}, [])
const words = lines.slice(10).map((x) => x.split(";"))[0]
const wordSlots = {}

function arraysEqual(a, b) {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }

  return true
}

function hashTrail(trail) {
  return trail.reduce((acc, e) => `${acc}[${e.toString()}]`, [])
}

function incrementHorizontally(i, j) {
  return [i, j + 1]
}

function incrementVertically(i, j) {
  return [i + 1, j]
}

function registerTrail(trail) {
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

function traverseTrail(i, j, trail, progressTrail) {
  if (crosswordLines[i] && crosswordLines[i][j] === "-") {
    const [ii, jj] = progressTrail(i, j)
    return traverseTrail(ii, jj, [...trail, [i, j]], progressTrail)
  }
  return trail
}

function checkIntersection(slots, hash, candidateWord) {
  const thisSlot = slots[hash]
  const takenSlots = Object.values(slots).filter((slot) => !!slot.word, {})

  for (const { word, trail } of takenSlots) {
    for (let i = 0; i < trail.length; i++) {
      for (let j = 0; j < thisSlot.trail.length; j++) {
        if (arraysEqual(trail[i], thisSlot.trail[j])) {
          if (word[i] !== candidateWord[j]) {
            return false
          }
        }
      }
    }
  }

  return true
}

function fitIntoSlots(slots, remainingWords) {
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
      {
        ...slots,
        [hash]: {
          ...slot,
          word,
        },
      },
      nextRemainingWords,
    )
  })
}

// populate 'wordSlots' with the available positions in the grid
for (let i = 0; i < crosswordLines.length; i++) {
  for (let j = 0; j < crosswordLines[0].length; j++) {
    registerTrail(traverseTrail(i, j, [], incrementHorizontally))
    registerTrail(traverseTrail(i, j, [], incrementVertically))
  }
}

// fit all the words into the available positions in 'wordSlots'
const results = flattenDeep(fitIntoSlots(wordSlots, words))

if (results.length) {
  for (const r of results) {
    console.log(r)
  }
} else {
  console.log("No solvable combination for this crossword")
}
