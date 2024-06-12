import React, { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import SVGs from "./SVGs";

const AddNotesPopUp = ({ toggleAddNotesPopUp }) => {
  const [isPinned, setIsPinned] = useState(false);

  const handlePinClick = () => {
    setIsPinned(!isPinned);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-10 backdrop-blur-sm">
      <div className="flex flex-col w-1/3 bg-white drop-shadow-2xl rounded-xl justify-center items-center p-8 gap-5">
        <div className="flex flex-row w-full justify-between items-center gap-3">
          <Input
            className="border-b-2 rounded-none border-b-cust-blue-light text-2xl px-0 py-1"
            placeholder="Add Title"
          />
          <Button
            className={"flex items-center"}
            type={"button"}
            onClick={() => handlePinClick()}
          >
            <SVGs.Pin fill={isPinned ? "#ED5CBA" : "none"} />
          </Button>
        </div>
        <Input
          className={"text-[16px] font-medium"}
          type="textarea"
          placeholder="Add note..."
        />
        <div className="flex flex-row justify-end items-center w-full gap-5">
          <Button
            type={"button"}
            variation={"secondary-alt"}
            onClick={() => toggleAddNotesPopUp()}
          >
            Cancel
          </Button>
          <Button
            type={"button"}
            variation={"secondary"}
            onClick={() => alert("Click!")}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNotesPopUp;
