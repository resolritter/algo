/*
A unival tree (which stands for “universal value”) is a tree where all nodes have the same value.

---

Example 1:

  a
 / \
a   a
    /\
   a  a
       \
        A

This tree has 3 unival subtrees: the two ‘a’ leaves and the one ‘A’ leaf. The
‘A’ leaf causes all its parents to not be counted as a unival tree.

---

Example 2:

  a
 / \
c   b
    /\
   b  b
        \
         b

This tree has 5 unival subtrees: the leaf at ‘c’, and every ‘b’.
*/

const { lines, flattenDeep, groupInputLines } = require("./utils")
const [firstGroup, secondGroup] = groupInputLines(lines)
const assert = require("assert")

const emptyNodeValue = "_"
const univalMarker = Symbol("IS UNIVAL")

function buildTreeLevel(nodes) {
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

function traverse(root, depth, i) {
  const currentNode = root[depth][i]
  const nodesBelowLeft =
    root[depth + 1] && root[depth + 1][i * 2]
      ? flattenDeep(traverse(root, depth + 1, i * 2))
      : []
  const nodesBelowRight =
    root[depth + 1] && root[depth + 1][i * 2 + 1]
      ? flattenDeep(traverse(root, depth + 1, i * 2 + 1))
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

for (const [lines, { expectedCount }] of [
  [firstGroup, { expectedCount: 3 }],
  [secondGroup, { expectedCount: 5 }],
]) {
  // the tree is encoded as an array of arrays
  const root = lines.reduce((acc, l) => {
    acc.push(buildTreeLevel(l.split(" ")))
    return acc
  }, [])
  const univalCount = traverse(root, 0, 0).reduce(
    (acc, c) => (c === univalMarker ? acc + 1 : acc),
    0,
  )

  assert.strictEqual(univalCount, expectedCount)
}
