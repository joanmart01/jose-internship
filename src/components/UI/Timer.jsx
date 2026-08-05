import React, { useEffect, useRef, useState } from 'react'

const Timer = ({expTime}) => {

    const[secText, setSecText] = useState("0");
    const [hourText, setHourText] = useState("0");
    const [minText, setMinText] = useState("0");
    const timerRef = useRef(null);

    let milliseconds = 10;
    let seconds;
    let minutes;
    let hours;

    useEffect(()=> {
        if(expTime > Date.now()) {
            const timerID = setInterval(() => {
                if(milliseconds > 0) updateTimer();
            }, 1000)
            return ()=> clearInterval(timerID);
        }
    }, [])

    function updateTimer() {
        milliseconds = expTime - Date.now();
        if(milliseconds<0) return;
        seconds = milliseconds/1000;
        minutes = seconds/60;
        hours = minutes/60;
        
        if(timerRef.current) {
            setSecText((Math.floor(seconds % 60)).toString().padStart(2, "0"));
            setMinText((Math.floor(minutes % 60)).toString().padStart(2, "0"));
            setHourText((Math.floor(hours)).toString());
        }
    }

    return (
        <div ref={timerRef} className="de_countdown">{`${hourText}h ${minText}m ${secText}s`}</div>
    )
}

export default Timer
