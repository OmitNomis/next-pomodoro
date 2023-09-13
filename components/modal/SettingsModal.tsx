import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const storedSettings = JSON.parse(localStorage.getItem("settings")) || {};
  const [settings, setSettings] = useState({
    workDuration: storedSettings.workDuration || "",
    breakDuration: storedSettings.breakDuration || "",
    longBreakDuration: storedSettings.longBreakDuration || "",
    longBreakAfter: storedSettings.longBreakAfter || "",
  });

  const handleSave = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg shadow-lg w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 p-8">
            <div className="text-2xl sm:text-3xl text-gray-800">Settings</div>
            <div className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2">
                  Work Duration (minutes):
                </label>
                <input
                  type="number"
                  placeholder="25"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={settings.workDuration}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      workDuration: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2">
                  Break Duration (minutes):
                </label>
                <input
                  placeholder="5"
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={settings.breakDuration}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      breakDuration: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2">
                  Long Break Duration (minutes):
                </label>
                <input
                  placeholder="15"
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={settings.longBreakDuration}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      longBreakDuration: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2">
                  Long Break After (iterations):
                </label>
                <input
                  placeholder="4"
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={settings.longBreakAfter}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      longBreakAfter: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 bg-purple-700 text-white rounded-lg text-lg sm:text-xl hover:bg-purple-600 mr-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
                onClick={handleSave}>
                Save
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg text-lg sm:text-xl hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={onClose}>
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
