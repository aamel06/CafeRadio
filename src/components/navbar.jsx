import '../css/variables.css'
import '../css/container.css'
import { useContext , useEffect, useRef} from "react";
import { PanelContext} from "../App.jsx";

function NavButton ({text, panel}){
  const { panelState, setPanelState } = useContext(PanelContext);
  
  return(
    <button 
      onClick={() => {
        console.log(panel)
        setPanelState(prev => ({ ...prev, [panel] : 2 }));
      }}
      style={
      { color: panelState[panel] > 0 ? 'var(--colour2)' : 'var(--colour1)' }}
    >{text}</button>
  )
}

function Navbar (){

    return(
        <div className='panel' id='navbar'>
            <div className='options'>
                <NavButton text='📡 Radio Station' panel='radioselectpanel'/>
                <NavButton text='🎚 Audio Mixer' panel='mixerpanel'/>
                <NavButton text='📝 To Do List' panel='todolistpanel'/>
                <NavButton text='⏲️ Pomodoro Timer' panel='pomodoropanel'/>
                <NavButton text='🕓 Clock' panel='clockpanel'/>
                <button
                onClick={() =>{document.documentElement.requestFullscreen()}}
                >⛶ Fullscreen</button>
            </div>
        </div>
    )
}

export default Navbar;