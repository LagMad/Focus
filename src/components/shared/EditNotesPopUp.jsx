import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import SVGs from "./SVGs";
import StatusPopUp from "./StatusPopUp";
import { editNote, deleteNote } from "../../api/services/notes";

const EditNotesPopUp = ({ noteId, toggleEditNotesPopUp, initialNoteData }) => {
  const [isPinned, setIsPinned] = useState(initialNoteData.pinned);
  const [statusPopUp, setStatusPopUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [note, setNote] = useState(initialNoteData);

  const handlePinClick = () => {
    setIsPinned(!isPinned);
    setNote({ ...note, pinned: !isPinned });
  };

  const handleEdit = async () => {
    try {
      const response = await editNote(noteId, note);
      setTimeout(() => {
        setStatusPopUp(true);
      }, 1000);
      window.location.reload();
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 500 || status === 400) {
          setErrorMessage("An error occurred. Please try again.");
        }
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    }
  };

  const handleDelete = async (noteId) => {
    try {
      const response = await deleteNote(noteId);
      setTimeout(() => {
        setStatusPopUp(true);
      }, 1000);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-10 backdrop-blur-sm">
        <div className="flex flex-col w-1/3 bg-white drop-shadow-2xl rounded-xl justify-center items-center p-8 gap-5">
          <div className="flex flex-row w-full justify-between items-center gap-3">
            <Input
              className="border-b-2 rounded-none border-b-cust-blue-light text-2xl px-0 py-1"
              placeholder="Add Title"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
            <Button
              className={"flex items-center"}
              type={"button"}
              onClick={handlePinClick}
            >
              <SVGs.Pin fill={isPinned ? "#ED5CBA" : "none"} />
            </Button>
          </div>
          <Input
            className={"text-[16px] font-medium"}
            type="textarea"
            placeholder="Add note..."
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
          />
          <div className="flex flex-row justify-between items-center w-full gap-5">
            <Button
              type={"button"}
              variation={"delete"}
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </Button>
            <div className="flex flex-row justify-end items-centerw-full gap-5">
              <Button
                type={"button"}
                variation={"secondary-alt"}
                onClick={() => toggleEditNotesPopUp()}
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
      {statusPopUp && <StatusPopUp />}
    </>
  );
};

export default EditNotesPopUp;
