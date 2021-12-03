import httpService from './http.service'
import { storageService } from './storage.service'
import { userService } from './user.service'
import { utilService } from './util.service'

export const positionService = {
  fetchPositions,
  addNewPosition,
  fetchPositionById,
  editPosition,
  removePosition,
  getFilteredPositions
}

async function fetchPositions() {
  try {
    const headers = { session: storageService.getUserIdSession() }
    const positions = await httpService.get('/position/', {}, headers)
    return positions
  } catch (err) {
    console.error('Error while fetching positions')
    return []
  }
}

async function addNewPosition(position) {
  try {
    const headers = { session: storageService.getUserIdSession() }
    const user = await httpService.post('/position/create-position', position, headers)
    return user
  } catch (err) {
    console.error('Error while adding new position', err)
    return null
  }
}

async function fetchPositionById(positionId) {
  try {
    const headers = { session: storageService.getUserIdSession() }
    const position = await httpService.get(`/position/${positionId}`, {}, headers)
    return position
  } catch (err) {
    console.error(`Error while fetching position by id`, err)
  }
}

async function editPosition(position) {
  try {
    const headers = { session: storageService.getUserIdSession() }
    const user = await httpService.put('/position/update-position', position, headers)
    return user
  } catch (err) {
    console.error(`Error while updating position`, err)
  }
}

async function removePosition(positionData) {
  try {
    const headers = { session: storageService.getUserIdSession() }
    await httpService.post(`/position/remove-position/`, positionData, headers)
  } catch (err) {
    console.error(`Error while removing position`)
  }
}

function getFilteredPositions(filterBy, allPositions) {
  try {
    let filteredPositions = []

    if (filterBy.sort !== '') {
      if (filterBy.sort === 'date') {
        filteredPositions = allPositions.sort((a, b) => {
          const aTimestamp = +utilService.getTimestamp(a.date)
          const bTimestamp = +utilService.getTimestamp(b.date)
          return aTimestamp - bTimestamp > 0 ? -1 : 1
        })
      } else if (filterBy.sort === 'answered' || filterBy.sort === 'not-answered') {
        filteredPositions = allPositions.sort((a, b) => {
          const aDidAnswer = a.didAnswer
          const bDidAnswer = b.didAnswer
          if (filterBy.sort === 'answered') {
            return aDidAnswer === bDidAnswer ? 0 : aDidAnswer ? -1 : 1
          } else if (filterBy.sort === 'not-answered') {
            return aDidAnswer === bDidAnswer ? 0 : aDidAnswer ? 1 : -1
          }
        })
      }
    }

    if (filterBy.search !== '') {
      filteredPositions = allPositions.filter(position => {
        const searchValue = filterBy.search.toLowerCase()
        const positionTitle = position.title.toLowerCase()
        return positionTitle.includes(searchValue)
      })
    }

    return filteredPositions
  } catch (err) {
    console.error(`Error while getting filtered positions`, err)
  }
}
