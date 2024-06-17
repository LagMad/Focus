import React from "react";

const HabitsTrackerContent = ({
  label,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
  onChange,
  onClick,
}) => {
  return (
    <div className="flex flex-row w-full">
      <div className="w-1/3 text-left cursor-pointer hover:text-cust-pink-light transition-all duration-300" onClick={onClick}>
        {label}
      </div>
      <div className="flex flex-row w-2/3 justify-end items-center gap-3">
        <input
          className={`appearance-none h-6 w-6 border-4 border-cust-black outline-none cursor-pointer ${
            monday ? "checked:bg-cust-blue-light" : ""
          }`}
          type="checkbox"
          name="monday"
          checked={monday}
          onChange={onChange}
        />
        <input
          className={`appearance-none h-6 w-6 border-4 border-cust-black outline-none cursor-pointer ${
            tuesday ? "checked:bg-cust-blue-light" : ""
          }`}
          type="checkbox"
          name="tuesday"
          checked={tuesday}
          onChange={onChange}
        />
        <input
          className={`appearance-none h-6 w-6 border-4 border-cust-black outline-none cursor-pointer ${
            wednesday ? "checked:bg-cust-blue-light" : ""
          }`}
          type="checkbox"
          name="wednesday"
          checked={wednesday}
          onChange={onChange}
        />
        <input
          className={`appearance-none h-6 w-6 border-4 border-cust-black outline-none cursor-pointer ${
            thursday ? "checked:bg-cust-blue-light" : ""
          }`}
          type="checkbox"
          name="thursday"
          checked={thursday}
          onChange={onChange}
        />
        <input
          className={`appearance-none h-6 w-6 border-4 border-cust-black outline-none cursor-pointer ${
            friday ? "checked:bg-cust-blue-light" : ""
          }`}
          type="checkbox"
          name="friday"
          checked={friday}
          onChange={onChange}
        />
        <input
          className={`appearance-none h-6 w-6 border-4 border-cust-black outline-none cursor-pointer ${
            saturday ? "checked:bg-cust-blue-light" : ""
          }`}
          type="checkbox"
          name="saturday"
          checked={saturday}
          onChange={onChange}
        />
        <input
          className={`appearance-none h-6 w-6 border-4 border-cust-black outline-none cursor-pointer ${
            sunday ? "checked:bg-cust-blue-light" : ""
          }`}
          type="checkbox"
          name="sunday"
          checked={sunday}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default HabitsTrackerContent;
