import DraggableContainer from './draggable_panel';
import { useRef, useState } from 'react';
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
            setpomProps(prev => ({ ...prev, [idName]: newValue }));
        }
    }

    function decrease(){
        if (value > 0){
            const newValue = value - step;
            setValue(newValue);
            setpomProps(prev => ({ ...prev, [idName]: newValue }));
            
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
    alarmVolume,
    setAlVol,
    setpomActive,
    pomProps,
    setpomProps

}){
    return(
        <div id='settings'>
            <h3>Pomodoro Timer</h3>
            <ValueSelect 
            idName='work'
            text='Work Time (minutes)' 
            step='5' 
            maxVal='200'
            pomProps={pomProps}
            setpomProps={setpomProps}
            />
            <ValueSelect 
            idName='break'
            text='Break Time (minutes)' 
            step='5' 
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
            <p>Alarm Volume: 

                
                <input type='range' min={0} max={100} value={alarmVolume} onChange={(e) => {
                    let value = parseInt(e.target.value);
                    setAlVol(value)}}
                    style={{paddingLeft: '2px', paddingRight: '2px'}}
                    ></input>
                                <button 
                    style={{padding:'0px'}}
                    onClick={() => {
                    const alarm = new Audio('/src/sounds/alarm.mp3');
                    alarm.volume = alarmVolume / 100
                    alarm.play()
                }}>🔊</button>
            </p>
                
            <div className='action'><button onClick= {() => {setpomActive(true);}}>Start</button></div>
        </div>
    )
    }

function Timer({   
    alarmVolume, 
    setpomActive,
    pomProps,
}){
    const [pomPhase, setpomPhase] = useState('Work')
    const [round, setRound] = useState(1)
    const [key, setKey] = useState(0);
    const timeMultiplier = 60000; //Default 60000
    const [startTime, setStartTime] = useState(Date.now() + (pomProps.work * timeMultiplier))
    const alarm = new Audio('/src/sounds/alarm.mp3');
        alarm.volume = alarmVolume / 100;
    const timerRef = useRef(null);
    const [pauseText, setPauseText] = useState('Pause')
    const renderer = ({ minutes, seconds, completed }) => { 
        return <h2 style={{fontSize:'6rem', fontVariantNumeric:'tabular-nums', userSelect:'none'}}>
        {zeroPad(minutes)}:{zeroPad(seconds)}
        </h2>;
    };

    const completed = () => {
        alarm.play();
        setTimeout(() => {
            if (pomPhase == 'Work' && round < pomProps.rounds){
                setpomPhase('Break')
                setStartTime(Date.now() + pomProps.break * timeMultiplier);
                setKey(k => k + 1);

            } else if (pomPhase == 'Break'){
                setpomPhase('Work');
                setStartTime(Date.now() + pomProps.work * timeMultiplier);
                setRound(r => r + 1);
                setKey(k => k + 1);
            } else {
                console.log('Finished!')
            }
        }, 1000)


    }

    return(
        <div id='timer'>
                <h3>{pomPhase} {round}/{pomProps.rounds}</h3>
                <Countdown
                date={startTime}
                renderer={renderer}
                onComplete={completed}
                key={key}
                ref={timerRef}
                />
                
                <div className='action'>
                {/* <button>Pause</button> */}
                <button onClick={() => {
                    const timer = timerRef.current.getApi()
                    if (timer.isPaused()){
                        timer.start()
                        setPauseText('Pause')
                    }else{timer.pause(); setPauseText('Unpause')}

                    }}>{pauseText}</button>
                <button onClick={() => {setpomActive(false)}}>Cancel</button>
                
                </div>
        </div>
    )
  }

function Pomodoro (){
    const [alarmVolume, setAlVol] = useState(75);
    const [pomActive, setpomActive] = useState(false)
    const [pomProps, setpomProps] = useState({
        work : 0,
        break : 0,
        rounds : 0,
    })

    return(
        <DraggableContainer idName='pomodoropanel'>
            {!pomActive && <Settings 
            alarmVolume={alarmVolume}
            setAlVol={setAlVol}
            pomActive={pomActive}
            setpomActive={setpomActive}
            pomProps={pomProps}
            setpomProps={setpomProps}
            />}
            {pomActive && <Timer 
            alarmVolume={alarmVolume}
            setpomActive={setpomActive}
            pomProps={pomProps}
            />}
        </DraggableContainer>
    )
}

export default Pomodoro;