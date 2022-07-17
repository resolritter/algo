const { print } = require("./utils")

const input = `
5
1 2
2 3
1 3
2 5
`

const buildGraph = function (input) {
  return input
    .map(function (line) {
      return line.split(" ")
    })
    .reduce(function (acc, [i, j]) {
      if (!acc[i]) {
        acc[i] = []
      }
      acc[i].push(j)
      return acc
    }, {})
}

const tracePaths = function (edges, i, j, backTrack, acc) {
  if (!edges[i]) {
    acc.push(backTrack)
    return
  }
  for (const e of edges[i]) {
    if (e == j) {
      acc.push([...backTrack, j])
      return
    }
    if (backTrack.indexOf(e) == -1) {
      tracePaths(edges, e, j, [...backTrack, e], acc)
    }
  }
}

const getShortestPath = function (graph, j) {
  const ran = {}
  let shortestPath

  for (const i in graph) {
    if (ran[i] || i == j) {
      continue
    }
    ran[i] = true

    const trails = []
    tracePaths(graph, i, j, [i], trails)
    for (const t of trails) {
      if (t.slice(-1)[0] == j) {
        console.log(`Found path ${t.toString()}`)
        if (!shortestPath || t.length < shortestPath.length) {
          shortestPath = t
        }
      }
    }
  }

  return shortestPath
}

const [target, ...lines] = input.trim().split("\n")

const graph = buildGraph(lines)
print(graph, "Graph")

const shortest = getShortestPath(graph, target)
if (shortest) {
  console.log(`Shortest path is ${shortest.toString()}`)
} else {
  console.log(`It was not possible to find the shortest path to ${target}`)
}
