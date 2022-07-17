/* A postman can deliver on time if he/she can both start and finish it in the time period specified for a delivery.

Format:
- rawPostmans = [[shift start, shift end]]
- rawDeliveries = [[delivery start, delivery end]]
- deliveriesDurations = time it takes to complete nth delivery

Example: Given

  postmans = [["15:10", "16:00"],
             ["17:40", "22:30"]]
  deliveries = [["17:30", "18:00"],
           ["15:00", "15:45"]]
  deliveriesDurations = [15, 30]

VALID
The first postman can take the second delivery, and the second postman can take the first one.

---

Example: Given

  postmans = [["15:10", "16:00"],
              ["17:50", "22:30"],
              ["13:00", "14:40"]]
  deliveries = [["14:30", "15:00"]]
  deliveriesDurations = [15]

INVALID
None of the rawPostmans can fulfill the given delivery. The first two will be
unavailable at when delivery starts; the last one won't be able to finish
it in time, since the earliest time the delivery can be completed is 14:30 + 15
minutes = 14:45.
*/

const { readLines } = require("./utils")
const lines = readLines()
const assert = require("assert")

const lineGroups = groupInputLines(lines)

function hourToMinutes(hourString) {
  const [hours, minutes] = hourString.split(":").map((v) => parseInt(v))
  return hours * 60 + minutes
}

function areDeliveriesPossible(
  rawPostmans,
  rawDeliveries,
  deliveriesDurations,
) {
  const allPostmans = rawPostmans.map(([start, end]) => {
    start = hourToMinutes(start)
    end = hourToMinutes(end)
    return {
      start,
      end,
      duration: end - start,
    }
  })
  const allDeliveries = rawDeliveries.map(([start, end], i) => ({
    start: hourToMinutes(start),
    end: hourToMinutes(end),
    duration: deliveriesDurations[i],
  }))

  function iter(postmans, deliveries) {
    if (!deliveries.length) {
      return true
    }

    const firstAvailablePostmanIndex = postmans.findIndex(
      ({ start, end, duration }) => {
        const delivery = deliveries[deliveries.length - 1]

        if (
          duration < delivery.duration ||
          delivery.start + delivery.duration > end ||
          start + delivery.duration > delivery.end
        ) {
          return false
        }

        return true
      },
    )

    if (firstAvailablePostmanIndex === -1) {
      return false
    } else {
      deliveries.pop()
      postmans.splice(firstAvailablePostmanIndex, 1)
      return iter(postmans, rawDeliveries)
    }
  }

  // order needs to be permutated because the algorithm matches the first
  // available postman from left to right in the array, thus it's
  // order-sensitive
  const permutations = permutator(allPostmans.map((_, i) => i))

  for (const order of permutations) {
    const wasFulfilled = iter(
      order.map((i) => allPostmans[i]),
      allDeliveries.slice(),
    )

    if (wasFulfilled) {
      return true
    }
  }

  return false
}

const postmansCountLine = 1
const postmansStartLine = postmansCountLine + 1
const inputs = lineGroups.map((group) => {
  const expectedValue = !!parseInt(group[0])
  const postmansCount = parseInt(group[postmansCountLine])
  const postmansEnd = postmansStartLine + postmansCount
  const rawPostmans = group
    .slice(postmansStartLine, postmansEnd)
    .map((line) => line.split(" "))

  const leadTimes = []
  const rawDeliveries = []
  group.slice(1 + postmansEnd).forEach((line) => {
    const parts = line.split(" ")
    leadTimes.push(parseInt(parts[0]))
    rawDeliveries.push(parts.slice(1))
  })

  return [expectedValue, [rawPostmans, rawDeliveries, leadTimes]]
})

for (const [expectedValue, input] of inputs) {
  assert.strictEqual(areDeliveriesPossible(...input), expectedValue)
}
