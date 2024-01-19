"use client"
import react from 'react'
import {useState} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import Form from '@components/Form'


const createPrompt = () => {
    const [submitting,setSubmitting]=useState(false)
    const [post,setPost]=useState({
        prompt:'',
        tag:''
    })

const {data:session}= useSession()
const router= useRouter()

    const handleSubmit=async(e)=>{
      e.preventDefault()
      setSubmitting(true)

      try{
        const response= await fetch('/api/prompt/new',{
          method:'POST',
          body:JSON.stringify({
            prompt:post.prompt,
            tag:post.tag,
            userId:session?.user.id
          })
        })

        if (response.ok){

        router.push('/')
        }

      }catch(err){
        console.log(err)
      }finally{
        setSubmitting(false)
      }

    }
  return (
    <Form
    type='Create'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={handleSubmit}
    />
  )
}

export default createPrompt
