const assert = require("assert")
const { lines } = require("./utils")
const firstDate = lines[0]
const weekFrequency = parseInt(lines[1])
const eventWeekDays = lines.slice(2, -1)
const nthNextDates = lines.slice(-1)[0]

// Input:
//   firstDate: "01/01/2015"
//   everyNthWeek: 2
//   eventWeekDays: ["Monday", Thursday"]
//   nthNextDates: 4
// Expected Output:
//  [ '01/01/2015', '04/01/2015', '15/01/2015', '18/01/2015' ]
//  i.e. starting from the current week (from firstDate)
//       the 4 (nthNextDates) nearest dates
//       for the selected week days (eventWeekDays)
//       with 2 (everyNthWeek) weeks in-between them

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 != 0) || year % 400 === 0
}

const defaultMonthsDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

function getMonthsDays(year) {
  const monthsDays = defaultMonthsDays.slice()
  if (isLeapYear[year]) {
    monthsDays[1] = 29
  }
  return monthsDays
}

const daysInAWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

function parseDateComponents(date) {
  const [day, month, year] = date.split("/").map((e) => parseInt(e))
  return { day, month, year }
}

function advanceDateByDays({ day, month, year }, by) {
  const naiveDay = day + by
  const initialMonthsDays = getMonthsDays(year)
  const totalDays = initialMonthsDays[month - 1]
  const isAdvancingMonth = naiveDay > totalDays
  const naiveMonth = isAdvancingMonth ? month + 1 : month
  const isAdvancingYear = naiveMonth > defaultMonthsDays.length
  const computedYear = isAdvancingYear ? year + 1 : year
  const computedMonth = isAdvancingYear ? 1 : naiveMonth
  const computedDay = isAdvancingMonth ? naiveDay - totalDays : naiveDay

  return { day: computedDay, month: computedMonth, year: computedYear }
}

function regressDateByDays({ day, month, year }, by) {
  const naiveDay = day - by
  const isRegressingMonth = naiveDay < 1
  const naiveMonth = isRegressingMonth ? month - 1 : month
  const isRegressingYear = naiveMonth < 1
  const computedYear = isRegressingYear ? year - 1 : year
  const computedMonth = isRegressingYear ? defaultMonthsDays.length : naiveMonth
  const monthsDays = getMonthsDays(computedYear)
  const computedDay = isRegressingMonth
    ? monthsDays[computedMonth - 1] - naiveDay * -1
    : naiveDay

  return { day: computedDay, month: computedMonth, year: computedYear }
}

function recurringTask(firstDate, everyNthWeek, eventWeekDays, nthNextDates) {
  const parsedFirstDate = parseDateComponents(firstDate)
  const offsetFromSunday = eventWeekDays.map((e) => daysInAWeek.indexOf(e))
  // "normalize" the input day to the closest previous Sunday
  let startOfWeek = regressDateByDays(parsedFirstDate, offsetFromSunday[0])
  const dates = []

  function insertWeek(sundayDate) {
    for (const i of offsetFromSunday) {
      const { day, month, year } = advanceDateByDays(sundayDate, i)
      dates.push(
        `${day.toString().padStart(2, "0")}/${month
          .toString()
          .padStart(2, "0")}/${year}`,
      )
    }
  }

  let weekCountCursor = 0
  while (dates.length < nthNextDates) {
    if (weekCountCursor % everyNthWeek === 0) {
      insertWeek(startOfWeek)
    }
    weekCountCursor++
    startOfWeek = advanceDateByDays(startOfWeek, 7)
  }

  return dates.slice(0, dates.length - (dates.length % nthNextDates))
}

assert.deepStrictEqual(
  recurringTask(firstDate, weekFrequency, eventWeekDays, nthNextDates),
  ["01/01/2015", "04/01/2015", "15/01/2015", "18/01/2015"],
)
console.log("ok")
