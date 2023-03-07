import { useState } from 'react'
import FormInput from './FormInput'
import blogService from '../services/blogs'

const CreateBlog = ({ setNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


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

    setTitle('')
    setAuthor('')
    setUrl('')
    console.log('blog create result', response)
    setNotification(`a new blog is added (${response.title} By ${response.author})`)
  }

  return (
    <section>
      <h2>create a new blog</h2>
      <form onSubmit={handleBlogCreation}>
        <FormInput label='title' value={title} onChange={event => {setTitle(event.target.value)}}/>
        <FormInput label='author' value={author} onChange={event => {setAuthor(event.target.value)}}/>
        <FormInput label='url' value={url} onChange={event => {setUrl(event.target.value)}}/>
        <button type='submit'>create</button>
      </form>
    </section>
  )
}

export default CreateBlog