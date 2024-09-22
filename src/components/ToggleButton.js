import React from "react";
import { useTheme } from "../context/ThemeContext";
import colors from "../theme/colors";

const ToggleButton = ({ onToggle, isActive, label }) => {
  const { isDarkMode } = useTheme();

  return (
    <label className="flex flex-col sm:flex-row items-center cursor-pointer">
      <span
        className="mb-2 sm:mr-2 sm:mb-0 text-sm sm:text-base"
        style={{
          color: isDarkMode ? colors.dark.text : colors.light.text,
        }}
      >
        {label}
      </span>
      <div className="relative">
        <input
          type="checkbox"
          className="hidden"
          checked={isActive}
          onChange={onToggle}
        />
        <div
          className="block w-8 h-4 sm:w-14 sm:h-8 rounded-full"
          style={{
            backgroundColor: isDarkMode
              ? `${colors.dark.text}50`
              : `${colors.light.text}50`,
          }}
        ></div>
        <div
          className="dot absolute left-1 top-0.5 sm:top-1 bg-white w-3 h-3 sm:w-6 sm:h-6 rounded-full transition"
          style={{
            transform: isActive ? "translateX(100%)" : "none",
          }}
        ></div>
      </div>
    </label>
  );
};

export default ToggleButton;
