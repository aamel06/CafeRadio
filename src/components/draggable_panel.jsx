import '../css/variables.css'
import '../css/container.css'
import Draggable from 'react-draggable';
import {useEffect, useLayoutEffect, useRef , useState} from 'react';
import { useContext } from "react";
import { PanelContext } from "../App.jsx";

function DraggableContainer(props){
    const [topbar, setTopBar] = useState(false)
    const [holding, setHolding] = useState(false)
    const me = useRef(null);
    const { panelState, setPanelState } = useContext(PanelContext);
    const [height, setHeight] = useState()
    const [width, setWidth] = useState()

    function closePanel() {
        setPanelState(prev => ({ ...prev, [props.idName]: 0 }));
    }

    function minimisePanel() {
        setPanelState(prev => ({ ...prev, [props.idName]: 1 }));
    }
    function updateSize(){
        setHeight(-window.innerHeight + me.current.clientHeight + 30)
        setWidth(window.innerWidth - me.current.clientWidth - 22)
    }

    useEffect(() => {setPanelState(prev => ({ ...prev, activepanel : props.idName}))},[])


    return(
        <Draggable 
        nodeRef={me} 
        handle=".paneltopbar"
        onStart={() => {
            setPanelState(prev => ({ ...prev, activepanel : props.idName}));
            updateSize();
        }}
        onDrag={() => {setHolding(true)}}
        onStop={() => {setHolding(false)}}
        bounds={{bottom:0, left:0, top: height, right:width}}
        >
            <div 
            className='draggablepanel'
            ref={me} 
            id={props.idName}
            onMouseEnter={() => setTopBar(true)}
            onMouseLeave={() => setTopBar(false)}
            onClick={() => setPanelState(prev => ({ ...prev, activepanel : props.idName}))}
            style={
                { zIndex: panelState.activepanel === props.idName ? 5 : 1,
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