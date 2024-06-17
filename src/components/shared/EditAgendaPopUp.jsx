import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import SVGs from "./SVGs";
import { deleteAgenda, editAgenda } from "../../api/services/agenda";
import { useNavigate } from "react-router-dom";

const EditAgendaPopUp = ({
  agendaId,
  toggleEditAgendaPopUp,
  initialAgendaData,
}) => {
  const navigate = useNavigate();
  const [statusPopUp, setStatusPopUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}:${month}:${year}`;
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const initialFormData = {
    ...initialAgendaData,
    start_date: formatDate(initialAgendaData.start_time),
    start_time: formatTime(initialAgendaData.start_time),
    end_date: formatDate(initialAgendaData.end_time),
    end_time: formatTime(initialAgendaData.end_time),
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const formatDateTime = (dateStr, timeStr) => {
    const [day, month, year] = dateStr.split(":");
    return `${year}-${month}-${day} ${timeStr}`;
  };

  const handleEdit = async (e) => {
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
      const response = await editAgenda(agendaId, {
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

  const handleDelete = async (agendaId) => {
    try {
      const response = await deleteAgenda(agendaId);
      setTimeout(() => {
        setStatusPopUp(true);
      }, 1000);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete note:", error);
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
            onClick={() => navigate("/todo")}
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
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <div className="flex flex-col w-full justify-start items-center gap-5">
          <div className="flex flex-row w-full justify-start items-center gap-3">
            <SVGs.Start />
            <div className="flex flex-row w-full justify-start items-center gap-3">
              <Input
                className="font-medium text-lg px-0 py-0 rounded-none"
                placeholder={"Add start date (DD:MM:YYYY)..."}
                value={formData.start_date}
                onChange={(e) =>
                  setFormData({ ...formData, start_date: e.target.value })
                }
              />
              <Input
                className="font-medium text-lg px-0 py-0 rounded-none"
                placeholder={"Add start time (HH:mm)..."}
                value={formData.start_time}
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
                value={formData.end_date}
                onChange={(e) =>
                  setFormData({ ...formData, end_date: e.target.value })
                }
              />
              <Input
                className="font-medium text-lg px-0 py-0 rounded-none"
                placeholder={"Add end time (HH:mm)..."}
                value={formData.end_time}
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
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center w-full gap-5">
          <Button onClick={() => handleDelete(agendaId)}>
            <SVGs.Trash/>
          </Button>
          <div className="flex flex-row justify-end items-center gap-5 w-full">
            <Button
              type={"button"}
              variation={"secondary-alt"}
              onClick={() => toggleEditAgendaPopUp()}
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
    </div>
  );
};

export default EditAgendaPopUp;
