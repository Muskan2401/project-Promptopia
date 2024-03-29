"use client"
import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect} from 'react'
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'

const Nav = () => {
  const {data:session} =useSession()

  const [providers, setProviders]=useState(null)
  const [toggleDropdown,setToggleDropdown]=useState(false)

  useEffect(()=>{

    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();   

  },[])

  return (
    <nav className='flex-between w-full pt-3 mb-16'>
      <Link href="/" className='flex gap-2 flex-center'>
      <Image src='assets/images/logo.svg'
        width={30}
        height={30}
        alt="Promptopia"
        className='object-contain'/>
        <p className='logo_text'>Promptopia</p>
      </Link>

       
      <div className='sm:flex hidden'>
      {session?.user ? (
      <div className='flex gap-3 md:gap-5'>
        <Link href='/create-prompt' className='black_btn'>
          Create Post
        </Link>
        <button 
        type="button"
        className='outline_btn'
        onClick={signOut}
        >Sign Out</button>
        <Link href="/profile">
        <Image 
        src={session?.user.image}
        width={37}
        height={37}
        alt="profile"
        className='rounded-full'
        />
        </Link>
        </div>)
      :(
      <> 
      {providers &&
       (Object.values(providers).map(provider=>(
        <button
        type="button"
        key={provider.name}
        onClick={()=>signIn(provider.id)}
        className='black_btn'>
          Sign In
          </button>
       )))}
      </>
      )}
      </div>

      <div className='sm:hidden flex relative'>
        { session?.user ? (
        <div className='flex'>
          <Image
          src={session?.user.image}
          width={37}
          height={37}
          alt="profile"
          className='rounded-full'
          onClick={()=>setToggleDropdown((prev)=>!prev)}
          />
          {toggleDropdown && 
          (
            <div className='dropdown'>
        <Link 
          href='/profile'
          className='dropdown_link'
          onClick={()=>setToggleDropdown(false)}> 
          My Profile
        </Link>
        <Link 
          href='/create-prompt'
          className='dropdown_link'
          onClick={()=>setToggleDropdown(false)}> 
          Create Post
        </Link>
        <button 
        type="button"
        className='w-full mt-5 black_btn'
        onClick={()=>{
          setToggleDropdown(false)
          signOut()}}>
            Sign Out</button>
        </div>
          )
}
          

        </div>):(
        <>
        {providers &&
     (  Object.values(providers).map(provider=>(
        <button
        type="button"
        key={provider.name}
        onClick={()=>signIn(provider.id)}
        className='black_btn'>
          Sign In
          </button>
       )))}
        </>
        

        )}

      </div>

    </nav>
  )
}

export default Nav
