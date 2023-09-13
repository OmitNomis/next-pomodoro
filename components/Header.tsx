import React, { FC, useState } from "react";
import { CustomModal } from "./modal/CustomModal";

interface HeaderProps {
  canReset: () => boolean;
}

export const Header: FC<HeaderProps> = ({ canReset }) => {
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const onLogoClick = () => {
    if (canReset()) {
      setAlertModalVisible(true);
      return;
    }
    reloadWindow();
  };

  const reloadWindow = () => {
    window.location.href = "/";
  };

  const handleResetClick = () => {
    // Implement your reset logic here
    console.log("Reset button clicked!");
  };

  const handleSettingsClick = () => {
    // Implement your settings logic here
    console.log("Settings button clicked!");
  };

  return (
    <>
      <div className="flex w-full justify-center items-center mb-8 mt-8">
        <div className="w-[90%] sm:w-[60%] md:w-[50%">
          <div className="flex justify-around">
            <h1
              onClick={onLogoClick}
              className="text-3xl sm:text-3xl md:text-5xl font-bold text-pink-900 cursor-pointer">
              Pomodoro
            </h1>
            <button
              className="px-4 py-2 bg-purple-700 text-white rounded-lg text-lg sm:text-xl hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              onClick={handleSettingsClick}>
              Settings
            </button>
          </div>
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
    </>
  );
};
