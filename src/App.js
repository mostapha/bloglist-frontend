import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  if (user === null) {
    const handleLogin = async event => {
      event.preventDefault()

      const login_response = await loginService.login({
        username, password
      })

      if (login_response.error) {
        console.log('error', login_response.error)
        return
      }

      console.log('loginResponse', login_response)
      setUser(login_response)

    }

    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>username: <input
            name='username'
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          /></div>
          <div>password: <input
            name='password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          /></div>
          <button>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>User {user.name} is logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App