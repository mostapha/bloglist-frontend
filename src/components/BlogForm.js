import { useRef, useState } from 'react'
import FormInput from './FormInput'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlogFormRef = useRef()

  const handleBlogCreation = async (event) => {
    event.preventDefault()

    const succeed = await createBlog({
      title,
      author,
      url
    })

    if(succeed){
      setTitle('')
      setAuthor('')
      setUrl('')

      addBlogFormRef.current.toggleVisibility()
    }
  }

  return (
    <Togglable buttonLabel='new blog' ref={addBlogFormRef}>
      <section>
        <h2>create a new blog</h2>
        <form onSubmit={handleBlogCreation}>
          <FormInput label='title' value={title} onChange={event => {setTitle(event.target.value)}}/>
          <FormInput label='author' value={author} onChange={event => {setAuthor(event.target.value)}}/>
          <FormInput label='url' value={url} onChange={event => {setUrl(event.target.value)}}/>
          <button type='submit'>create</button>
        </form>
      </section>
    </Togglable>
  )
}


BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm