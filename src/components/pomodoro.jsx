import { PanelContext } from '../App';
import DraggableContainer from './draggable_panel';
import { useContext, useEffect, useRef, useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';

function ValueSelect ({
        idName,
        text,
        step,
        maxVal,
        pomProps,
        setpomProps
}){
    const [value, setValue] = useState(pomProps[idName]);
    step = parseInt(step);
    maxVal = parseInt(maxVal);


    function increase(){
        if (value < maxVal){
            const newValue = value + step;
            setValue(newValue);
            setpomProps(prev => ({ ...prev, [idName]: newValue })); // sync with parent
        }
    }

    function decrease(){
        if (value > 0){
            const newValue = value - step;
            setValue(newValue);
            setpomProps(prev => ({ ...prev, [idName]: newValue })); // sync with parent
            
        }
    }

    return(
        <div className='selection'>
            <p className='text'>{text}: </p>
            <div className='right'>
                <button onClick={decrease}>-</button>
                <p id={idName} className='val'>{value}</p>
                <button onClick={increase}>+</button>
            </div>
            
        </div>
    )
}

function Settings({
    pomActive,
    setpomActive,
    pomTime,
    setpomTime,
    pomProps,
    setpomProps

}){
    return(
        <div id='settings'>
            <h3>Pomodoro Timer</h3>
            <ValueSelect 
            idName='work'
            text='Work Time (minutes)' 
            step='1' 
            maxVal='200'
            pomProps={pomProps}
            setpomProps={setpomProps}
            />
            <ValueSelect 
            idName='break'
            text='Break Time (minutes)' 
            step='1' 
            maxVal='60'
            pomProps={pomProps}
            setpomProps={setpomProps}
            />
            <ValueSelect 
            idName='rounds'
            text='Number of Rounds' 
            step='1' 
            maxVal='10'
            pomProps={pomProps}
            setpomProps={setpomProps}
            />
            <div className='action'><button onClick= {() => {setpomActive(true);}}>Start</button></div>
        </div>
    )
    }

function Timer({    
    pomActive,
    setpomActive,
    pomProps,
    setpomProps
}){
    const [pomPhase, setpomPhase] = useState('Work')
    const rounds = pomProps.rounds;
    const [round, setRound] = useState(1)
    const timeMultiplier = 1000; //Default 60000
    const [startTime, setStartTime] = useState()
    const alarm = new Audio('/src/sounds/alarm.mp3');
    const renderer = ({ minutes, seconds, completed }) => { 
        return <h2>{zeroPad(minutes)}:{zeroPad(seconds)}</h2>;
    };

    useEffect(() => {
        if (pomPhase == 'Work') {
            setStartTime(Date.now() + pomProps.work * timeMultiplier);
        } else if (pomPhase == 'Break') {
            setStartTime(Date.now() + pomProps.break * timeMultiplier);
        }
    }, [pomPhase, pomProps.work, pomProps.break]);

    const completed = () => {
        console.log('done')
        if (pomPhase == 'Work' && round <= rounds){
            setpomPhase('Break');
        } else if (pomPhase == 'Break'){
            setpomPhase('Work');
            setRound(r => r + 1);
        } else {
            console.log('Finished!')
        }
        alarm.play();
    }

    return(
        <div id='timer'>
                <h3>{pomPhase} {round}/{rounds}</h3>
                <Countdown
                date={startTime}
                renderer={renderer}
                onComplete={completed}
                key={pomPhase}
                />
                
                <div className='action'>
                {/* <button>Pause</button> */}
                <button onClick={() => {setpomActive(false)}}>Cancel</button>
                </div>
        </div>
    )
  }

function Pomodoro (){
    const {panelState} = useContext(PanelContext);

    const [pomActive, setpomActive] = useState(false)
    const [pomTime, setpomTime] = useState(0)
    const [pomProps, setpomProps] = useState({
        work : 0,
        break : 0,
        rounds : 0,
    })

    return(
        <DraggableContainer idName='pomodoropanel'>
            {!pomActive && <Settings 
            pomActive={pomActive}
            setpomActive={setpomActive}
            pomTime={pomTime}
            setpomTime={setpomTime}
            pomProps={pomProps}
            setpomProps={setpomProps}
            />}
            {pomActive && <Timer 
            pomActive={pomActive}
            setpomActive={setpomActive}
            pomTime={pomTime}
            setpomTime={setpomTime}
            pomProps={pomProps}
            setpomProps={setpomProps}
            />}
        </DraggableContainer>
    )
}

export default Pomodoro;