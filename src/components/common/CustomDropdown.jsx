import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Clock, XCircle, ChevronDown, Loader, AlertTriangle } from "lucide-react";

const CustomDropdown = ({ defaultValue, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
        //onChange(defaultValue);
    });

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const getIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4 mr-2 text-yellow-400" />;
      case "In Progress":
        return <Loader className="w-4 h-4 mr-2 text-blue-400 animate-spin" />;
      case "Resolved":
        return <CheckCircle className="w-4 h-4 mr-2 text-green-400" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 mr-2 text-red-400" />;
      case "Review":
        return <Clock className="w-4 h-4 mr-2 text-purple-400" />;
      case "Hold":
        return <Clock className="w-4 h-4 mr-2 text-orange-400" />;
      case "Awaiting Approval":
        return <Clock className="w-4 h-4 mr-2 text-teal-400" />;
      case "Escalated":
        return <AlertTriangle className="w-4 h-4 mr-2 text-pink-400" />;
      case "Closed":
        return <CheckCircle className="w-4 h-4 mr-2 text-gray-400" />;
      case "Processing":
        return <Loader className="w-4 h-4 mr-2 text-cyan-400 animate-spin" />;
      case "Needs Info":
        return <Clock className="w-4 h-4 mr-2 text-brown-400" />;
      case "New":
        return <CheckCircle className="w-4 h-4 mr-2 text-indigo-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-48">
      <button
        onClick={toggleDropdown}
        className="w-full flex items-center justify-between px-3 py-2 bg-gray-900/90 backdrop-blur-lg text-white rounded-md border border-gray-600 shadow-sm hover:bg-gray-800/90 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-sm"
      >
        <div className="flex items-center">
          {getIcon(value)}
          <span className="font-medium">{value || "Select"}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1 bg-gray-900/90 backdrop-blur-lg border border-gray-700 rounded-md shadow-lg overflow-hidden"
          >
            {options.map((option) => (
              <motion.li
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionClick(option.value)}
                className={`flex items-center px-3 py-2 transition-all duration-150 cursor-pointer text-sm hover:bg-opacity-80
                  ${option.value === "Pending" ? "hover:bg-yellow-600" :
                  option.value === "In Progress" ? "hover:bg-blue-600" :
                  option.value === "Resolved" ? "hover:bg-green-600" :
                  option.value === "Rejected" ? "hover:bg-red-600" :
                  option.value === "Review" ? "hover:bg-purple-600" :
                  option.value === "Hold" ? "hover:bg-orange-600" :
                  option.value === "Awaiting Approval" ? "hover:bg-teal-600" :
                  option.value === "Escalated" ? "hover:bg-pink-600" :
                  option.value === "Closed" ? "hover:bg-gray-600" :
                  option.value === "Processing" ? "hover:bg-cyan-600" :
                  option.value === "Needs Info" ? "hover:bg-brown-600" :
                  option.value === "New" ? "hover:bg-indigo-600" :
                  "hover:bg-gray-600"}`}
              >
                {getIcon(option.value)}
                <span className="text-white font-medium">{option.label}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDropdown;