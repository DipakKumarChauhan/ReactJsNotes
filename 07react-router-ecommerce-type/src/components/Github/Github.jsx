import React, { use } from 'react'
import { useLoaderData } from 'react-router-dom'
const Github = () => {
    
    const data = useLoaderData()
    //const [data,setData] = useState([]);
    // Instead of Use Effect we are using githb infoloader coz it fetches the data faste than useEffect and even caches it.
    // useEffect(() => {
    //     fetch('https://api.github.com/users/DipakKumarChauhan')
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         setData(data);
    //     })
    // },[])
  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>Github Followers: {data.followers}
    <img src = {data.avatar_url} alt="github profile pic" className='mx-auto mt-4 rounded-full w-48'/>
    </div>
  )
}

export default Github

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/DipakKumarChauhan')
    return response.json()
}