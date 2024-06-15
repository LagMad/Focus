import React, { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import SVGs from "./SVGs";

const AddHabitPopUp = ({ toggleAddHabitPopUp }) => {
  const [isMorning, setMorning] = useState(true);
  const [isEvening, setEvening] = useState(false);

  const toggleMorning = () => {
    setMorning(!isMorning);
  };

  const toggleEvening = () => {
    setEvening(!isEvening);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-10 backdrop-blur-sm">
      {/* MORNING */}
      {isMorning && (
        <form className="flex flex-col w-1/3 bg-white drop-shadow-2xl rounded-xl justify-center items-center p-8 gap-10">
          <div className="flex flex-row w-full justify-center items-center gap-5">
            <Button
              type={"button"}
              variation={
                isMorning ? "primary-smallest" : "primary-smallest-alt"
              }
              onClick={() => {
                toggleEvening();
                toggleMorning();
              }}
            >
              Morning
            </Button>
            <Button
              type={"button"}
              variation={
                isEvening ? "primary-smallest" : "primary-smallest-alt"
              }
              onClick={() => {
                toggleMorning();
                toggleEvening();
              }}
            >
              Evening
            </Button>
          </div>
          <Input
            className="border-b-2 rounded-none border-b-cust-blue-light text-2xl px-0"
            placeholder="Add Morning Task Title"
          />
          <div className="flex flex-col w-full justify-start items-center gap-5">
            <div className="flex flex-row w-full justify-start items-start gap-3">
              <SVGs.Description />
              <Input type="textarea" placeholder="Add description..." />
            </div>
          </div>
          <div className="flex flex-row justify-end items-center w-full gap-5">
            <Button
              type={"button"}
              variation={"secondary-alt"}
              onClick={() => toggleAddHabitPopUp()}
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
        </form>
      )}

      {/* EVENING */}
      {isEvening && (
        <form className="flex flex-col w-1/3 bg-white drop-shadow-2xl rounded-xl justify-center items-center p-8 gap-10">
          <div className="flex flex-row w-full justify-center items-center gap-5">
            <Button
              type={"button"}
              variation={
                isMorning ? "primary-smallest" : "primary-smallest-alt"
              }
              onClick={() => {
                toggleEvening();
                toggleMorning();
              }}
            >
              Morning
            </Button>
            <Button
              type={"button"}
              variation={
                isEvening ? "primary-smallest" : "primary-smallest-alt"
              }
              onClick={() => {
                toggleMorning();
                toggleEvening();
              }}
            >
              Evening
            </Button>
          </div>
          <Input
            className="border-b-2 rounded-none border-b-cust-blue-light text-2xl px-0"
            placeholder="Add Evening Task Title"
          />
          <div className="flex flex-col w-full justify-start items-center gap-5">
            <div className="flex flex-row w-full justify-start items-start gap-3">
              <SVGs.Description />
              <Input type="textarea" placeholder="Add description..." />
            </div>
          </div>
          <div className="flex flex-row justify-end items-center w-full gap-5">
            <Button
              type={"button"}
              variation={"secondary-alt"}
              onClick={() => toggleAddHabitPopUp()}
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
        </form>
      )}
    </div>
  );
};

export default AddHabitPopUp;
