import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import SVGs from "./SVGs";
import { editHabit, deleteHabit } from "../../api/services/habit";

const EditHabitPopUp = ({
  habitId,
  toggleEditHabitPopUp,
  initialHabitData,
}) => {
  const [statusPopUp, setStatusPopUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [habitData, setHabitData] = useState(initialHabitData);
  const [isMorning, setMorning] = useState(habitData.time_of_day === "morning");
  const [isEvening, setEvening] = useState(habitData.time_of_day === "evening");

  const handleEdit = async () => {
    try {
      const response = await editHabit(habitId, habitData);
      setTimeout(() => {
        toggleEditHabitPopUp();
      }, 1000);
      window.location.reload();
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 500 || status === 400) {
          setErrorMessage("Email sudah terdaftar!");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault()

    try {
      const response = await deleteHabit(habitId);
      setStatusPopUp(true);
      toggleEditHabitPopUp();
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
  };

  useEffect(() => {
    if (isMorning) {
      setHabitData({ ...habitData, time_of_day: "morning" });
    }
  }, [isMorning]);

  useEffect(() => {
    if (isEvening) {
      setHabitData({ ...habitData, time_of_day: "evening" });
    }
  }, [isEvening]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-10 backdrop-blur-sm">
      {isMorning && (
        <form className="flex flex-col w-1/3 bg-white drop-shadow-2xl rounded-xl justify-center items-center p-8 gap-10">
          <div className="flex flex-row w-full justify-center items-center gap-5">
            <Button
              type={"button"}
              variation={
                isMorning ? "primary-smallest" : "primary-smallest-alt"
              }
              value={"morning"}
              onClick={() => {
                setMorning(true);
                setEvening(false);
                setHabitData({ ...habitData, time_of_day: "morning" });
              }}
            >
              Morning
            </Button>
            <Button
              type={"button"}
              variation={
                isEvening ? "primary-smallest" : "primary-smallest-alt"
              }
              value={"evening"}
              onClick={() => {
                setMorning(false);
                setEvening(true);
                setHabitData({ ...habitData, time_of_day: "evening" });
              }}
            >
              Evening
            </Button>
          </div>
          <Input
            className="border-b-2 rounded-none border-b-cust-blue-light text-2xl px-0"
            placeholder="Add Morning Task Title"
            value={habitData.name}
            onChange={(e) =>
              setHabitData({ ...habitData, name: e.target.value })
            }
          />
          <div className="flex flex-row justify-between items-center w-full gap-5">
            <Button onClick={handleDelete}>
              <SVGs.Trash />
            </Button>
            <div className="flex flex-row justify-end items-center w-full gap-5">
              <Button
                type={"button"}
                variation={"secondary-alt"}
                onClick={() => toggleEditHabitPopUp()}
              >
                Cancel
              </Button>
              <Button
                type={"button"}
                variation={"secondary"}
                onClick={() => handleEdit()}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      )}

      {isEvening && (
        <form className="flex flex-col w-1/3 bg-white drop-shadow-2xl rounded-xl justify-center items-center p-8 gap-10">
          <div className="flex flex-row w-full justify-center items-center gap-5">
            <Button
              type={"button"}
              variation={
                isMorning ? "primary-smallest" : "primary-smallest-alt"
              }
              value={"morning"}
              onClick={() => {
                setMorning(true);
                setEvening(false);
                setHabitData({ ...habitData, time_of_day: "morning" });
              }}
            >
              Morning
            </Button>
            <Button
              type={"button"}
              variation={
                isEvening ? "primary-smallest" : "primary-smallest-alt"
              }
              value={"evening"}
              onClick={() => {
                setMorning(false);
                setEvening(true);
                setHabitData({ ...habitData, time_of_day: "evening" });
              }}
            >
              Evening
            </Button>
          </div>
          <Input
            className="border-b-2 rounded-none border-b-cust-blue-light text-2xl px-0"
            placeholder="Add Evening Task Title"
            value={habitData.name}
            onChange={(e) =>
              setHabitData({ ...habitData, name: e.target.value })
            }
          />
          <div className="flex flex-row justify-between items-center w-full gap-5">
            <Button onClick={handleDelete}>
              <SVGs.Trash />
            </Button>
            <div className="flex flex-row justify-end items-center w-full gap-5">
              <Button
                type={"button"}
                variation={"secondary-alt"}
                onClick={toggleEditHabitPopUp}
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
        </form>
      )}
    </div>
  );
};

export default EditHabitPopUp;
