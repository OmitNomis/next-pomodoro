"use client";
import React, { FC } from "react";
import { CustomModal } from "./modal/CustomModal";
interface HeaderProps {
  isRunning: boolean;
}
export const Header: FC<HeaderProps> = ({ isRunning }) => {
  const onLogoClick = () => {
    if (isRunning) {
      return;
    }
    window.location.href = "/";
  };
  return (
    <div className="w-full flex justify-center items-center mb-8 mt-8">
      <div className="w-[90%] sm:w-[60%] md:w-[50%] ">
        <div className="flex">
          <h1
            onClick={onLogoClick}
            className="text-3xl sm:text-3xl md:text-5xl font-bold text-pink-900 cursor-pointer">
            Pomodoro
          </h1>
        </div>
      </div>
    </div>
  );
};
