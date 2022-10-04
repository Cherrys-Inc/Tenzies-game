import React from 'react';
import logo from './logo.svg';
import './App.css';
import "./Components/style.css";
import Dice from './Components/Dice';
import {nanoid} from "nanoid";
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';



function App() {
  const [dvalue,setDvalue]=React.useState(randomArray())
  const [tenzies,setTenzies]=React.useState(false)
  const { width, height } = useWindowSize()
  React.useEffect(()=>{
    const allHeld = dvalue.every(die => die.isHeld)
    const firstValue = dvalue[0].value
    const allSameValue = dvalue.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        
        console.log("You won!")
    }
}, [dvalue])
  
  function randomArray(){
    const newArray=[];
    for(let i=0;i<10;i++)
    {
      let x = Math.ceil(Math.random() * 6);
      newArray[i]={id:nanoid(),value:x,isHeld:false};

    }
    
    return newArray;

  }
  console.log(randomArray())
  function genArray(){
    setDvalue(randomArray());
  }
 function holdDice(id){
  setDvalue(oldDice => oldDice.map(die => {
    return die.id === id ? 
        {...die, isHeld: !die.isHeld} :
        die
}))
 }

 function rollDie(){
  if(!tenzies)
  {
  setDvalue(oldDice => oldDice.map(die => {
    return die.isHeld ? 
        die :
        {value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()}

 }))
}
else{
  setTenzies(false)
  setDvalue(randomArray())
}
}
  return (
    <main>
      <div className="heading p-3">Tenzies</div>
            <p className="ins p-3">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dcontainer'>
      {dvalue.map(die => <Dice key={die.id} value={die.value} isHeld={die.isHeld}  holdDice={() => holdDice(die.id)}/>)}
      </div>
      <button className='roll' onClick={rollDie}>{tenzies? "New Game" :"Roll"}</button>
      {tenzies?  <Confetti
      width={width}
      height={height}
    /> : <></>} 
                      
     
    </main>
  );
}

export default App;
           