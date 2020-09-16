const { lines } = require("./utils")

const head = {
  value: "HEAD",
  next: undefined,
}

function append(current, value, next) {
  let cell = current
  while (cell.next) {
    cell = cell.next
  }
  cell.next = {
    value,
    next,
  }
  return current
}

function forEach(head, cb) {
  let cell = head
  let i = 0

  while (cell.next) {
    cb(i++, cell.value)
    cell = cell.next
  }

  if (cell) {
    cb(i++, cell.value)
  }
}

function appendCurried(head) {
  return function(value) {
    return append(head, value)
  }
}

function reverse(head) {
  function iter(current, previousValue, isFirst = true) {
    if (current.next) {
      const [cell, lastValue] = iter(current.next, current.value, false)
      if (isFirst) {
        cell.value = lastValue
      }
      return [append(cell, current.value), lastValue]
    } else {
      return [
        {
          value: previousValue,
        },
        current.value,
      ]
    }
  }

  const [result, _] = iter(head)
  return result
}

function filter(head, value) {
  let prev = undefined
  let current = head

  while (true) {
    if (current.value === value) {
      if (prev) {
        prev.next = current.next
      } else {
        head = current.next
      }
    }
    prev = current
    if (!(current = current.next)) {
      break
    }
  }
  if (head.value === value) {
    head = {
      value: null,
      next: null
    }
  }

  return head
}

lines.forEach(appendCurried(head))

console.log("--- original")
forEach(head, console.log)

const reversed = reverse(head)
console.log("\n--- reversed")
forEach(reversed, console.log)

console.log("\n--- value '5' filtered out")
forEach(filter(reversed, "5"), console.log)
