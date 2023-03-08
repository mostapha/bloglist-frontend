import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async blogInfo => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  try {
    const response = await axios.post(baseUrl, blogInfo, config)
    return response.data
  } catch (error) {
    if(error.response.data.error){
      return error.response.data
    }
    console.error(error)
  }
}

const updateBlog = async (blogId, blogInfo) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  try {
    const response = await axios.put(`${baseUrl}/${blogId}`, blogInfo, config)
    return response.data
  } catch (error) {
    if(error.response.data.error){
      return error.response.data
    }
    console.error(error)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlog, updateBlog, setToken }