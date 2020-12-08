const { lines } = require("./utils")

function skip(head, n) {
  let current = head

  for (let i = 0; i < n; i++) {
    if (head.next) {
      head = head.next
    } else {
      break
    }
  }

  return head
}

function append(head, value, next) {
  let cell = head
  while (cell.next) {
    cell = cell.next
  }
  cell.next = {
    value,
    next,
  }
  return head
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
      const [cell, lastValue] = iter(current.next, current.value)
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
      next: null,
    }
  }

  return head
}

function isPalindrome(head) {
  if (!head.next) {
    return true
  }
  let reversed = reverse(head)
  while (head) {
    if (head.value !== reversed.value) {
      return false
    }
    reversed = reversed.next
    head = head.next
  }
  return true
}

function merge(fstHead, sndHead) {
  let fstCurrent = fstHead
  let sndCurrent = sndHead
  let head = {
    value: null,
    next: null,
  }

  while (true) {
    while (fstCurrent) {
      if (sndCurrent && fstCurrent.value > sndCurrent.value) {
        break
      }

      append(head, fstCurrent.value)
      fstCurrent = fstCurrent.next
    }
    while (sndCurrent) {
      if (fstCurrent && sndCurrent.value > fstCurrent.value) {
        break
      }

      append(head, sndCurrent.value)
      sndCurrent = sndCurrent.next
    }

    if (fstCurrent || sndCurrent) {
      if (sndCurrent?.value === fstCurrent?.value) {
        append(head, fstCurrent.value)
        append(head, sndCurrent.value)
        sndCurrent = sndCurrent.next
        fstCurrent = fstCurrent.next
      }
    } else {
      break
    }
  }

  head = head.next
  return head
}

function printReverse() {
  const head = { value: lines[0], next: undefined }
  lines.slice(1).forEach(appendCurried(head))

  console.log("--- original")
  forEach(head, console.log)

  const reversed = reverse(head)
  console.log("\n--- reversed")
  forEach(reversed, console.log)
}

function printFilter() {
  const head = { value: lines[0], next: undefined }
  lines.slice(1).forEach(appendCurried(head))

  console.log("--- original")
  forEach(head, console.log)

  console.log("\n--- value '5' filtered out")
  forEach(filter(head, "5"), console.log)
}

function printPalindrome() {
  const head = {
    value: "2",
    next: undefined,
  }

  for (const n of ["2", "3", "2", "2"]) {
    append(head, n)
  }

  console.log("--- palindrome check")
  forEach(head, console.log)
  console.log(`--- is it a palindrome? ${isPalindrome(head)}`)
}

function printMerge() {
  const first = { value: lines[0], next: undefined }
  lines.slice(1).forEach(appendCurried(first))

  console.log("--- first list")
  forEach(first, console.log)

  let second = { value: lines[0], next: undefined }
  console.log("\n--- second list")
  lines.slice(1).forEach(appendCurried(second))
  forEach(second, console.log)

  const skipCount = 2
  console.log(`\n--- second list skipping first ${skipCount} entries`)
  second = skip(second, skipCount)
  forEach(second, console.log)

  console.log("\n--- merged result (sorting order preserved)")
  forEach(merge(first, second), console.log)
}

for (const test of [printReverse, printFilter, printPalindrome, printMerge]) {
  console.log(`# start ${test.name}`)
  test()
  console.log(`# end ${test.name}\n`)
}
