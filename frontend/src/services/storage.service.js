export const storageService = {
  load,
  store,
  remove,
  getUserIdSession
}

function load(key) {
  const storedItem = JSON.parse(localStorage.getItem(key))
  return storedItem
}

function store(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function remove(key) {
  localStorage.removeItem(key)
}

function getUserIdSession() {
  return sessionStorage.getItem('userId')
}
