import React from "react";
import "./style.css"
export default function Dice(props){
    
    return(
        <div className="dbox" 
        onClick={props.holdDice}
        style={{backgroundColor :props.isHeld ? "#59E391": "white"}}>
            <div className="dfont">{props.value}</div>
        </div>
    )
}