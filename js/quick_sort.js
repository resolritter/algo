const { readInput } = require("./utils")
const lines = readInput()

const items = lines.reduce((acc, e) => {
  acc.push(parseInt(e))
  return acc
}, [])

function swap(items, leftIndex, rightIndex) {
  const temp = items[leftIndex]
  items[leftIndex] = items[rightIndex]
  items[rightIndex] = temp
}

function partition(items, leftIndexCursor, rightIndexCursor) {
  const pivot = items[Math.floor((rightIndexCursor + leftIndexCursor) / 2)]
  let i = leftIndexCursor
  let j = rightIndexCursor

  while (i <= j) {
    while (items[i] < pivot) {
      i++
    }
    while (items[j] > pivot) {
      j--
    }
    if (i <= j) {
      swap(items, i, j)
      i++
      j--
    }
  }

  return i // effectively the index to where the pivot was moved
}

function quickSort(items, leftIndexCursor, rightIndexCursor) {
  let index
  if (items.length > 1) {
    index = partition(items, leftIndexCursor, rightIndexCursor)

    if (leftIndexCursor < index - 1) {
      quickSort(items, leftIndexCursor, index - 1)
    }

    if (index < rightIndexCursor) {
      quickSort(items, index, rightIndexCursor)
    }
  }
  return items
}

const sortedArray = quickSort(items, 0, items.length - 1)
assertArrayIsSorted(sortedArray)

console.log(sortedArray)
