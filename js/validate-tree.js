const { run } = require("./utils")

const findRelation = (relations, parent, child, result = {}) => {
  for (const rel of relations.get(parent) || []) {
    if (rel === child) {
      result.found = true
      return result
    }
    if (result[`${rel},${child}`] === undefined) {
      result[`${rel},${child}`] = true
      findRelation(relations, rel, child, result)
    }
  }
  return result
}

const solve = ([input]) => {
  const relations = new Map()

  for (const pair of input.split(" ")) {
    const [parent, child] = pair.slice(1, -1).split(",")
    const rel = relations.get(parent) || new Set()

    if (findRelation(relations, child, parent).found) {
      return "Circular dependency"
    }

    if (findRelation(relations, parent, child).found) {
      return "Multiple parents"
    }

    rel.add(child)
    if (rel.size > 2) {
      return "More than 2 children"
    }

    relations.set(parent, rel)
  }

  let root = undefined
  parentsLoop: for (const [parent] of relations) {
    for (const [_, children] of relations) {
      if (children.has(parent)) {
        continue parentsLoop
      }
    }
    if (root === undefined) {
      root = parent
    } else {
      return "Multiple roots"
    }
  }

  return "OK"
}

run(__filename, solve)
