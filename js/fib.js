const assert = require("assert")

const initialNums = [0, 1, 1]

const fibStart = function(count) {
  const out = []
  for (let i = 0; i < initialNums.length; ++i) {
    out.push(initialNums[i])
    if (count < i + 2) {
      return [out, true]
    }
  }
  return [out, false]
}

const fibWhile = function(count) {
  const [out, shouldReturn] = fibStart(count)
  if (shouldReturn) {
    return out
  }
  count = count + 1 - initialNums.length

  const nums = [1, 1]
  for (let i = 0; i < count; ++i) {
    nums[2] = nums[0] + nums[1]
    nums[0] = nums[1]
    nums[1] = nums[2]
    out.push(nums[2])
  }

  return out
}

const fibRecursive = function(count) {
  const [out, shouldReturn] = fibStart(count)
  if (shouldReturn) {
    return out
  }

  const iter = function(count) {
    if (count <= 1) {
      return 1
    } else {
      return iter(count - 1) + iter(count - 2)
    }
  }

  for (let i = 2; i < count; ++i) {
    out.push(iter(i))
  }
  return out
}

const count = parseInt(process.argv[2])
assert.ok(count)
const result = fibWhile(count)
assert.deepStrictEqual(result, fibRecursive(count))
console.log(result)
