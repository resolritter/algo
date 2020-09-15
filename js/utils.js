const fs = require("fs")
const filePath = process.argv[2] ?? "/dev/stdin"
const assert = require("assert")

function assertArrayIsSorted(array) {
  let previousNumber = array[0]
  for (let i = 1; i < array.length; i++) {
    assert.strict(array[i] > previousNumber)
    previousNumber = array[i]
  }
}

function permutator(inputArr) {
  const result = []

  function permute(arr, m = []) {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice()
        const next = curr.splice(i, 1)
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result
}

function flattenDeep(arr, results = []) {
  for (const child of arr) {
    if (Array.isArray(child)) {
      flattenDeep(child, results)
    } else {
      results.push(child)
    }
  }

  return results
}

function readLines() {
  return fs
    .readFileSync(filePath)
    .toString()
    .split("\n")
    .slice(0, -1)
}

const inputMarker = "## INPUT"
function groupInputLines(lines) {
  const groups = []
  let groupI = -1

  for (const line of lines) {
    if (line.slice(0, inputMarker.length) === inputMarker) {
      groupI++
      groups.push([])
      continue
    }

    groups[groupI].push(line)
  }

  return groups
}

module.exports = {
  lines: readLines(),
  groupInputLines,
  flattenDeep,
  assertArrayIsSorted,
  permutator,
}
