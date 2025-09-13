import './css/App.css'
import Navbar from './components/navbar'
import Clock from './components/clock'
import RadioSelect from './components/radioselect'
import { useState, createContext, StrictMode, useReducer, useRef, useEffect } from 'react'
import Radio from './components/radio'
import Pomodoro from './components/pomodoro'
import ToDoList from './components/todolist'
import Mixer from './components/mixer'
import ChangeWallpaper from './components/bottomnavbar'
import BottomNavbar from './components/bottomnavbar'

export const PanelContext = createContext();
export const RadioContext = createContext();
export const ToDoListContext = createContext();
//⟢

function App() {
  const [panelState, setPanelState] = useState({  // Context for the state of all panels in the website
    activepanel : null,
    wallpaperSRC : '/static/videos/storerainnight.mp4',
    radioselectpanel : 0, //1 = open but minimised, 2 = open and visible, 0 = closed
    mixerpanel : 0,
    pomodoropanel : 0,
    todolistpanel : 0,
    clockpanel : 0,
    wallpaperpanel : 0,
    navbarspanel : 2,
  });

  const [radioState, setRadio] = useState({
    radioname : 'No Radio',
    radiourl : '',
    radiovolume : 70,
    stations : 
      [['🌄', 'Lofi Radio', 'jfKfPfyJRdk'],
      ['🌌', 'Ambient Radio', 'S_MOd40zlYU'],
      ['🌃', 'Synthwave Radio', '4xDzrJKXOOY'],
      ['🚫', 'No Radio', '']]
  });

  const [todolistState, setToDoList] = useState([]);
  const videoRef = useRef(null);
  const [pauseVideo, setpauseVideo] = useState(false);

  useEffect(() =>{
    videoRef.current?.load();
  }, [panelState.wallpaperSRC])  

  useEffect(() => {
    if (pauseVideo){
      videoRef.current?.pause();
    } else{
      videoRef.current?.play();
    }
  }, [pauseVideo])

  addEventListener('mousemove',(e) => {
    if (timerActive){
      
    }
  });

  return (
    // <StrictMode>
    <PanelContext.Provider value={{ panelState, setPanelState }}>
      <video 
        id='background' 
        ref={videoRef} 
        autoPlay 
        muted 
        loop
        onContextMenu={() => {return false}}
        playsinline
        >
        <source src={panelState.wallpaperSRC}/>
      </video>
      

      <RadioContext.Provider value={{radioState, setRadio}}>
        {panelState.clockpanel > 0 && <Clock/>}
        {panelState.radioselectpanel > 0 && <RadioSelect/>}
        <ToDoListContext.Provider value={{todolistState, setToDoList}}>
        {panelState.todolistpanel > 0 && <ToDoList/>}
        </ToDoListContext.Provider>
        {panelState.pomodoropanel > 0 && <Pomodoro/>}
        {panelState.mixerpanel > 0 && <Mixer/>}
        {panelState.navbarspanel > 0 && <Navbar/>}
        {panelState.navbarspanel > 0 && <BottomNavbar pauseVideo = {pauseVideo} setpauseVideo={setpauseVideo}/>}
        <Radio/>
      </RadioContext.Provider>

    </PanelContext.Provider>
    // </StrictMode>
  )
}

export default App
