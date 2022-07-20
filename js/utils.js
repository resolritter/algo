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

const trimTrailingNewline = (input) => {
  return input.slice(-1) === "\n" ? input.slice(0, -1) : input
}

const numberMatcher = /^[0-9]+$/
const readGroups = (txt, { shouldGroup } = {}) => {
  const lines = trimTrailingNewline(txt).split("\n")

  if (!shouldGroup) {
    return lines
  }

  const groups = []

  let group = []
  for (const line of lines) {
    if (line === "#end") {
      groups.push(group)
      group = []
    } else if (numberMatcher.test(line)) {
      group.push(line.includes(".") ? parseFloat(line) : parseInt(line))
    } else {
      group.push(line)
    }
  }
  if (group.length) {
    groups.push(group)
  }

  return groups
}

const readInput = (modulePath, options) => {
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

  return readGroups(txt, options)
}

const readAnswer = (modulePath, options) => {
  const parsedModulePath = path.parse(modulePath)
  const txt = fs
    .readFileSync(path.join(answersDir, parsedModulePath.name))
    .toString()
  return readGroups(txt, options)
}

const map = (value, fn) => {
  if (Array.isArray(value)) {
    return value.map(fn)
  } else {
    return fn(value)
  }
}

const run = (
  modulePath,
  solver,
  inputs,
  answers,
  {
    groupInputs,
    groupAnswers,
    validateAnswer,
    flattenAnswerGroup,
    paired,
    serialize,
    ...options
  } = {},
) => {
  assert(
    inputs === undefined || Array.isArray(inputs),
    "inputs should be an array",
  )
  assert(
    answers === undefined || Array.isArray(answers),
    "answers should be an array or undefined",
  )

  for (const opt of Object.keys(options)) {
    switch (opt) {
      case "answers":
      case "inputs": {
        break
      }
      default: {
        throw new Error(`Invalid option name: ${opt}`)
      }
    }
  }

  serialize ??= (val) => {
    return val
  }

  let only = undefined
  if (paired) {
    assert(answers === undefined, "answers can't be given with paired: true")
    const newInputs = []
    answers = []
    for (let i = 0; i < inputs.length; i++) {
      const [input, answer, shouldRun] = inputs[i]
      newInputs.push(input)
      answers.push(answer)
      if (shouldRun === true) {
        only = [...(only ?? []), i]
      }
    }
    inputs = newInputs
  } else {
    inputs ??=
      options.inputs ?? readInput(modulePath, { shouldGroup: groupInputs })
    answers ??=
      options.answers ?? readAnswer(modulePath, { shouldGroup: groupAnswers })
  }

  for (let i = 0; i < inputs.length; i++) {
    if (only !== undefined && !only.includes(i)) {
      continue
    }

    let prefix = "[OK]"
    let msg = ""
    try {
      if (answers[i] === undefined) {
        prefix = "[ERR]"
        msg = `\n    Missing answer!`
      } else {
        const rawAnswer = solver(inputs[i])
        if (validateAnswer) {
          validateAnswer(rawAnswer)
        }
        const answer = String(map(rawAnswer, serialize))
        const expectation = flattenAnswerGroup
          ? map(answers[i], serialize).join("\n")
          : String(map(answers[i], serialize))
        if (answer !== expectation) {
          prefix = "[ERR]"
          msg = `\n    ${answer} != ${expectation}`
        }
      }
    } catch (error) {
      prefix = "[ERR]"
      msg = `\n${error.message}\n${error.stack}`
    }

    print(`${i} => ${prefix} ${map(inputs[i], serialize)} ${msg}`)
  }
}

const copyMatrix2D = (matrix) => {
  const cpy = []
  for (const row of matrix) {
    cpy.push([...row])
  }
  return cpy
}

module.exports = {
  flattenDeep,
  assertArrayIsSorted,
  permutator,
  print,
  readInput,
  readAnswer,
  run,
  copyMatrix2D,
}
