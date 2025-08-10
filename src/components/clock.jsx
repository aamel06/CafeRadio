import { useState , useEffect} from 'react';
import DraggableContainer from './draggable_panel';

function Clock(){

    const [time, setTime] = useState('00:00');

    function refreshTime(){
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        h = addZero(h);
        m = addZero(m);
        setTime(`${h}:${m}`);
        setTimeout(refreshTime, 1000);
    }

    function addZero(i){
        if (i < 10) { i = '0' + i};
        return i;
    }

    useEffect(() => {refreshTime()}, []);

    return(
        <DraggableContainer idName='clockpanel'>
            <h2>{time}</h2>
        </DraggableContainer>
    )
}

export default Clock;