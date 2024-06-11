import React from "react";

const HabitsTrackerContent = ({ label }) => {
  return (
    <div className="flex flex-row w-full">
      <div className="w-1/3 text-left">{label}</div>
      <div className="flex flex-row w-2/3 justify-end items-center gap-3">
        <input
          className="appearance-none h-6 w-6 border-4 border-cust-black checked:bg-cust-blue-light checked:border-cust-darker-blue outline-none cursor-pointer"
          type="checkbox"
          name="monday"
        />
        <input
          className="appearance-none h-6 w-6 border-4 border-cust-black checked:bg-cust-blue-light checked:border-cust-darker-blue outline-none cursor-pointer"
          type="checkbox"
          name="monday"
        />
        <input
          className="appearance-none h-6 w-6 border-4 border-cust-black checked:bg-cust-blue-light checked:border-cust-darker-blue outline-none cursor-pointer"
          type="checkbox"
          name="monday"
        />
        <input
          className="appearance-none h-6 w-6 border-4 border-cust-black checked:bg-cust-blue-light checked:border-cust-darker-blue outline-none cursor-pointer"
          type="checkbox"
          name="monday"
        />
        <input
          className="appearance-none h-6 w-6 border-4 border-cust-black checked:bg-cust-blue-light checked:border-cust-darker-blue outline-none cursor-pointer"
          type="checkbox"
          name="monday"
        />
        <input
          className="appearance-none h-6 w-6 border-4 border-cust-black checked:bg-cust-blue-light checked:border-cust-darker-blue outline-none cursor-pointer"
          type="checkbox"
          name="monday"
        />
        <input
          className="appearance-none h-6 w-6 border-4 border-cust-black checked:bg-cust-blue-light checked:border-cust-darker-blue outline-none cursor-pointer"
          type="checkbox"
          name="monday"
        />
      </div>
    </div>
  );
};

export default HabitsTrackerContent;
