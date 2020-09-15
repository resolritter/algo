const assert = require("assert")

class TrieNode {
  constructor(key, parent = null, value = undefined) {
    // the "key" value will be the character in sequence
    this.key = key
    this.value = value
    this.parent = parent
    // a dictionary in which children are hashed by their "key"
    this.children = {}
  }

  static isTerminal(node) {
    for (const child in node.children) {
      return false
    }

    return true
  }
}

class TrieHashMap {
  constructor() {
    this.root = new TrieNode(null)
  }

  static insert(trie, word, value) {
    let node = trie.root

    for (let i = 0; i < word.length; i++) {
      // If the character exists in the parent node, it means a similar entry has
      // been inserted before, thus we can keep probing.
      // If not, then this is a new path being constructed, which is why a TrieNode
      // is created.
      if (!node.children[word[i]]) {
        node.children[word[i]] = new TrieNode(word[i], node)
      }

      // Mutate the "root" to the current node, which is either a new TrieNode
      // created in the step before or an existing node which was already there.
      // This mutation effectively advances to the next depth in the trie.
      node = node.children[word[i]]
    }

    node.value = value
  }

  static #find(trie, word) {
    let node = trie.root

    // for every character in the word
    for (let i = 0; i < word.length; i++) {
      // if the current character exists in the children, it means this path
      // has been created before, therefore the full word _could_ exist further
      // below; thus, go to the next depth and continue searching
      if (node.children[word[i]]) {
        node = node.children[word[i]]
        // Otherwise, it can't possibly exist below, nor does it currently
        // match (because we are before the word's full length), so we return
        // here
      } else {
        return
      }
    }

    return node
  }

  static has(trie, word) {
    const node = this.#find(trie, word)
    return node !== undefined && TrieNode.isTerminal(node)
  }

  static get(trie, word) {
    return this.#find(trie, word)?.value
  }
}

const sampleKey = "hello"
const sampleValue = 3
let trie = new TrieHashMap()

TrieHashMap.insert(trie, sampleKey, sampleValue)
assert.strictEqual(TrieHashMap.has(trie, sampleKey), true)
assert.strictEqual(TrieHashMap.get(trie, sampleKey), sampleValue)
assert.strictEqual(TrieHashMap.has(trie, "doesNotExist"), false)
assert.strictEqual(TrieHashMap.get(trie, "doesNotExist"), undefined)
// check if only "terminal" nodes are counted as keys
assert.strictEqual(TrieHashMap.has(trie, sampleKey.slice(0, -1)), false)
