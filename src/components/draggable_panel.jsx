import '../css/variables.css'
import '../css/container.css'
import Draggable from 'react-draggable';
import {useEffect, useRef , useState} from 'react';
import { useContext } from "react";
import { PanelContext } from "../App.jsx";

function DraggableContainer(props){
    const [topbar, setTopBar] = useState(false)
    const [holding, setHolding] = useState(false)
    const me = useRef(null);
    const { panelState, setPanelState } = useContext(PanelContext);

    function closePanel() {
        setPanelState(prev => ({ ...prev, [props.idName]: 0 }));
    }

    function minimisePanel() {
        console.log(window.getViewportForBounds)

        setPanelState(prev => ({ ...prev, [props.idName]: 1 }));
    }

    useEffect(() => {setPanelState(prev => ({ ...prev, activepanel : props.idName}))},[])

    return(
        <Draggable 
        nodeRef={me} 
        handle=".paneltopbar"
        onStart={() => setPanelState(prev => ({ ...prev, activepanel : props.idName}))}
        onDrag={() => {setHolding(true)}}
        onStop={() => {setHolding(false)}}
        >
            <div 
            className='draggablepanel'
            ref={me} 
            id={props.idName}
            onMouseEnter={() => setTopBar(true)}
            onMouseLeave={() => setTopBar(false)}
            onClick={() => setPanelState(prev => ({ ...prev, activepanel : props.idName}))}
            style={
                { zIndex: panelState.activepanel === props.idName ? 2 : 1,
                 display: panelState[props.idName] !== 1 ? 'block' : 'none'}
                }>
            {
                (topbar || holding) && 
                <div className='paneltopbar'>
                    <button onClick={minimisePanel}>─</button>
                    <button onClick={closePanel}>X</button>
                </div>
            }
            {props.children}

            </div>
        </Draggable>
    );
}

export default DraggableContainer;