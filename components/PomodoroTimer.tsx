"use client";

import React, { useState } from "react";
import { Header } from "./Header";
import { Timer } from "./Timer";

export default function PomodoroTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [hasRunOnce, setHasRunOnce] = useState(false);

  const handleRunState = () => {
    setHasRunOnce(true);
  };

  const canReset = () => {
    if (hasRunOnce) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Header canReset={canReset} />
      <Timer
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        changeRunState={handleRunState}
      />
    </>
  );
}
