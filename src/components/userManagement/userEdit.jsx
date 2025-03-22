import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

const defaultOfficerObject = {
  name: "",
  phone: ["", ""],
  email: "",
  post: "",
  division: "Choose Division",
};

const UserEdit = ({
  applyChangesFunc,
  closeFunc,
  officerObject = defaultOfficerObject,
}) => {
  const [editedOfficer, setEditedOfficer] = useState(officerObject);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOfficer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (index, value) => {
    const newPhone = [...editedOfficer.phone];
    newPhone[index] = value;
    setEditedOfficer((prev) => ({
      ...prev,
      phone: newPhone,
    }));
  };

  const handleSubmit = () => {
    applyChangesFunc(editedOfficer);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-bgSecondary rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-semibold text-tBase">
            {" "}
            {officerObject === defaultOfficerObject
              ? " Add User"
              : "Edit User"}{" "}
          </h2>
          <button
            className="text-gray-400 hover:text-tBase"
            onClick={closeFunc}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex">
          <div>
            <div className="flex flex-col">
                <div className="flex flex-col items-center mr-6">
              <div className="h-32 w-32 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-4xl text-tBase font-semibold">
                {editedOfficer.name.charAt(0) || "U"}
              </div>
              <button className="mt-4 bg-blue-600 w-48 hover:bg-blue-700 text-tBase py-2 px-4 rounded-md transition duration-200">
                Change Profile Picture
              </button>
              </div>
              <div className="flex flex-col mt-4">
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Division
                    </label>
                    <select
                        name="division"
                        className="w-48 bg-primary text-tBase rounded-md py-2 px-4  focus:outline-none focus:ring-2 focus:ring-secondary"
                        value={editedOfficer.division}
                        onChange={handleChange}
                    >
                        <option value="Choose Division" disabled>
                        Choose Division
                        </option>
                        <option value="DIGHI-ALANDI">DIGHI-ALANDI</option>
                        <option value="CHAKAN">CHAKAN</option>
                        <option value="PIMPRI">PIMPRI</option>
                    </select>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editedOfficer.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className="w-full bg-primary text-tBase rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div className="flex flex-row gap-5">
                <div className="flex flex-col gap-1">
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Contact info
                  </label>
                  <input
                    type="text"
                    value={editedOfficer.phone[0]}
                    onChange={(e) => handlePhoneChange(0, e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full bg-primary text-tBase rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <input
                    type="text"
                    value={editedOfficer.phone[1]}
                    onChange={(e) => handlePhoneChange(1, e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full bg-primary text-tBase rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Post
                  </label>
                  <input
                    type="text"
                    name="post"
                    value={editedOfficer.post}
                    onChange={handleChange}
                    placeholder="Enter post"
                    className="w-full bg-primary text-tBase rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  E-mail
                </label>
                <input
                  type="text"
                  name="email"
                  value={editedOfficer.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full bg-primary text-tBase rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              {/* Add other fields here if needed */}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-tBase py-2 px-4 rounded-md transition duration-200"
            onClick={() => handleSubmit({editedOfficer})}
          >
            Apply Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
};
export default UserEdit;
