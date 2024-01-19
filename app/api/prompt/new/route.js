import { connectToDB } from "@utils/database"
import Prompt from "@model/prompt"

export const POST= async(req)=>{
    const{prompt,tag,userId}=await req.json()

    try{
        await connectToDB()
        const newPrompt=new Prompt({
          creator:userId,
          prompt,
          tag
        })

        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt),{status:201})

    }catch(err){
        return new Response('Prompt cannot be created',{status:500})

    }
}