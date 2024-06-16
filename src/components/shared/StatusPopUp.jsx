import React from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import SVGs from "./SVGs";

const StatusPopUp = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-10 backdrop-blur-sm">
      <div className="flex flex-col w-1/3 bg-white drop-shadow-2xl rounded-xl justify-center items-center p-8 gap-10">
        <div className="text-5xl font-bold text-green-600">
        Success!
        </div>
      </div>
    </div>
  );
};

export default StatusPopUp;
