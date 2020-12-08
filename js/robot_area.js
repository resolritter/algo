// -- Definitions
// Point = { x: Int, y: Int }
// Delta = { x: Int, y: Int }
// Grid = { topLeft: Point, topRight: Point, bottomLeft: Point, bottomRight: Point }

// -- Parameters
const landmineThreshold = 23

// -- Utility functions
const getEnum = function(collection) {
  return collection.reduce(function(acc, v) {
    acc[v] = v
    return acc
  }, {})
}
const hashPoint = function({ x, y }) {
  return `{x:${x},y:${y}}`
}
const getGrid = function(size) {
  return {
    topLeft: { x: 0, y: 0 },
    topRight: { x: size, y: 0 },
    bottomLeft: { x: 0, y: size },
    bottomRight: { x: size, y: size },
  }
}

// -- Constants
const MoveStatus = getEnum(["Ok", "Danger", "OutOfBounds"])

// -- Implementation
const isPointSafe = function({ x, y }) {
  let sum = 0

  for (const num of [x, y]) {
    const digits = Math.abs(num)
      .toString()
      .split("")
    let multiplier = 1

    for (let i = digits.length - 1; i >= 0; --i) {
      sum += parseInt(digits[i]) * multiplier
      multiplier *= 10
    }
  }

  return sum < landmineThreshold
}

const addPoint = function({ x, y }, { x: xB, y: yB }) {
  return { x: x + xB, y: y + yB }
}

const checkWithinBounds = function(grid, point, delta) {
  const nextPoint = addPoint(point, delta)
  const { x, y } = nextPoint

  if (
    x >= grid.topLeft.x &&
    x <= grid.topRight.x &&
    x >= grid.bottomLeft.x &&
    x <= grid.bottomRight.x &&
    y >= grid.topLeft.y &&
    y <= grid.bottomLeft.y &&
    y <= grid.bottomRight.y
  ) {
    return { status: MoveStatus.Ok, point: nextPoint }
  } else {
    return { status: MoveStatus.OutOfBounds, point }
  }
}

const tryMove = function(grid, point, delta) {
  const boundsCheck = checkWithinBounds(grid, point, delta)

  if (boundsCheck.status === MoveStatus.Ok) {
    const nextPoint = boundsCheck.point

    if (isPointSafe(nextPoint)) {
      return { status: MoveStatus.Ok, point: nextPoint }
    } else {
      return { status: MoveStatus.Danger, point }
    }
  } else {
    return boundsCheck
  }
}

const deltaMove = function(delta) {
  return function(grid, point) {
    return tryMove(grid, point, delta)
  }
}

const tryMoveLeft = deltaMove({ x: -1, y: 0 })
const tryMoveRight = deltaMove({ x: 1, y: 0 })
const tryMoveUp = deltaMove({ x: 0, y: -1 })
const tryMoveDown = deltaMove({ x: 0, y: 1 })

const traverseGrid = function(grid, point) {
  const cellsTraversed = new Set()

  const iter = function(grid, point) {
    for (const move of [tryMoveDown, tryMoveUp, tryMoveLeft, tryMoveRight]) {
      const { status, point: nextPoint } = move(grid, point)

      if (status === MoveStatus.Ok) {
        const hash = hashPoint(nextPoint)

        if (!cellsTraversed.has(hash)) {
          cellsTraversed.add(hash)
          iter(grid, nextPoint)
        }
      }
    }
  }
  iter(grid, point)

  return cellsTraversed.size
}

const main = function({ startingPoint }) {
  let lastRunResult
  let size = 1

  while (true) {
    const count = traverseGrid(getGrid(size), startingPoint)

    if (count === lastRunResult) {
      break
    }

    lastRunResult = count
    ++size
  }

  console.log(`Exhausted paths at grid size: ${size - 1}`)
  console.log(
    `Maximum number of cells which can be traversed: ${lastRunResult}`,
  )
}

main({ startingPoint: { x: 0, y: 0 } })
