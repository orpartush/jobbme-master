import httpService from './http.service'
import { storageService } from './storage.service'

export const userService = {
  signup,
  singin,
  logout,
  getUserById
}

async function signup(formData) {
  try {
    const newUser = await httpService.post('/auth/register', formData)
    if (newUser && newUser._id) {
      sessionStorage.setItem('userId', newUser._id)
    }
    return newUser
  } catch (err) {
    console.error(`Error while signing up`, err)
  }
}

async function singin(formData) {
  try {
    const user = await httpService.post('/auth/login', formData)
    if (user && user._id) {
      sessionStorage.setItem('userId', user._id)
    }
    return user
  } catch (err) {
    console.error(`Error while signing in`, err)
  }
}

async function logout() {
  try {
    const headers = { session: storageService.getUserIdSession() }
    await httpService.post('/auth/logout', {}, headers)
    sessionStorage.clear()
  } catch (err) {
    console.error(`Error while logging out`, err)
  }
}

async function getUserById(id) {
  try {
    const user = await httpService.get(`/user/${id}`)
    if (user && user._id) {
      sessionStorage.setItem('userId', user._id)
    }
    return user
  } catch (err) {
    console.error(`Error while getting user by id`, err)
  }
}
