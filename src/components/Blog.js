import { useState } from 'react'
import blogService from '../services/blogs'

const blogStyle = { marginBottom: '15px', padding: '10px', border: '1px solid #f09fff' }

const Blog = ({ blog, blogs, setBlogs }) => {
  const [expanded, setExpanded] = useState(false)

  const detailsStyle = {
    display: expanded ? '' : 'none'
  }
  const toggleText = expanded ? 'hide' : 'view'

  const toggleVisibility = () => setExpanded(!expanded)

  const handleLikeClick = async () => {
    console.log('like is clicked', blog)
    console.log('new', {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })

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
    console.log('response', response)
  }

  return (
    <li style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => toggleVisibility()}>{toggleText}</button>
      <div style={detailsStyle}>
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button onClick={handleLikeClick}>like</button></div>
        <div>{blog.user.name}</div>
      </div>
    </li>
  )
}


export default Blog