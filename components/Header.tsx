import React from "react";

export default function Header() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] sm:w-[60%] md:w-[50%] ">
        {/* text logo */}
        <div className="flex">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-pink-900">
            Pomodoro
          </h1>
        </div>
      </div>
    </div>
  );
}
