import React, { useEffect, useState } from 'react'

const Timer = ({expTime}) => {

    const[secText, setSecText] = useState("0");
    const [hourText, setHourText] = useState("0");
    const [minText, setMinText] = useState("0");

    let millisecs = 0;
    let timerID;
    let initialTime;

    let seconds;
    let minutes;
    let hours;

    useEffect(()=> {
        startStopWatch();
    }, [])

    function startStopWatch() {
        millisecs += expTime;
        initialTime = millisecs;
        timerID = setInterval(()=>timerLoop(), 1000);
    }

    function stopTimer() {
        clearInterval(timerID);
    }

    function resetStopWatch() {
        initialTime = Date.now() + expTime; 
        updateTimer();
    }

    function timerLoop() {
        if(millisecs > 0) updateTimer();
        else stopTimer();
    }

    function updateTimer() {
        millisecs = initialTime - Date.now();
        seconds = millisecs/1000;
        minutes = seconds/60;
        hours = minutes/60;
        
        setSecText((Math.floor(seconds % 60)).toString().padStart(2, "0"));
        setMinText((Math.floor(minutes % 60)).toString().padStart(2, "0"));
        setHourText((Math.floor(hours)).toString());
    }

    return (
        <div className="de_countdown">{`${hourText}h ${minText}m ${secText}s`}</div>
    )
}

export default Timer
