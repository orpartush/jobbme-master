import { positionService } from '../../services/position.service'

const state = {
  positions: [],
  filterBy: { sort: '', search: '' },
  isPositionModalOn: false,
  clickedPosition: {}
}

const getters = {
  getPositions(state) {
    return state.positions
  },
  getIsPositionModalOn(state) {
    return state.isPositionModalOn
  }
}

// Actions
const actions = {
  async fetchPositions(ctx) {
    try {
      const positions = await positionService.fetchPositions()
      ctx.commit('setPositions', { positions })
    } catch (err) {
      console.error('Error while fetching positions', err)
    }
  },
  async addPosition(ctx, { position }) {
    try {
      const user = await positionService.addNewPosition(position)
      return user
    } catch (err) {
      console.error('Error while adding position', err)
    }
  },
  async getPositionById(ctx, { positionId }) {
    try {
      const position = await positionService.fetchPositionById(positionId)
      ctx.commit('setClickedPosition', { position })
      return position
    } catch (err) {
      console.error(`Error while getting position by id`, err)
    }
  },
  async updatePosition(ctx, { position }) {
    try {
      const user = await positionService.editPosition(position)
      return user
    } catch (err) {
      console.error('Error while updating position', err)
    }
  },
  async deletePosition(ctx, { positionData }) {
    try {
      await positionService.removePosition(positionData)
    } catch (err) {
      console.error('Error while deleting position', err)
    }
  }
}

// Mutations
const mutations = {
  setPositions(state, { positions }) {
    state.positions = positions
  },
  setFilterBy(state, { updatedFilterBy }) {
    state.filterBy = updatedFilterBy
  },
  setClickedPosition(state, { position }) {
    state.clickedPosition = position
  },
  displayPositionModal(state) {
    state.isPositionModalOn = true
  },
  closePositionModal(state) {
    state.isPositionModalOn = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
