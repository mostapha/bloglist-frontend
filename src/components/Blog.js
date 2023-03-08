import { useState } from 'react'

const blogStyle = { marginBottom: '15px', padding: '10px', border: '1px solid #f09fff' }

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)

  const detailsStyle = {
    display: expanded ? '' : 'none'
  }
  const toggleText = expanded ? 'hide' : 'view'

  const toggleVisibility = () => setExpanded(!expanded)

  return (
    <li style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => toggleVisibility()}>{toggleText}</button>
      <div style={detailsStyle}>
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button>like</button></div>
        <div>{blog.user.name}</div>
      </div>
    </li>
  )
}


export default Blog