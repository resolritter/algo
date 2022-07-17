const { run } = require("./utils")

const emptyNodeValue = "_"
const univalMarker = Symbol("IS UNIVAL")

// the tree is encoded as an array of arrays
const buildTreeLevel = (nodes) => {
  const level = []
  for (let i = 0; i < nodes.length; i += 2) {
    if (nodes[i] === emptyNodeValue) {
      level.push(undefined)
    } else {
      level.push(nodes[i])
    }
    if (nodes[i + 1] === emptyNodeValue) {
      level.push(undefined)
    } else {
      level.push(nodes[i + 1])
    }
  }
  return level
}

const traverse = (tree, depth, i) => {
  const currentNode = tree[depth][i]
  const nodesBelowLeft =
    tree[depth + 1] && tree[depth + 1][i * 2]
      ? traverse(tree, depth + 1, i * 2)
      : []
  const nodesBelowRight =
    tree[depth + 1] && tree[depth + 1][i * 2 + 1]
      ? traverse(tree, depth + 1, i * 2 + 1)
      : []
  let isUnival = true

  checkSubTrees: for (const subTree of [nodesBelowLeft, nodesBelowRight]) {
    for (const child of subTree) {
      if (child === univalMarker) {
        continue
      }
      if (child !== currentNode) {
        isUnival = false
        break checkSubTrees
      }
    }
  }

  const result = [currentNode, ...nodesBelowLeft, ...nodesBelowRight]

  if (isUnival) {
    result.push(univalMarker)
  }

  return result
}

const solve = (input) => {
  const tree = input.reduce((acc, l) => {
    acc.push(buildTreeLevel(l.split(" ")))
    return acc
  }, [])
  return traverse(tree, 0, 0).reduce(
    (acc, c) => (c === univalMarker ? acc + 1 : acc),
    0,
  )
}

run(__filename, solve)
