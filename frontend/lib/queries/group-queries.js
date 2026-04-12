
const url = process.env.NEXT_PUBLIC_API_URL;
console.log("url",url)
export async function fetchGroups(){
    const response = await fetch(`${url}/api/groups`,
        {
            credentials:"include"
        }
    );
    const result = await response.json()
    if(!response.ok) throw new Error(result)
    return result
}

export async function createGroup(newGroup){
    const response = await fetch(`${url}/api/groups`,{
        method:"POST",
        credentials:"include",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(newGroup)
    })
    const result = await response.json()
    if(!response.ok) throw new Error(result.error)
    return result
}