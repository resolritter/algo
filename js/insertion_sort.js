const { lines, assertArrayIsSorted } = require("./utils")

const before = lines.reduce((acc, e) => {
  acc.push(parseInt(e))
  return acc
}, [])

console.log("Before", before)

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i
    const current = arr[j]
    while (j > 0 && arr[j - 1] > current) {
      arr[j] = arr[j - 1]
      j -= 1
    }
    arr[j] = current
  }

  return arr
}

const sorted = insertionSort(before)
assertArrayIsSorted(sorted)

console.log("After", sorted)
