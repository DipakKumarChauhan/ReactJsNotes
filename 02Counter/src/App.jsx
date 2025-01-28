// HOOKS NOTES ////////////////////////////////

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

    // useState() give an array at 0th index is the variable (here named counter) and a function at 1st index (here named set counter)
    // We can paas mostly any thing in () in usestate() just avoid functions  

 let [counter,setCounter] = useState(5);

  //let counter = 5;

  function addValue() {
   console.log("value Added", counter);
   
   if( counter ==20){
    alert(  `counter value Cant Be increased above 20`)}
   else {setCounter(counter + 1)}
   //counter = counter +1 ;
   // Aise COunter me Update nahi ho raha hai ab iske liye wahi js me jaise Dom ka use karke document.getElementbyId() aur fir inject karna hoga har ek change ke liye jo ui me hoga
   // Is problem ko solve Karne ke Liye Hooks Use hota hai
   // SO jahan bhi ek change se UI me multiple jagah change ho usko React ache se Karta hai
  }; 

  function removeValue() {
    if( counter == 0){
      alert(  `counter value Cant Be decreased below 0`)}
     else {setCounter(counter -1)}
    // setCounter(counter - 1)
    console.log("value decreased", counter);
  };

  return (
    <>
      <h1>Chai Aur React</h1>
      <h3> COunter Value: {counter}</h3>
      <button
      onClick = {addValue} // this is Js where we definr onClick of the button run addValue function passed as reference
      >Add Value</button>
      <br />
      <button
      onClick={removeValue}>Decrease Value</button>
    </>
  )
}

export default App
