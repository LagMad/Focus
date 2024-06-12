import React from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import SVGs from "./SVGs";

const AddAgendaPopUp = ({ toggleAddAgendaPopUp, toggleAddTaskPopUp }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-10 backdrop-blur-sm">
      <div className="flex flex-col w-1/3 bg-white drop-shadow-2xl rounded-xl justify-center items-center p-8 gap-10">
        <div className="flex flex-row w-full justify-center items-center gap-5">
          <Button type={"button"} variation={"primary-smallest"}>
            Agenda
          </Button>
          <Button
            type={"button"}
            variation={"primary-smallest-alt"}
            onClick={() => {
              toggleAddAgendaPopUp();
              toggleAddTaskPopUp();
            }}
          >
            Task
          </Button>
        </div>
        <Input
          className="border-b-2 rounded-none border-b-cust-blue-light text-2xl px-0"
          placeholder="Add Agenda Title"
        />
        <div className="flex flex-col w-full justify-start items-center gap-5">
          <div className="flex flex-row w-full justify-start items-center gap-3">
            <SVGs.Date />
            <Input
              className="font-medium text-xl px-0 py-0 rounded-none"
              placeholder={"Add date..."}
            />
          </div>
          <div className="flex flex-row w-full justify-start items-center gap-3">
            <SVGs.Time />
            <Input
              className="font-medium text-xl px-0 py-0 rounded-none"
              placeholder={"Add time..."}
            />
          </div>
          <div className="flex flex-row w-full justify-start items-start gap-3">
            <SVGs.Description />
            <Input type="textarea" placeholder="Add description..." />
          </div>
        </div>
        <div className="flex flex-row justify-end items-center w-full gap-5">
          <Button
            type={"button"}
            variation={"secondary-alt"}
            onClick={() => toggleAddAgendaPopUp()}
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

export default AddAgendaPopUp;
