export const utilService = {
  getCreatedDate,
  getTimestamp
}

function getCreatedDate(date) {
  try {
    const positionDate = new Date(date)
    return `${positionDate.getDate()}/${positionDate.getMonth() + 1}/${positionDate.getFullYear()}`
  } catch (err) {
    console.error(`Error while getting fixed date`, err)
  }
}

function getTimestamp(date) {
  try {
    return new Date(date).getTime() / 1000
  } catch (err) {
    console.error(`Error while getting timestamp`, err)
  }
}
