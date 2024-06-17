import React, { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import SVGs from "./SVGs";
import StatusPopUp from "./StatusPopUp";
import { addToDo } from "../../api/services/todo";

const AddTaskPopUp = ({ toggleAddTaskPopUp, toggleAddAgendaPopUp }) => {
  const [statusPopUp, setStatusPopUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    completed: false,
  });

  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split(":");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = formData.date ? formatDate(formData.date) : null;
    const deadline =
      formattedDate && formData.time
        ? `${formattedDate}T${formData.time}:00`
        : null;

    try {
      const response = await addToDo({
        ...formData,
        deadline,
      });
      setTimeout(() => {
        toggleStatusPopUp();
      }, 1000);
      window.location.reload();
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 422) {
          setErrorMessage(
            data.errors.deadline
              ? "The deadline field must be a valid date."
              : "An error occurred. Please try again."
          );
        } else if (status === 500 || status === 400) {
          setErrorMessage("An error occurred. Check your input and try again.");
        }
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    }
  };

  const toggleStatusPopUp = () => {
    setStatusPopUp(!statusPopUp);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-10 backdrop-blur-sm">
        <div className="flex flex-col w-1/3 bg-white drop-shadow-2xl rounded-xl justify-center items-center p-8 gap-10">
          <div className="flex flex-row w-full justify-center items-center gap-5">
            <Button
              type={"button"}
              variation={"primary-smallest-alt"}
              onClick={() => {
                toggleAddTaskPopUp();
                toggleAddAgendaPopUp();
              }}
            >
              Agenda
            </Button>
            <Button type={"button"} variation={"primary-smallest"}>
              Task
            </Button>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}
          <Input
            className="border-b-2 rounded-none border-b-cust-blue-light text-2xl px-0"
            placeholder="Add Task Title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <div className="flex flex-col w-full justify-start items-center gap-5">
            <div className="flex flex-row w-full justify-start items-center gap-3">
              <SVGs.Date />
              <Input
                className="font-medium text-lg px-0 py-0 rounded-none"
                placeholder={"Add date (DD:MM:YYYY)..."}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
            <div className="flex flex-row w-full justify-start items-center gap-3">
              <SVGs.Time />
              <Input
                className="font-medium text-lg px-0 py-0 rounded-none"
                placeholder={"Add time (HH:MM)..."}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-row justify-end items-center w-full gap-5">
            <Button
              type={"button"}
              variation={"secondary-alt"}
              onClick={() => toggleAddTaskPopUp()}
            >
              Cancel
            </Button>
            <Button
              type={"button"}
              variation={"secondary"}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      {statusPopUp && <StatusPopUp />}
    </>
  );
};

export default AddTaskPopUp;
