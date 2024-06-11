import React from "react";
import Button from "../ui/Button";
import SVGs from "./SVGs";

const Notes = ({ title, description }) => {
  return (
    <div className="flex flex-col w-1/2 justify-center items-center bg-cust-white p-5 gap-3 rounded-2xl">
      <div className="text-xl font-bold w-full">{title}</div>
      <hr className="w-full h-[2px] bg-cust-black rounded-full opacity-30" />
      <div className="text-xs text-justify">
        {description}
      </div>
      <Button
        className={"self-end"}
        type={"button"}
        variation={"secondary-circle"}
        onClick={() => alert("Click!")}
      >
        <SVGs.Pen />
      </Button>
    </div>
  );
};

export default Notes;
