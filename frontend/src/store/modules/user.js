import { userService } from '../../services/user.service'

const state = {
  loggedInUser: null,
  isAuthenticated: false
}

const getters = {
  getLoggedInUser(state) {
    return state.loggedInUser
  },
  getIsAuthenticated(state) {
    return state.isAuthenticated
  },
  getUserPositions(state) {
    return state.loggedInUser.positions
  }
}

// Actions
const actions = {
  async register(ctx, { formData }) {
    try {
      const userToRegister = { ...formData, positions: [] }
      const user = await userService.signup(userToRegister)
      if (user) {
        ctx.commit({ type: 'setLoggedInUser', user })
        ctx.commit({ type: 'setIsAuthenticated', value: true })
        return user
      } else return false
    } catch (err) {
      console.error(`Error while registering user`, err)
    }
  },
  async login(ctx, { formData }) {
    try {
      const user = await userService.singin(formData)
      if (user) {
        ctx.commit({ type: 'setLoggedInUser', user })
        ctx.commit({ type: 'setIsAuthenticated', value: true })
        return user
      } else return false
    } catch (err) {
      console.error(`Error while logging in user`, err)
    }
  },
  async logout(ctx) {
    try {
      await userService.logout()
      ctx.commit({ type: 'setLoggedInUser', user: null })
      ctx.commit({ type: 'setIsAuthenticated', value: false })
    } catch (err) {
      console.error(`Error while logging out`, err)
    }
  },
  async getUserById(ctx, { id }) {
    try {
      const user = await userService.getUserById(id)
      ctx.commit({ type: 'setLoggedInUser', user })
      ctx.commit({ type: 'setIsAuthenticated', value: true })
      return user
    } catch (err) {
      console.error(`Error while getting user by id(store)`, err)
    }
  }
}

// Mutations
const mutations = {
  setLoggedInUser(state, { user }) {
    state.loggedInUser = user
  },
  setIsAuthenticated(state, { value }) {
    state.isAuthenticated = value
  },
  setUpdatedPositions(state, { updatedPositions }) {
    state.loggedInUser.positions = updatedPositions
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
