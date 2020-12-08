const domino = function(chain) {
  const pairs = chain.split(",").map(function(pair) {
    return pair.split("-")
  })

  if (pairs.length == 1) {
    return 1
  }

  let longestChain = 0
  let chainCount = 0
  let lastMatches

  for (let i = 1; i < pairs.length; ++i) {
    thisVar = true
    lastMatches = false
    if (pairs[i][0] == pairs[i - 1][1]) {
      ++chainCount
      lastMatches = true
    } else {
      if (chainCount > longestChain) {
        longestChain = chainCount + 1
      }
      chainCount = 0
    }
  }

  if (chainCount == 0 && longestChain == 0) {
    return 1
  }
  if (chainCount && chainCount > longestChain) {
    longestChain = chainCount
  }
  if (lastMatches) {
    longestChain += 1
  }

  return longestChain
}

console.log(domino("1-1,3-5,5-2,2-3,2-4")) // 3
console.log(domino("1-1")) // 1
console.log(domino("1-2,1-2")) // 1
console.log(domino("3-2,2-1,1-4,4-4,5-4,4-2,2-1")) // 4
console.log(domino("5-5,5-5,4-4,5-5,5-5,5-5,5-5,5-5,5-5,5-5")) // 7
console.log(domino("1-1,3-5,5-5,5-4,4-2,1-3")) // 4
console.log(domino("1-2,2-2,3-3,3-4,4-5,1-1,1-2")) // 3
