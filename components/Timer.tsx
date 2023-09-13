"use client";
import React, { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";

type SessionTypeProp = "work" | "break" | "longBreak";
type tabsProp = "Work" | "Break" | "Long Break";
export const Timer: FC = () => {
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
  const [isRunning, setIsRunning] = useState(false);
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
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 p-8">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center space-x-4 mb-6">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`p-2 sm:p-4 cursor-pointer text-lg sm:text-xl rounded-md ${
                currentTab === tab
                  ? "bg-purple-600 text-white"
                  : "bg-purple-200 hover:bg-purple-300 text-purple-900"
              }`}
              onClick={() => changeTab(tab)}>
              {tab}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center space-y-4">
          {/* Iteration number */}
          <div className="text-2xl sm:text-3xl text-gray-800">{`Iteration #${iterationCount}`}</div>

          {/* Timer */}
          <motion.div
            className="text-4xl sm:text-5xl font-bold text-purple-600"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}>
            {formatTime(currentTime)}
          </motion.div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              className="px-6 py-3 bg-purple-700 text-white rounded-full text-lg sm:text-xl hover:bg-purple-600"
              onClick={startStop}>
              Start/Stop
            </button>
            <button
              className="px-6 py-3 bg-purple-500 text-white rounded-full text-lg sm:text-xl hover:bg-purple-400"
              onClick={next}>
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
