"use client"
import react from 'react'
import {useState,useEffect} from 'react'
import {useRouter,useSearchParams} from 'next/navigation'
import Form from '@components/Form'


const updatePrompt = () => {
    const [submitting,setSubmitting]=useState(false)
    const [post,setPost]=useState({
        prompt:"",
        tag:""
    })


const router= useRouter()
const searchParams= useSearchParams();
const promptId=searchParams.get('id')

useEffect(()=>{
    const fetchPrompt=async()=>{
    
        const response= await fetch(`/api/prompt/${promptId}`)
        const data=await response.json()
        setPost({
            prompt:data.prompt,
            tag:data.tag
        })
        

}

if (promptId) fetchPrompt()

},[promptId])

    const handleEdit=async(e)=>{
      e.preventDefault()
      setSubmitting(true)
      if (!promptId) alert("Prompt Id is not present")

      try{
        const response= await fetch(`/api/prompt/${promptId}`,{
          method:'PATCH',
          body:JSON.stringify({
            prompt:post.prompt,
            tag:post.tag
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
    type='Edit'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={handleEdit}
    />
  )
}

export default updatePrompt
