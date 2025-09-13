import { useState, useContext, useRef} from 'react';
import DraggableContainer from './draggable_panel';
import { PanelContext } from "../App.jsx";
import MixerAudio from './mixeraudio.jsx';


function Slider (props){
        const sliderRef = useRef(null);

    return(
        <div className='inputrow'> 
            <label htmlFor={props.idName}>{props.text} </label>
            <input 
                ref={sliderRef}
                type='range' 
                id={props.idName} 
                min='0' 
                max='100' 
                value={props.vol * 100}
                onChange={(e) => {
                    let value = parseInt(e.target.value) / 100
                    props.setVol(value)
                    }}/>
        </div>
       
    )
}

function Mixer({
}) {
    const { panelState} = useContext(PanelContext);
    const [master, setMaster] = useState(0.75);
    const [rain, setRain] = useState(0);
    const [storm, setStorm] = useState(0);
    const [fireplace, setFireplace] = useState(0);
    const [city, setCity] = useState(0);
    const [forest, setForest] = useState(0);

    function matchWallpaper(){
        let wallpaper =  panelState.wallpaperSRC.toString().substring(15)
        console.log(wallpaper)
        if (wallpaper == 'cityroofrain.mp4'){
            setRain(0.75);
            setStorm(0.5);
            setFireplace(0)
            setCity(0.75)
            setForest(0)
        } else if (wallpaper == 'firewindowinside.mp4'){
            setRain(0);
            setStorm(0);
            setFireplace(0.65)
            setCity(0.5)
            setForest(0)
        
        } else if (wallpaper == 'forestinsiderain.mp4'){
            setRain(0.25);
            setStorm(0.15);
            setFireplace(0.75)
            setCity(0)
            setForest(0.1)
        } else if (wallpaper == 'nightcatcity.mp4'){
            setRain(0);
            setStorm(0);
            setFireplace(0)
            setCity(0.75)
            setForest(0)
        } else if (wallpaper == 'purplecityinside.mp4'){
            setRain(0.25);
            setStorm(0.15);
            setFireplace(0)
            setCity(0.5)
            setForest(0)
        } else if (wallpaper == 'storerainnight.mp4'){
            setRain(0.75);
            setStorm(0.15);
            setFireplace(0)
            setCity(0)
            setForest(0.1)
        } else{
            alert('Matching the mixer with the wallpaper is not supported on this wallpaper :/')
        }
    }

    return(
        <DraggableContainer idName='mixerpanel'>
            <h3>Audio Mixer</h3>
            <div className='sliders'>
                <Slider idName='master' text='👑 Master Volume: ' vol={master} setVol={setMaster}/>
                <Slider idName='rain' text='☔️ Rain: ' vol={rain} setVol={setRain}/>
                <Slider idName='fireplace' text='🪵 Fireplace: ' vol={fireplace} setVol={setFireplace}/>
                <Slider idName='storm' text='⛈️ Storm: ' vol={storm} setVol={setStorm}/>
                <Slider idName='city' text='🏙️ City: ' vol={city} setVol={setCity}/>
                <Slider idName='forest' text='🌲 Forest: ' vol={forest} setVol={setForest}/>
            </div>
            <button onClick={() => {(matchWallpaper())}}>✨ Match Wallpaper</button>

            <MixerAudio
                master={master}
                rain={rain}
                storm={storm}
                fireplace={fireplace}
                city={city}
                forest={forest}
            />
        </DraggableContainer>
    )
}

export default Mixer;