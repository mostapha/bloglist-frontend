import { useState } from 'react'
import FormInput from './FormInput'
import blogService from '../services/blogs'

const CreateBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleBlogCreation = async (event) => {
    event.preventDefault()
    console.log()

    const response = await blogService.createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
    console.log('blog create result', response)
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