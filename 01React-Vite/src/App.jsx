 import Chai from "./chai"


function App() {
  
  return (
    // <h1>React With Vite | Dipak</h1> // both can't be exported at same time so there is a different method
   // <Chai/>
   
   // either by using div
  
   //  <div>
  //   <h1>React With Vite | Dipak</h1>
  //   <Chai/>
  //  </div>
  
  // Or by fragment

  <>
  <h1>React With Vite | Dipak</h1>
   <Chai/>
  </>


  )
}

export default App
