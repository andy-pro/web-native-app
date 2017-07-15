export const fmtDate = date => (date.month + 1) + '/' + date.year

// export { fmtDate }

export const isCurrentMonth = date => {
  let dt = getCurrentDate()
  return date.month === dt.month && date.year === dt.year
}

const getCurrentDate = () => {
  let dt = new Date()
  return {
    month: dt.getMonth(),
    year: dt.getFullYear(),
  }
}

// export const getTimeId = () => {
//   let dt = new Date(),
//       id = dt.valueOf()
//   return {
//     dt,
//     id,
//     pid: id.toString(36), // pretty id of the current date
//     iso: dt.toISOString()
//   }
// }

const monthForward = (date, restrict=true) => {
  let { month, year } = date
  let dt = new Date()
  dt = dt.getMonth() + dt.getFullYear() * 12
  if (restrict && (month + year * 12) === dt) return date
  if (++month > 11) {
    month = 0
    ++year
  }
  return { month, year }
}

const monthBack = date => {
  let { month, year } = date
  if (--month < 0) {
    month = 11
    --year
  }
  return { month, year }
}


// const endMonthToISO = (date) =>
//   endMonth(date).toISOString()
//
// const startMonthToISO = (date) =>
//   startMonth(date).toISOString()

const endMonth = (date) =>
  startMonth(monthForward(date, false))

const startMonth = (date) =>
  new Date(date.year, date.month)

// export { getCurrentDate, monthForward, monthBack, startMonth, endMonth, startMonthToISO, endMonthToISO }

export { getCurrentDate, monthForward, monthBack, startMonth, endMonth }
