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
  function iter(current, value, isFirst = true) {
    if (current.next) {
      const [cell, lastValue] = iter(current.next, current.value, false)
      if (isFirst) {
        cell.value = lastValue
      }
      return [append(cell, current.value), lastValue]
    } else {
      return [
        {
          value,
        },
        current.value,
      ]
    }
  }

  const [result, _] = iter(head)
  return result
}

lines.forEach(appendCurried(head))
const reversed = reverse(head)
forEach(reversed, console.log)
