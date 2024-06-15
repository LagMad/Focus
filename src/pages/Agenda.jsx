import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/ui/Button";
import SVGs from "../components/shared/SVGs";
import AddAgendaPopUp from "../components/shared/AddAgendaPopUp";
import AddTaskPopUp from "../components/shared/AddTaskPopUp";

const Agenda = () => {
  const [isAddAgendaPopUpVisible, setAddAgendaPopUpVisible] = useState(false);
  const [isAddTaskPopUpVisible, setAddTaskPopUpVisible] = useState(false);

  const toggleAddAgendaPopUp = () => {
    setAddAgendaPopUpVisible(!isAddAgendaPopUpVisible);
  };

  const toggleAddTaskPopUp = () => {
    setAddTaskPopUpVisible(!isAddTaskPopUpVisible);
  };

  return (
    <>
      <MainLayout>
        <div className="flex flex-col min-h-screen justify-start items-center gap-5 px-5 pb-16 bg-HomeBG bg-cover bg-no-repeat">
          <div className="flex flex-row w-full h-auto justify-between items-center bg-cust-pink-lighter rounded-2xl py-7 px-16 bg-opacity-30 backdrop-blur-xl drop-shadow-2xl border-[1px] border-cust-white">
            <div className="flex flex-col w-1/4 justify-center items-start font-bold text-3xl">
              Your Calender
            </div>
            <div className="flex flex-col w-1/4 justify-center items-end font-bold text-3xl">
              Sunday, 16 June 2024
            </div>
          </div>
          <div className="flex flex-col w-full justify-start items-center bg-cust-blue-lighter bg-opacity-30 backdrop-blur-xl py-5 px-16 rounded-2xl drop-shadow-2xl border-[1px] border-cust-white">
            <div className="flex flex-row w-full justify-between items-center">
              <div className="text-3xl font-bold">Agenda</div>
              <Button
                className={"flex flex-row justify-center items-center gap-3"}
                type={"button"}
                variation={"primary-smallest"}
                onClick={() => toggleAddAgendaPopUp()}
              >
                <SVGs.PlusCircle fillColor="#FAFAFA" />
                <div>Add</div>
              </Button>
            </div>
          </div>
        </div>
      </MainLayout>
      {isAddAgendaPopUpVisible && (
        <AddAgendaPopUp
          toggleAddAgendaPopUp={toggleAddAgendaPopUp}
          toggleAddTaskPopUp={toggleAddTaskPopUp}
        />
      )}
      {isAddTaskPopUpVisible && (
        <AddTaskPopUp
          toggleAddTaskPopUp={toggleAddTaskPopUp}
          toggleAddAgendaPopUp={toggleAddAgendaPopUp}
        />
      )}
    </>
  );
};

export default Agenda;
