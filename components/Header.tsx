"use client";
import React, { FC, useState } from "react";
import { CustomModal } from "./modal/CustomModal";
interface HeaderProps {
  isRunning: boolean;
}
export const Header: FC<HeaderProps> = ({ isRunning }) => {
  const [alertModalVisible, setAlertModalVisible] = useState(false);

  const onLogoClick = () => {
    if (isRunning) {
      setAlertModalVisible(true);
      return;
    }
    reloadWindow();
  };

  const reloadWindow = () => {
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
      <CustomModal
        isOpen={alertModalVisible}
        onAction={() => {
          reloadWindow();
        }}
        onClose={() => setAlertModalVisible(false)}
        title="Are you sure you want to reload?"
        content="Your current progress will be lost."
      />
    </div>
  );
};
