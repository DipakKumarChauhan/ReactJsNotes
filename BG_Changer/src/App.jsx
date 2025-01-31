import { useState } from "react"


function App() {
  const [color,setcolor] = useState("olive")

  return (
   
    <div className="w-full h-screen duration-200"
    style={{backgroundColor: color}}

    >
    
    <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
      
      <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-xl ">
        
        <button 
        onClick={()=> setcolor("red")}
        className="outline-none px-4 py-1 rounded-full text-white shadow-lg "
        style = {{backgroundColor: "red"}}
        > Red </button>

        <button 
        onClick={()=> setcolor("skyblue")}
        className="outline-none px-4 py-1 rounded-full text-black shadow-lg "
        style = {{backgroundColor: "skyblue"}}
        > Skyblue </button>

         <button 
         onClick={()=> setcolor("black")}
         className="outline-none px-4 py-1 rounded-full text-white shadow-lg "
        style = {{backgroundColor: "black"}}
        > black </button>

         <button
         onClick={()=> setcolor("maroon")}
         className="outline-none px-4 py-1 rounded-full text-white shadow-lg "
        style = {{backgroundColor: "maroon"}}
        > maroon </button>

        <button
        onClick={()=> setcolor("orange")}
        className="outline-none px-4 py-1 rounded-full text-white shadow-lg "
        style = {{backgroundColor: "orange"}}
        > orange </button>



      </div>
    </div>

    </div>

    
  )
}

export default App
