const { run, print } = require("./utils")

class Node {
  constructor(val, next) {
    this.val = val
    this.next = next
  }
}
const mkNode = (val, next) => {
  return new Node(val, next)
}

const solve = (cur) => {
  let i = 0
  let prev = undefined
  while (true) {
    let next = cur.next
    cur.next = prev
    prev = cur
    if (next) {
      cur = next
    } else {
      break
    }
  }
  return cur
}

const third = mkNode(3)
const second = mkNode(2, third)
const first = mkNode(1, second)

const newThird = mkNode(1)
const newSecond = mkNode(2, newThird)
const newFirst = mkNode(3, newSecond)

run(
  __filename,
  solve,
  // prettier-ignore
  [
    [first, newFirst],
  ],
  // prettier-ignore
  undefined,
  {
    paired: true,
    serialize: (node) => {
      let buf = `,${node.val}`
      let cur = undefined
      while ((cur = node.next)) {
        buf += `,${cur.val}`
        node = cur
      }
      return buf.slice(1)
    },
  },
)
