import { useRef, useState } from 'react'
import FormInput from './FormInput'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const CreateBlog = ({ setNotification, blogs, setBlogs, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlogFormRef = useRef()

  const handleBlogCreation = async (event) => {
    event.preventDefault()

    const response = await blogService.createBlog({
      title,
      author,
      url
    })

    if(response.error){
      setNotification(response.error)
      return
    }

    console.log('blog create result', response)

    // fallback if populate is not used in the backend
    if(!response.user.name){
      response.user = {
        name: user.name
      }
    }

    setBlogs(blogs.concat(response))

    setNotification(`a new blog is added (${response.title} By ${response.author})`)

    setTitle('')
    setAuthor('')
    setUrl('')

    addBlogFormRef.current.toggleVisibility()
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

export default CreateBlog