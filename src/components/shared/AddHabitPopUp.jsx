import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import SVGs from "./SVGs";
import { addHabit } from "../../api/services/habit";

const AddHabitPopUp = ({ toggleAddHabitPopUp, Morning, Evening }) => {
  const [isMorning, setMorning] = useState(Morning);
  const [isEvening, setEvening] = useState(Evening);
  const [errorMessage, setErrorMessage] = useState("")
  const [habitData, setHabitData] = useState({
    name: "",
    time_of_day: "",
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      const response = await addHabit(habitData);
      setTimeout(() => {
        toggleStatusPopUp();
      }, 1000);
      window.location.reload();
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 500 || status === 400) {
          setErrorMessage("Email sudah terdaftar!");
          d;
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (isMorning) {
      setHabitData({ ...habitData, time_of_day: "morning" });
      console.log("set to: ", habitData.time_of_day);
    }
  }, [isMorning]);

  useEffect(() => {
    if (isEvening) {
      setHabitData({ ...habitData, time_of_day: "evening" });
      console.log("set to: ", habitData.time_of_day);
    }
  }, [isEvening]);

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
              value={"morning"}
              onClick={(e) => {
                setMorning(true);
                setEvening(false);
                setHabitData({ ...habitData, time_of_day: e.target.value });
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
              onClick={(e) => {
                setMorning(false);
                setEvening(true);
                setHabitData({ ...habitData, time_of_day: e.target.value });
              }}
            >
              Evening
            </Button>
          </div>
          <Input
            className="border-b-2 rounded-none border-b-cust-blue-light text-2xl px-0"
            placeholder="Add Morning Task Title"
            onChange={(e) =>
              setHabitData({ ...habitData, name: e.target.value })
            }
          />
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
              onClick={handleSubmit}
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
              value={"morning"}
              onClick={(e) => {
                setMorning(true);
                setEvening(false);
                setHabitData({ ...habitData, time_of_day: e.target.value });
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
              onClick={(e) => {
                setMorning(false);
                setEvening(true);
                setHabitData({ ...habitData, time_of_day: e.target.value });
              }}
            >
              Evening
            </Button>
          </div>
          <Input
            className="border-b-2 rounded-none border-b-cust-blue-light text-2xl px-0"
            placeholder="Add Evening Task Title"
            onChange={(e) =>
              setHabitData({ ...habitData, name: e.target.value })
            }
          />
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
              onClick={handleSubmit}
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
