"use client";

import React, { useState } from "react";
import { Header } from "./Header";
import { Timer } from "./Timer";

export default function PomodoroTimer() {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <>
      <Header isRunning />
      <Timer isRunning={isRunning} setIsRunning={setIsRunning} />
    </>
  );
}
