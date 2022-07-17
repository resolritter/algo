const fs = require("fs")
const path = require("path")
const assert = require("assert")

const inputsDir = path.join(path.dirname(__dirname), "inputs")
const answersDir = path.join(path.dirname(__dirname), "answers")

const print = (item, msg) => {
  if (msg) {
    console.log(`\nPrinting ${msg}`)
  }
  console.log(item)
  if (msg) {
    console.log(`\nEnd ${msg}`)
  }
}

const assertArrayIsSorted = (array) => {
  for (let i = 1; i < array.length; i++) {
    assert.strict(array[i - 1] > array[i])
  }
}

const permutator = (inputArr) => {
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

const flattenDeep = (arr, results = []) => {
  for (const child of arr) {
    if (Array.isArray(child)) {
      flattenDeep(child, results)
    } else {
      results.push(child)
    }
  }

  return results
}

const readInput = (modulePath) => {
  const inputPath = process.argv[2] ?? "/dev/stdin"

  let txt = ""
  try {
    txt = fs.readFileSync(inputPath).toString()
  } catch {
    const parsedModulePath = path.parse(modulePath)
    txt = fs
      .readFileSync(path.join(inputsDir, parsedModulePath.name))
      .toString()
  }
  if (!txt) {
    throw new Error("Input text is empty")
  }

  const groups = []
  let group = []
  for (const line of txt.trimEnd().split("\n")) {
    const asInt = parseInt(line)
    if (Number.isNaN(asInt)) {
      if (line === "#end") {
        groups.push(group)
        group = []
      } else {
        group.push(line)
      }
    } else {
      const asFloat = parseFloat(line)
      if (asFloat === asInt) {
        group.push(asInt)
      } else {
        group.push(asFloat)
      }
    }
  }
  if (group.length) {
    groups.push(group)
  }

  return groups
}

const readAnswer = (modulePath) => {
  const parsedModulePath = path.parse(modulePath)
  let txt = fs
    .readFileSync(path.join(answersDir, parsedModulePath.name))
    .toString()
  if (txt.endsWith("\n")) {
    txt = txt.slice(0, -1)
  }
  return txt.split("\n")
}

const run = (modulePath, solver, inputs, answers) => {
  inputs ??= readInput(modulePath)
  answers ??= readAnswer(modulePath)

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i]

    let prefix = "[OK]"
    let msg = ""
    try {
      const ans = String(solver(inputs[i]))
      const expectation = answers[i]
      if (answers[i] === undefined) {
        prefix = "[ERR]"
        msg = `\n    Missing answer!`
      } else if (ans !== expectation) {
        prefix = "[ERR]"
        msg = `\n    ${ans} != ${expectation}`
      }
    } catch (error) {
      prefix = "[ERR]"
      msg = `\n${error.toString()}`
    }

    print(`${prefix} ${input} ${msg}`)
  }
}

module.exports = {
  flattenDeep,
  assertArrayIsSorted,
  permutator,
  print,
  readInput,
  readAnswer,
  run,
}
