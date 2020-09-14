const { lines } = require("./utils")
const { strict } = require("assert")

let highest = -1

function reverse(array) {
  let rightOffset = array.length - 1
  for (let i = 0; i < rightOffset; i++) {
    const tmp = array[i]
    array[i] = array[rightOffset]
    array[rightOffset] = tmp
    rightOffset--
  }
  return array
}

function peek(stack, skip = 0) {
  return stack[stack.length - (1 + skip)]
}

function findNextHighest(stack) {
  let current
  highest = peek(stack)
  let i = 0
  while ((current = peek(stack, ++i))) {
    if (current > highest) {
      highest = current
    }
  }
  return highest
}

function getHighest(stack) {
  return highest
}

function push(stack, i) {
  if (i > highest) {
    highest = i
  }
  stack.push(i)
}

function pop(stack) {
  const lastIn = stack.pop()
  if (lastIn == highest) {
    highest = findNextHighest(stack)
  }
  return lastIn
}

const stack = lines.reduce((acc, e) => {
  acc.push(parseInt(e))
  return acc
}, [])

push(stack, 6)
strict(getHighest(stack) == 6)
pop(stack)
strict(getHighest(stack) == 4)
pop(stack)
strict(getHighest(stack) == 4)
pop(stack)
strict(getHighest(stack) == 3)
