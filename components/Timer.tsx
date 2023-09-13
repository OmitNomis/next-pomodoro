"use client";
import React, { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";

type SessionTypeProp = "work" | "break" | "longBreak";
type tabsProp = "Work" | "Break" | "Long Break";

interface TimerProps {
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
}
export const Timer: FC<TimerProps> = ({ isRunning, setIsRunning }) => {
  // get from local storage later
  const initialValues = {
    workTime: 25 * 60,
    breakTime: 2,
    longBreakTime: 3,
    breakAfter: 4,
  };
  const tabs = ["Work", "Break", "Long Break"];
  const [currentTab, setCurrentTab] = useState("Work");
  const [currentTime, setCurrentTime] = useState(initialValues.workTime);
  const [sessionType, setSessionType] = useState<SessionTypeProp>("work");
  const [iterationCount, setIterationCount] = useState(1);

  const startStop = () => {
    setIsRunning((prevState) => !prevState);
  };

  const isLongBreak = () => {
    if (iterationCount === 0) {
      return false;
    } else if (iterationCount % initialValues.breakAfter === 0) {
      return true;
    }
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return hours === "00"
      ? `${minutes}:${seconds}`
      : `${hours}:${minutes}:${seconds}`;
  };

  const changeSessionType = (type: SessionTypeProp) => {
    setSessionType(type);
    if (type === "break") {
      switchToBreak();
    } else if (type === "longBreak") {
      switchToLongBreak();
    } else {
      switchToWork();
    }
  };
  const switchToLongBreak = () => {
    setSessionType("longBreak");
    setCurrentTime(initialValues.longBreakTime);
    setCurrentTab("Long Break");
  };
  const switchToBreak = () => {
    setSessionType("break");
    setCurrentTime(initialValues.breakTime);
    setCurrentTab("Break");
  };
  const switchToWork = () => {
    setSessionType("work");
    setIterationCount((prevState) => prevState + 1);
    setCurrentTime(initialValues.workTime);
    setCurrentTab("Work");
  };

  const changeTab = (tab: tabsProp) => {
    setCurrentTab(tab);
    if (tab === "Work") {
      switchToWork();
    } else if (tab === "Break") {
      switchToBreak();
    } else {
      switchToLongBreak();
    }
  };

  const next = () => {
    setIsRunning(false);
    if (sessionType === "work") {
      isLongBreak()
        ? changeSessionType("longBreak")
        : changeSessionType("break");
    } else {
      changeSessionType("work");
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            next();
            return prevTime;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, sessionType, iterationCount]);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 p-8">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center space-x-4 mb-6">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`flex-1 p-2 sm:p-4 cursor-pointer text-lg sm:text-xl rounded-md text-center ${
                currentTab === tab
                  ? "bg-purple-600 text-white"
                  : "bg-purple-200 hover:bg-purple-300 text-purple-900"
              }`}
              onClick={() => changeTab(tab)}
              style={{ minHeight: "3rem" }} // Set a minimum height for tabs
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center space-y-4">
          {/* Iteration number */}
          <div className="text-2xl sm:text-3xl text-gray-800">{`Iteration #${iterationCount}`}</div>

          {/* Timer */}
          <div className="text-6xl sm:text-8xl font-bold text-purple-600">
            {formatTime(currentTime)}
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              className="px-8 py-3 bg-purple-700 text-white rounded-lg text-lg sm:text-xl hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              onClick={startStop}
              style={{ width: "10rem" }} // Increase button width
            >
              <motion.div initial={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
                {isRunning ? "Stop" : "Start"}
              </motion.div>
            </button>
            <button
              className="px-8 py-3 bg-purple-500 text-white rounded-lg text-lg sm:text-xl hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              onClick={next}
              style={{ width: "10rem" }} // Increase button width
            >
              <motion.div initial={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
                Skip
              </motion.div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
