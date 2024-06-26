import React, { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import SVGs from "./SVGs";
import { addAgenda } from "../../api/services/agenda";

const AddAgendaPopUp = ({ toggleAddAgendaPopUp, toggleAddTaskPopUp }) => {
  const [statusPopUp, setStatusPopUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    description: "",
  });

  const formatDateTime = (dateStr, timeStr) => {
    const [day, month, year] = dateStr.split(":");
    return `${year}-${month}-${day} ${timeStr}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedStartTime =
      formData.start_date && formData.start_time
        ? formatDateTime(formData.start_date, formData.start_time)
        : null;
    const formattedEndTime =
      formData.end_date && formData.end_time
        ? formatDateTime(formData.end_date, formData.end_time)
        : null;

    try {
      const response = await addAgenda({
        ...formData,
        start_time: formattedStartTime,
        end_time: formattedEndTime,
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
            data.errors.start_time || data.errors.end_time
              ? "The start time and end time must be valid date-time values."
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
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-10 backdrop-blur-sm">
      <div className="flex flex-col w-2/5 bg-white drop-shadow-2xl rounded-xl justify-center items-center p-8 gap-10">
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
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}
        <Input
          className="border-b-2 rounded-none border-b-cust-blue-light text-2xl px-0"
          placeholder="Add Agenda Title"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <div className="flex flex-col w-full justify-start items-center gap-5">
          <div className="flex flex-row w-full justify-start items-center gap-3">
            <SVGs.Start />
            <div className="flex flex-row w-full justify-start items-center gap-3">
              <Input
                className="font-medium text-lg px-0 py-0 rounded-none"
                placeholder={"Add start date (DD:MM:YYYY)..."}
                onChange={(e) =>
                  setFormData({ ...formData, start_date: e.target.value })
                }
              />
              <Input
                className="font-medium text-lg px-0 py-0 rounded-none"
                placeholder={"Add start time (HH:mm)..."}
                onChange={(e) =>
                  setFormData({ ...formData, start_time: e.target.value })
                }
              />
            </div>
          </div>
          <hr className="bg-cust-black h-[2px] w-full opacity-30" />
          <div className="flex flex-row w-full justify-start items-center gap-3">
            <SVGs.End />
            <div className="flex flex-row w-full justify-start items-center gap-3">
              <Input
                className="font-medium text-lg px-0 py-0 rounded-none"
                placeholder={"Add end date (DD:MM:YYYY)..."}
                onChange={(e) =>
                  setFormData({ ...formData, end_date: e.target.value })
                }
              />
              <Input
                className="font-medium text-lg px-0 py-0 rounded-none"
                placeholder={"Add end time (HH:mm)..."}
                onChange={(e) =>
                  setFormData({ ...formData, end_time: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-row w-full justify-start items-start gap-3">
            <SVGs.Description />
            <Input
              type="textarea"
              placeholder="Add description..."
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
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
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddAgendaPopUp;
