import React, { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import SVGs from "./SVGs";
import StatusPopUp from "./StatusPopUp";

import { addNote } from "../../api/services/notes";

const AddNotesPopUp = ({ toggleAddNotesPopUp }) => {
  const [isPinned, setIsPinned] = useState(false);
  const [statusPopUp, setStatusPopUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    pinned: false,
  });

  const handlePinClick = () => {
    setIsPinned(!isPinned);
    setFormData({ ...formData, pinned: !isPinned });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      const response = await addNote(formData);
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

  const toggleStatusPopUp = () => {
    setStatusPopUp(!statusPopUp);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-10 backdrop-blur-sm">
        <div className="flex flex-col w-1/3 bg-white drop-shadow-2xl rounded-xl justify-center items-center p-8 gap-5">
          <div className="flex flex-row w-full justify-between items-center gap-3">
            <Input
              className="border-b-2 rounded-none border-b-cust-blue-light text-2xl px-0 py-1"
              placeholder="Add Title"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Button
              className={"flex items-center"}
              type={"button"}
              value={isPinned}
              onClick={() => handlePinClick()}
            >
              <SVGs.Pin fill={isPinned ? "#ED5CBA" : "none"} />
            </Button>
          </div>
          <Input
            className={"text-[16px] font-medium"}
            type="textarea"
            placeholder="Add note..."
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
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
              onClick={() => handleSubmit()}
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

export default AddNotesPopUp;
