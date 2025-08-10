import DraggableContainer from './draggable_panel';
import { useContext, useRef, useState } from 'react';
import { RadioContext } from "../App.jsx";
import '../css/variables.css'



function AddRadio(){
    const { radioState, setRadio } = useContext(RadioContext);
    const yturl = useRef(null)
    const name = useRef(null)

    const addedRadio = (e) =>{
        e.preventDefault();
        if (!yturl.current.value.includes("youtube.com/watch?v=")) {
            alert("Invalid YouTube URL");
            yturl.current.value = ''
            name.current.value = ''
            return;
        }

        let stationName = name.current.value
        let ytID = yturl.current.value.substring(32);
        const updatedStations = [...radioState.stations, ['', stationName, ytID]];
        setRadio(prev => ({ ...prev, stations: updatedStations }));
        yturl.current.value = ''
        name.current.value = ''
    }

    return(
        <div style={{borderTop: '1px solid var(--colour1D)'}}>
            <p>Add Radio Station</p>
                <form onSubmit={addedRadio} action=''>
                    <input ref={yturl} type='text' placeholder='Youtube URL' required/>
                    <input ref={name} type='text' placeholder='Radio Name' required/>
                    <input type='submit' value='Add'/>
                </form>


        </div>
         
    )
}

function RadioButton({emoji, text, url}){
    const { setRadio } = useContext(RadioContext);

    return(
        <button onClick={() => {
            setRadio(prev => ({...prev, radioname : [text], radiourl : url}))
        }}>{emoji} {text}</button>
    )

}

function RadioSelect (){
    const { radioState, setRadio } = useContext(RadioContext);

    return(
        <DraggableContainer idName='radioselectpanel' style={{ display: 'none' }}>

            {/* <label htmlFor='radiovol'>Radio Volume: </label>
            <input onChange={(e) =>{
                let value = parseInt(e.target.value)
                setRadio(prev => ({...prev, radiovolume : value}))
            }} type='range'id='radiovol' min='0' max='100' defaultValue={radioState.radiovolume}/> */}
            
            <div> 
                <label htmlFor='radiovol'>Radio Volume: </label>
                <input 
                    type='range' 
                    id='radiovol'
                    min='0' 
                    max='100' 
                    defaultValue={radioState.radiovolume}
                    onChange={(e) => {
                        let value = parseInt(e.target.value)
                        setRadio(prev => ({...prev, radiovolume : value}))}}/>
            </div>

            <h3>Select Radio Station</h3>
            <p>Currently Playing: {radioState.radioname}</p>

            <div id='stations'>
                {radioState.stations.map(([emoji, text, url], index) => (
                <RadioButton emoji={emoji} text={text} url={url} key={index} />
                ))}
            </div>
            <AddRadio/>


        </DraggableContainer>
    )
}

export default RadioSelect;