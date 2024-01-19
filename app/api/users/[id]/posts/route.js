import {connectToDB} from '@utils/database'
import Prompt from '@model/prompt'

export const GET= async(request,{params})=>{
    try{
        await connectToDB()
        const newPrompt=await Prompt.find({creator:params.id}).populate('creator')

        return new Response(JSON.stringify(newPrompt),{status:200})

    }catch(err){
        return new Response("Failed to fetch prompts",{status:500})

    }
}