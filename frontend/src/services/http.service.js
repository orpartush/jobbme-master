//axios service
import Axios from 'axios'

const axios = Axios.create({
  withCredentials: true
})

const BASE_URL =
  process.env.NODE_ENV === 'production' ? 'https://jobbme.herokuapp.com/api' : '//localhost:3030/api'

export default {
  get(endpoint, data, headers = {}) {
    return ajax(endpoint, 'GET', data, headers)
  },
  post(endpoint, data, headers = {}) {
    return ajax(endpoint, 'POST', data, headers)
  },
  put(endpoint, data, headers = {}) {
    return ajax(endpoint, 'PUT', data, headers)
  },
  delete(endpoint, data, headers = {}) {
    return ajax(endpoint, 'DELETE', data, headers)
  }
}

async function ajax(endpoint, method = 'get', data = null, headers) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      headers
    })
    return res.data
  } catch (err) {
    console.error(`Error while trying to ${method}`, err)
  }
}
