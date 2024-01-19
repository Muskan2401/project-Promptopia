"use client"

import {useState,useEffect} from 'react'
import { useSearchParams } from 'next/navigation'


import Profile from '@components/Profile'


const UserProfile=({params})=>{

    const [posts,setPosts]=useState([])
    const searchParams= useSearchParams();
    const userName=searchParams.get("name")
 
    

    useEffect(()=>{
        const fetchPosts=async()=>{
          const response= await fetch(`/api/users/${params?.id}/posts`)
          const result= await response.json()
          setPosts(result)
        }

        if (params?.id) fetchPosts()
    
      },[params?.id])

    return (
     
    <Profile 
    name={userName}
    desc={`Welcome to ${userName}'s personalized profile page.Explore ${userName}'s exceptional prompts
    and be inspired by thepowerof their imagination.`}
    data={posts}
    />
    )
}

export default UserProfile