"use client"

import {useState,useEffect} from 'react'
import PromptCard from './PromptCard'

const PromptCardList=({data,handleTagClick})=>{
  return (
  <div className='mt-16 prompt_layout'>

  { data.map((post)=>(
    <PromptCard 
    key={post._id}
    post={post}
    handleTagClick={handleTagClick}
    /> ))}
  </div>
  )

}

const Feed = () => {
  const [searchText,setSearchText]=useState('')
  const [posts,setPosts]=useState([])
  const [searchTimeout,setSearchTimeout]=useState(null)
  const [searchedResults,setSearchResults]=useState([])

  const filteredPrompts=(searchtext)=>{
    const Regex=new RegExp(searchtext,"i")

    return  posts.filter((item)=> 
      Regex.test(item.creator.username) ||
      Regex.test(item.prompt)||
      Regex.test(item.tag)
    )
    
  }

  const handleSearchText=(e)=>{
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    // debounce function
    setSearchTimeout(
      setTimeout(()=>{
        const searchResults=filteredPrompts(e.target.value)
        setSearchResults(searchResults)

      },500)
    )

  }

  const handleTagClick=(tagName)=>{
    setSearchText(tagName)

    const searchResults=filteredPrompts(tagName)
        setSearchResults(searchResults)

  }

  const fetchPosts = async () => {
    const response = await fetch("app/api/prompt");
    const data = await response.json();
    console.log(data)

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (

    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
        type="text"
        placeholder="Search for a tag or a username"
        value={searchText}
        onChange={handleSearchText}
        className='search_input peer' 
        required/>
      </form>
      {searchText ?
      <PromptCardList 
      data={searchedResults}
      handleTagClick={handleTagClick}/> :

      <PromptCardList 
      data={posts}
      handleTagClick={handleTagClick}/> 

}
      

    </section>
    
  )
}

export default Feed
