const { lines, flattenDeep } = require("./utils")

const edgesCount = parseInt(lines[0])
const edges = lines
  .slice(1, edgesCount + 1)
  .map((l) => l.split(" ").map((v) => parseInt(v)))
const [[startAtEdge, finalEdge]] = lines
  .slice(edgesCount + 1)
  .map((l) => l.split(" ").map((v) => parseInt(v)))

function getAdjacentGraph(edges) {
  return edges.reduce(function(graph, [edgeFrom, edgeTo]) {
    for (const [from, to] of [
      [edgeFrom, edgeTo],
      [edgeTo, edgeFrom],
    ]) {
      if (graph[from]) {
        graph[from].push(to)
      } else {
        graph[from] = [to]
      }
    }

    return graph
  }, {})
}

function calculateDistance(graph, edgeToFind, visited) {
  const from = visited[visited.length - 1]
  const connections = graph[from]
  if (!connections) {
    return []
  }

  if (connections.includes(edgeToFind)) {
    return [{ distance: visited.length + 1, visited: [...visited, edgeToFind] }]
  }

  const unvisitedEdges = connections.filter((e) => !visited.includes(e))

  return unvisitedEdges.map((e) =>
    calculateDistance(graph, edgeToFind, [...visited, e]),
  )
}

const graph = getAdjacentGraph(edges)
const distances = flattenDeep(
  calculateDistance(graph, finalEdge, [startAtEdge]),
)
distances.forEach(({ distance, visited }) => {
  console.log(
    `The distance from (${startAtEdge}) to (${finalEdge}) is ${distance}. Path traversed: ${visited.join(
      " -> ",
    )}`,
  )
})
