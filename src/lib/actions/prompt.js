'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const CreatePrompts = async(newPrompt)=>{
    const res = await fetch(`${baseUrl}/api/prompts`,{
        method:'POST',
        headers:{
            'Content-type': 'application/json',
        },
        body: JSON.stringify(newPrompt)
    });
    return res.json()
}