'use client'
import React, { FC, useEffect, useState } from "react";

type SessionTypeProp = 'work' | 'break' | 'longBreak';
export const Timer: FC = () => {
    const initialValues = {
        workTime: 1,
        breakTime: 2,
        longBreakTime: 3,
    }
    const [currentTime, setCurrentTime] = useState(initialValues.workTime)
    const [isRunning, setIsRunning] = useState(false)
    const [sessionType, setSessionType] = useState<SessionTypeProp>('work')
    const [iterationCount, setIterationCount] = useState(1)

    const startStop = () => {
        setIsRunning(
            (prevState) => !prevState
        )
    }

    const isLongBreak = () => {
        if (iterationCount === 0) {
            return false
        }
        else if (iterationCount % 3 === 0) {
            return true;
        }
    }


    const changeSessionType = (type: SessionTypeProp) => {
        setSessionType(type);
        if (type === 'break') {
            switchToBreak()
        }
        else if (type === 'longBreak') {
            switchToLongBreak()
        }
        else {
            switchToWork()
        }
    }
    const switchToLongBreak = () => {
        setSessionType('longBreak')
        setCurrentTime(initialValues.longBreakTime)
    }
    const switchToBreak = () => {
        setSessionType('break')
        setCurrentTime(initialValues.breakTime)
    }
    const switchToWork = () => {
        setSessionType('work')
        setIterationCount((prevState) => prevState + 1)
        setCurrentTime(initialValues.workTime)
    }

    const next = () => {
        setIsRunning(false)
        if (sessionType === 'work') {
            isLongBreak() ? changeSessionType('longBreak') : changeSessionType('break')
        }
        else {
            changeSessionType('work')
        }
    }


    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setCurrentTime((prevTime) => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    }
                    else {
                        next();
                        return prevTime;
                    }
                })
            }, 1000)
        }
        return () => clearInterval(interval)

    }, [isRunning, sessionType, iterationCount])

    return (
        <div>
            <h1>{sessionType}</h1>
            <h1>{`Iteration #${iterationCount}`}</h1>
            <h2>{Math.floor(currentTime / 60)}:{currentTime % 60 < 10 ? '0' : ''}{currentTime % 60}</h2>
            <button onClick={startStop}>{isRunning ? 'Stop' : 'Start'}</button>
            <button onClick={next}>Skip</button>
            <div>
                {sessionType !== 'work' && <button onClick={() => changeSessionType('work')}>Work</button>}
                {sessionType !== 'break' && <button onClick={() => changeSessionType('break')}>Break</button>}
                {sessionType !== 'longBreak' && <button onClick={() => changeSessionType('longBreak')}>Long Break</button>}
            </div>
        </div>
    );
}

