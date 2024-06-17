import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import SVGs from "./SVGs";
import StatusPopUp from "./StatusPopUp";
import { editToDo } from "../../api/services/todo";
import { useNavigate } from "react-router-dom";

const EditTaskPopUp = ({
  toDoId,
  toggleEditTaskPopUp,
  initialTaskData,
}) => {
    const navigate = useNavigate()
  const [statusPopUp, setStatusPopUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState(initialTaskData);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    // Extract date and time from formData.deadline when component mounts or formData changes
    if (formData.deadline) {
      const [datePart, timePart] = formData.deadline.split(" ");
      const [year, month, day] = datePart.split("-");
      
      // Format date as "DD:MM:YYYY"
      setDate(`${day}:${month}:${year}`);
      
      // Format time as "HH:MM"
      const [hours, minutes] = timePart.split(":").slice(0, 2);
      setTime(`${hours}:${minutes}`);
    }
  }, [formData]);

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, completed: e.target.checked });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return null; // Handle empty date case

    const [day, month, year] = dateStr.split(":");
    return `${year}-${month}-${day}`;
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    // Separate date and time from formData
    const { date, time, ...otherFormData } = formData;

    // Format date and time into ISO format if both are present
    const formattedDate = date ? formatDate(date) : null;
    const deadline =
      formattedDate && time ? `${formattedDate}T${time}:00` : null;

    try {
      const response = await editToDo(toDoId, {
        ...otherFormData,
        deadline,
      });
      setTimeout(() => {
        toggleStatusPopUp();
      }, 2000);
      window.location.reload()
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
                navigate("/agenda")
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
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <div className="flex flex-col w-full justify-start items-center gap-5">
            <div className="flex flex-row w-full justify-start items-center gap-3">
              <SVGs.Date />
              <Input
                className="font-medium text-xl px-0 py-0 rounded-none"
                placeholder={"Add date (DD:MM:YYYY)..."}
                value={date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
            <div className="flex flex-row w-full justify-start items-center gap-3">
              <SVGs.Time />
              <Input
                className="font-medium text-xl px-0 py-0 rounded-none"
                placeholder={"Add time (HH:MM)..."}
                value={time}
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
              onClick={() => toggleEditTaskPopUp()}
            >
              Cancel
            </Button>
            <Button
              type={"button"}
              variation={"secondary"}
              onClick={handleEdit}
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

export default EditTaskPopUp;
