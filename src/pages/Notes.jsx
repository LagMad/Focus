import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import Note from "../components/shared/Note";
import { getNote, deleteNote } from "../api/services/notes";
import Button from "../components/ui/Button";
import SVGs from "../components/shared/SVGs";
import AddNotesPopUp from "../components/shared/AddNotesPopUp";
import EditNotesPopUp from "../components/shared/EditNotesPopUp";

const Notes = () => {
  const [isAddNotesPopUpVisible, setAddNotesPopUpVisible] = useState(false);
  const [isEditNotesPopUpVisible, setEditNotesPopUpVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const getNotes = async () => {
    try {
      const response = await getNote();
      setNotes(response);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAddNotesPopUp = () => {
    setAddNotesPopUpVisible(!isAddNotesPopUpVisible);
  };

  const toggleEditNotesPopUp = (note) => {
    setNoteToEdit(note);
    setEditNotesPopUpVisible(!isEditNotesPopUpVisible);
  };

  useEffect(() => {
    getNotes();
  }, []);

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

  const pinnedNotes = notes.filter(note => note.pinned);
  const otherNotes = notes.filter(note => !note.pinned);

  return (
    <>
      <MainLayout>
        <div className="flex flex-col min-h-screen justify-start items-center gap-5 px-5 pb-16 bg-HomeBG bg-cover bg-no-repeat">
          <div className="flex flex-row w-full h-auto justify-between items-center bg-cust-pink-lighter rounded-2xl py-7 px-16 bg-opacity-30 backdrop-blur-xl drop-shadow-2xl border-[1px] border-cust-white">
            <div className="flex flex-col w-1/4 justify-center items-start font-bold text-3xl">
              Take Notes
            </div>
            <Button
              className={"flex flex-row justify-center items-center gap-3"}
              type={"button"}
              variation={"primary-smallest"}
              onClick={toggleAddNotesPopUp}
            >
              <SVGs.PlusCircle fillColor="#FAFAFA" />
              <div>Add</div>
            </Button>
          </div>

          <div className="flex flex-col w-full h-auto justify-start items-center gap-5">
            <div className="flex w-full pl-16 text-cust-grey">Pinned</div>
            <div className="grid grid-cols-4 w-full h-auto justify-start items-start gap-5">
              {pinnedNotes.length > 0 ? (
                pinnedNotes.map((note) => (
                  <Note
                    key={note.id}
                    title={note.title}
                    content={note.content}
                    pinned={note.pinned}
                    onEdit={() => toggleEditNotesPopUp(note)}
                    onClick={() => handleDelete(note.id)}
                  />
                ))
              ) : (
                <div className="text-center w-full">No pinned notes</div>
              )}
            </div>
          </div>

          <div className="flex flex-col w-full h-auto justify-start items-start gap-5">
            <div className="flex w-full pl-16 text-cust-grey">Others</div>
            <div className="grid grid-cols-4 w-full h-auto justify-start items-center gap-5">
              {otherNotes.length > 0 ? (
                otherNotes.map((note) => (
                  <Note
                    key={note.id}
                    title={note.title}
                    content={note.content}
                    pinned={note.pinned}
                    onEdit={() => toggleEditNotesPopUp(note)}
                    onClick={() => handleDelete(note.id)}
                  />
                ))
              ) : (
                <div className="text-center w-full self-center">No notes found. Go write some notes, Champ!</div>
              )}
            </div>
          </div>
        </div>
      </MainLayout>

      {isAddNotesPopUpVisible && (
        <AddNotesPopUp toggleAddNotesPopUp={toggleAddNotesPopUp} />
      )}

      {isEditNotesPopUpVisible && noteToEdit && (
        <EditNotesPopUp
          toggleEditNotesPopUp={() => toggleEditNotesPopUp(null)}
          noteId={noteToEdit.id}
          initialNoteData={noteToEdit}
        />
      )}
    </>
  );
};

export default Notes;
