import { useContext, useState } from "react";
import { PanelContext } from "../App";

function WallpaperPreview({previewSRC, videoSRC}){
  const {panelState, setPanelState} = useContext(PanelContext)
  return(
      <button className="preview"
      style={{
        backgroundImage: `url(${previewSRC})`,
        backgroundSize: 'cover'
      }}
      onClick={() => {
        setPanelState(prev => ({ ...prev, wallpaperSRC: videoSRC }));
        console.log(panelState.wallpaperSRC)
        }}
      />
  )
}

function BottomNavbar({pauseVideo, setpauseVideo}){
  const [wallpaperState, setWallpaperState] = useState(false)
  const [settingsState, setSettingsState] = useState(false)
  const [pauseState, setpauseState] = useState('❚❚')
  return(
  <div className='panel' id='bottomnavbar' style={{right:0, bottom:0, left:null,  overflow: 'hidden'}}> 
    { wallpaperState &&
    <div id='wallpaper'>
      <h3>Change Wallpaper</h3>
        <div id='wpScroll'>
          <WallpaperPreview previewSRC='/static/previews/cityroofrain.jpg' videoSRC='/static/videos/cityroofrain.mp4'/>
          <WallpaperPreview previewSRC='/static/previews/forestinsiderain.jpg' videoSRC='/static/videos/forestinsiderain.mp4'/>
          <WallpaperPreview previewSRC='/static/previews/firewindowinside.jpg' videoSRC='/static/videos/firewindowinside.mp4'/>
          <WallpaperPreview previewSRC='/static/previews/nightcatcity.jpg' videoSRC='/static/videos/nightcatcity.mp4'/>
          <WallpaperPreview previewSRC='/static/previews/storerainnight.jpg' videoSRC='/static/videos/storerainnight.mp4'/>
          <WallpaperPreview previewSRC='/static/previews/purplecityinside.jpg' videoSRC='/static/videos/purplecityinside.mp4'/>
        </div>
    </div>}

    { settingsState && <div id='settings'>
      <h3>Settings</h3>
        <div className="setting">
          <button
          style={{padding:'0px'}}
          onClick={() => {
            if (pauseVideo){
              setpauseVideo(false);
              setpauseState('❚❚')
            } else{
              setpauseVideo(true);
              setpauseState('▶')
            }
          }}
          >{pauseState} Pause Wallpaper</button>
        </div>
        <div className="setting">
          <button
          style={{padding:'0px'}}
          onClick={() =>{
            if (screen.width == window.innerWidth && screen.height == window.innerHeight) {
                document.exitFullscreen()
            } else{document.documentElement.requestFullscreen()}
          }}
          >⛶ Fullscreen</button>
        </div>

    </div>}


    <div style={{textAlign:'right'}}>
      <a href='https://github.com/aamel06' target='_blank'>⛰️ aamel06</a>
      <button onClick={()=>{
            if (wallpaperState){
              setWallpaperState(false)
            } else{
              setWallpaperState(true)
            }
            setSettingsState(false)
      }}>🗂️ Wallpapers</button>

      <button onClick={()=>{
            if (settingsState){
              setSettingsState(false)
            } else{
              setSettingsState(true)
            }
            setWallpaperState(false)
      }}>⚙️ Settings</button>
    </div>

  </div>
  )
}

export default BottomNavbar