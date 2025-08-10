import { useContext, useEffect, useRef } from "react";
import { RadioContext } from "../App.jsx";
import YouTube from "react-youtube";

function Radio (){
    const { radioState } = useContext(RadioContext);
    const radioRef = useRef(null);

    const onReady = (event) => {
        radioRef.current = event.target;
        radioRef.current.setVolume(radioState.radiovolume);
        radioRef.current.playVideo();
    }

    useEffect(() => {
        if (radioRef.current) {
            radioRef.current.setVolume(radioState.radiovolume);
    }
    },[radioState.radiovolume])

    return(
        <div>
            {/* <YouTube
                videoId={radioState.radiourl}
                opts={{
                    height:'0',
                    width:'0',
                    playerVars: {
                        autoplay: 1,
                    },
                }}
                onReady={onReady}
            /> */}
        </div>
    )
}

export default Radio;