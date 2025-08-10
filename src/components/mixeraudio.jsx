import { useContext, useState, useRef, useEffect} from 'react';
import { PanelContext } from "../App";
import Mixer from "./mixer";

function AudioPlayer({vol, source, master}){
    const meRef = useRef(null)
    useEffect(() => {
        if (meRef.current) {
            meRef.current.volume = vol * master;
        }
    },[vol, master])

    useEffect(() => {
        const unmute = () => {
        if (meRef.current) {
            meRef.current.muted = false;
            meRef.current.play();
        }
        document.removeEventListener('click', unmute);
        };

        document.addEventListener('click', unmute);
        return () => document.removeEventListener('click', unmute);
    }, []);

    return(
        <audio
        autoPlay
        muted
        loop
        src={source}
        ref={meRef}
        
        />

    )
}


function MixerAudio ({
    master,
    rain,
    storm,
    fireplace,
    city,
    forest,
}){


    const rainSRC = '/src/sounds/rain.mp3'
    const fireplaceSRC = '/src/sounds/fireplace.mp3'
    const stormSRC = '/src/sounds/storm.mp3'
    const citySRC = '/src/sounds/city.mp3'
    const forestSRC = '/src/sounds/forest.mp3'
    
    return(
        <>
            <AudioPlayer vol={rain} source={rainSRC} master={master}/>
            <AudioPlayer vol={fireplace} source={fireplaceSRC} master={master}/>
            <AudioPlayer vol={storm} source={stormSRC} master={master}/>
            <AudioPlayer vol={city} source={citySRC} master={master}/>
            <AudioPlayer vol={forest} source={forestSRC} master={master}/>
        </>

    )
}

export default MixerAudio;