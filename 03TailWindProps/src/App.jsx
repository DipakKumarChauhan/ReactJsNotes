import { useState } from 'react';
import ReactTest from './ReactTest.jpg';

import Card from './components/Card.jsx'

function App() {
  const [count, setCount] = useState(0);

  let myObject = {
    username:"Dipak",
    age: 22 , 
    Gender: "Male"
  };

  let myArray = [1,2,3];


  return (
    <>
      <h1 className='bg-green-400 text-black p-4 rounded-xl mb-4'>TailWind Test</h1>

      {/* uun comment below code to see two cards working */}
      {/*
       <Card/>
      <Card/> */}

      {/* // From above code we can display as many cards we want but to even change details in the card we can Use PROPS */}
      
        {/* // Note Props is a parameter in Cards function in cards file and what ever we pass from App.jsx in Cards that will get added into the props */}


      {   /* Passing Props In Card */}

      {/* Note to Pass Object or array we need to pass them as varibale declared earlier */}

        <Card channelName = "DipakYT" definedObject ={myObject} definedArray = {myArray} btnText = "clickme"/> 
        
        <Card channelName = "DipakYT2" definedObject ={myObject} definedArray = {myArray} btnText = "Mujhe thoko" /> 
        
        {/* You can see all this in console of website */}








      {/*  This was Just a demo code of tailwind css for injecting an image  below */}


      {/* <div className="flex flex-col items-center gap-6 p-7 md:flex-row md:gap-8 rounded-2xl">
        <div>
          <img
            className="w-48 h-48 shadow-xl rounded-md"
            alt="Beautiful Landscape"
            src={ReactTest}
          />
        </div>
        <div className="flex flex-col items-center md:items-start">
          <span className="text-2xl font-medium">Class Warfare</span>
          <span className="font-medium text-sky-500">The Anti-Patterns</span>
          <span className="flex gap-2 font-medium text-gray-600 dark:text-gray-400">
            <span>No. 4</span>
            <span>·</span>
            <span>2025</span>
          </span>
        </div>
      </div> */}
    </>
  );
}

export default App;
