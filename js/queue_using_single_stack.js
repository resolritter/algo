const { readLines } = require("./utils")
const lines = readLines()
const assert = require("assert")

function enqueue(stack, i) {
  stack.push(i)
}

const stack = lines.reduce((stack, e) => {
  enqueue(stack, parseInt(e))
  return stack
}, [])

function dequeue(stack) {
  function iter(stack, nextStack = [], i = 0) {
    if (stack.length === 1) {
      return [stack.pop(), nextStack]
    } else {
      nextStack.push(stack.pop())
      return iter(stack, nextStack, i + 1)
    }
  }

  const [dequeued, newStack] = iter(stack.slice())

  return {
    dequeued,
    stack: newStack.reverse(),
  }
}

const oldStack = stack.slice()
console.log("Before\n", oldStack.toString())
const firstIn = oldStack[0]
const afterDequeue = oldStack.slice(1)

const { dequeued, stack: newStack } = dequeue(stack)
assert.strictEqual(dequeued, firstIn)
assert.deepStrictEqual(newStack, afterDequeue)

console.log(
  "After\n",
  `Dequeued: ${dequeued}`,
  `New queue: ${newStack.toString()}`,
)
