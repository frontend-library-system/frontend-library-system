import React from "react";
import { useLocation } from "react-router-dom";
import { MyLibrary } from "./mylibrary";

export const  Profile=()=> {
  const { state } = useLocation(); // Retrieve state passed from navigate
  const { name, email, role } = state || {}; // Fallback in case state is undefined

  return (
      <>
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-2xl text-gray-600">
            {name ? name.charAt(0) : "?"}
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-bold text-gray-800">{name || "N/A"}</h2>
            <p className="text-gray-600">{email || "N/A"}</p>
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded mt-2">
              {role || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
    <MyLibrary/>
    </>
  );
}

