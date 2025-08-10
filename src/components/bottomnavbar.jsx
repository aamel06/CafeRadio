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

function BottomNavbar(){
  const [wallpaperState, setWallpaperState] = useState(false)
  const [settingsState, setSettingsState] = useState(false)
  return(
  <div className='panel' style={{right:0, bottom:0, left:null,  overflow: 'hidden'}}> 
    { wallpaperState &&
    <div id='wallpaper'>
      <h3>Change Wallpaper</h3>
        <div id='wpScroll'>
          <WallpaperPreview previewSRC='/src/assets/previews/cityroofrain.jpg' videoSRC='/src/assets/cityroofrain.mp4'/>
          <WallpaperPreview previewSRC='/src/assets/previews/forestinsiderain.jpg' videoSRC='/src/assets/forestinsiderain.mp4'/>
          <WallpaperPreview previewSRC='/src/assets/previews/firewindowinside.jpg' videoSRC='/src/assets/firewindowinside.mp4'/>
          <WallpaperPreview previewSRC='/src/assets/previews/nightcatcity.jpg' videoSRC='/src/assets/nightcatcity.mp4'/>
          <WallpaperPreview previewSRC='/src/assets/previews/storerainnight.jpg' videoSRC='/src/assets/storerainnight.mp4'/>
          <WallpaperPreview previewSRC='/src/assets/previews/purplecityinside.jpg' videoSRC='/src/assets/purplecityinside.mp4'/>
        </div>
    </div>}

  
    { settingsState && <div id='settings'>
      <h3>Settings</h3>
        <label>Panel Background Colour:</label>
        <label>Panel Text Colour:</label>
        <label>Pause Wallpaper:</label>
        <label>Fullscreen (Press 'ESC' To Exit Fullscreen):</label>
    </div>}


    <div style={{textAlign:'right'}}>
      <button onClick={()=>{
            if (wallpaperState){
              setWallpaperState(false)
            } else{
              setWallpaperState(true)
            }
            setSettingsState(false)
      }}>🗂️ Wallpaper</button>

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