import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const blogStyle = { marginBottom: '15px', padding: '10px', border: '1px solid #f09fff' }

const Blog = ({ blog, blogs, setBlogs, user, setNotification }) => {
  const [expanded, setExpanded] = useState(false)

  const detailsStyle = {
    display: expanded ? '' : 'none'
  }
  const toggleText = expanded ? 'hide' : 'view'

  const toggleVisibility = () => setExpanded(!expanded)

  const handleLikeClick = async () => {
    const response = await blogService.updateBlog(blog.id, {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })

    const blogIndex = blogs.findIndex(b => b.id === blog.id)
    const newBlogs = [...blogs]
    newBlogs[blogIndex] = response
    setBlogs(newBlogs)
  }

  const handleRemove = async () => {
    if(!window.confirm(`remove ${blog.title} by ${blog.author}`)) return

    const response = await blogService.removeBlog(blog.id)
    if(response.error){
      setNotification(response.error)
      return
    }

    setBlogs(blogs.filter(b => b.id !== blog.id))
  }

  return (
    <li style={blogStyle}>
      <b>{blog.title}</b> by {blog.author} <button onClick={() => toggleVisibility()}>{toggleText}</button>
      <div style={detailsStyle}>
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button onClick={handleLikeClick}>like</button></div>
        <div>{blog.user.name}</div>
        {blog.user.username === user.username ? <button onClick={handleRemove}>remove</button> : ''}
      </div>
    </li>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user:PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default Blog