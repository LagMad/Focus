import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/ui/Button";
import SVGs from "../components/shared/SVGs";
import Input from "../components/ui/Input";
import AddTaskPopUp from "../components/shared/AddTaskPopUp";

import { getToDo, editToDo, deleteToDo } from "../api/services/todo";
import EditTaskPopUp from "../components/shared/EditTaskPopUp";

const ToDo = () => {
  const [isAddTaskPopUpVisible, setAddTaskPopUpVisible] = useState(false);
  const [isEditTaskPopUpVisible, setEditTaskPopUpVisible] = useState(false);
  const [toDos, setToDos] = useState([]);
  const [toDosToEdit, setToDosToEdit] = useState(null);

  useEffect(() => {
    getToDos();
  }, []);

  const getToDos = async () => {
    try {
      const response = await getToDo();
      setToDos(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = async (id) => {
    const updatedToDos = toDos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setToDos(updatedToDos);

    const toDo = updatedToDos.find((todo) => todo.id === id);
    try {
      await editToDo(id, toDo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      const response = await deleteToDo(noteId);
      setTimeout(() => {
        setStatusPopUp(true);
      }, 1000);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const toggleAddTaskPopUp = () => {
    setAddTaskPopUpVisible(!isAddTaskPopUpVisible);
  };

  const toggleEditTaskPopUp = (todo) => {
    setToDosToEdit(todo);
    setEditTaskPopUpVisible(!isEditTaskPopUpVisible);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const formattedDate = `${time} ${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <>
      <MainLayout>
        <div className="flex flex-col min-h-screen justify-start items-center gap-5 px-5 pb-16 bg-HomeBG bg-cover bg-no-repeat">
          <div className="flex flex-row w-full h-auto justify-between items-center bg-cust-pink-lighter rounded-2xl py-7 px-16 bg-opacity-30 backdrop-blur-xl drop-shadow-2xl border-[1px] border-cust-white">
            <div className="flex flex-row w-1/4 justify-start items-start font-bold text-3xl">
              Your Tasks
            </div>
            <div className="flex flex-row w-1/4 justify-end items-center font-bold text-3xl gap-10">
              {toDos.filter((todo) => !todo.completed).length +
                ` / ` +
                toDos.length}
              <Button
                className={"flex flex-row justify-center items-center gap-3"}
                type={"button"}
                variation={"primary-smallest"}
                onClick={toggleAddTaskPopUp}
              >
                <SVGs.PlusCircle fillColor="#FAFAFA" />
                <div>Add</div>
              </Button>
            </div>
          </div>
          <div className="flex flex-row w-full h-auto justify-between items-stretch gap-5">
            <div className="flex flex-col w-1/2 h-full justify-center items-center bg-cust-white bg-opacity-30 backdrop-blur-xl py-5 px-16 rounded-2xl gap-10 drop-shadow-2xl border-[1px] border-cust-white">
              <div className="flex flex-row w-full justify-between items-center">
                <div className="text-3xl font-bold">To Do List</div>
                {/* <Button
                  type={"button"}
                  variation={"secondary-circle"}
                  onClick={() => toggleAddTaskPopUp()}
                >
                  <SVGs.PlusCircle fillColor="#FAFAFA" />
                </Button> */}
              </div>
              <div className="flex flex-col w-full justify-start items-center">
                <div className="flex flex-col w-full justify-start items-center gap-3">
                  {toDos.filter((todo) => !todo.completed).length > 0 ? (
                    toDos
                      .filter((todo) => !todo.completed)
                      .map((todo) => (
                        <Input
                          key={todo.id}
                          className="rounded-full"
                          type="checkbox"
                          deadline={formatDate(todo.deadline)}
                          onChange={() => handleCheckboxChange(todo.id)}
                          onClickDelete={() => handleDelete(todo.id)}
                          onClick={() => toggleEditTaskPopUp(todo)}
                          checked={todo.completed}
                        >
                          {todo.title}
                        </Input>
                      ))
                  ) : (
                    <div>
                      Looks like you're free this time. Have a good day, Champ!
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-1/2 h-full justify-center items-center bg-cust-white bg-opacity-30 backdrop-blur-xl py-5 px-16 rounded-2xl gap-10 drop-shadow-2xl border-[1px] border-cust-white">
              <div className="flex flex-row w-full justify-between items-center">
                <div className="text-3xl font-bold">Completed</div>
                {/* <Button
                  type={"button"}
                  variation={"secondary-circle"}
                  onClick={() => toggleAddTaskPopUp()}
                >
                  <SVGs.PlusCircle fillColor="#FAFAFA" />
                </Button> */}
              </div>
              <div className="flex flex-col w-full justify-start items-center">
                <div className="flex flex-col w-full justify-start items-center gap-3">
                  {toDos.filter((todo) => todo.completed).length > 0 ? (
                    toDos
                      .filter((todo) => todo.completed)
                      .map((todo) => (
                        <Input
                          key={todo.id}
                          className="rounded-full"
                          type="checkbox"
                          deadline={formatDate(todo.deadline)}
                          onChange={() => handleCheckboxChange(todo.id)}
                          onClickDelete={() => handleDelete(todo.id)}
                          onClick={toggleEditTaskPopUp}
                          checked={todo.completed}
                        >
                          {todo.title}
                        </Input>
                      ))
                  ) : (
                    <div>No task completed yet. Go get that money, Champ!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
      {isAddTaskPopUpVisible && (
        <AddTaskPopUp toggleAddTaskPopUp={toggleAddTaskPopUp} />
      )}
      {isEditTaskPopUpVisible && toDosToEdit && (
        <EditTaskPopUp
          toDoId={toDosToEdit.id}
          toggleEditTaskPopUp={toggleEditTaskPopUp}
          initialTaskData={toDosToEdit}
        />
      )}
    </>
  );
};

export default ToDo;
