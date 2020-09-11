const { lines } = require("./utils")
const { strict } = require("assert")

const before = lines.reduce((acc, e) => {
  acc.push(parseInt(e))
  return acc
}, [])

console.log("Before", before)

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i]
    while (i > 0 && arr[i - 1] > current) {
      arr[i] = arr[i - 1]
      i -= 1
    }
    arr[i] = current
  }
  return arr
}

const sorted = insertionSort(before)

// "property-based testing": ensure the list is properly sorted
let highestNumber = sorted[0]
for (let i = 1; i < sorted.length; i++) {
  strict(sorted[i] > highestNumber)
  highestNumber = sorted[i]
}

console.log("After", sorted)
