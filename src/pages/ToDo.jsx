import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/ui/Button";
import SVGs from "../components/shared/SVGs";
import Input from "../components/ui/Input";
import AddTaskPopUp from "../components/shared/AddTaskPopUp";
import AddAgendaPopUp from "../components/shared/AddAgendaPopUp";

const ToDo = () => {
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
              Your Tasks
            </div>
            <div className="flex flex-col w-1/4 justify-center items-center font-bold text-3xl">
              3
            </div>
          </div>
          <div className="flex flex-row w-full h-auto justify-between items-center gap-5">
            <div className="flex flex-col w-1/2 h-full justify-center items-center bg-cust-white bg-opacity-30 backdrop-blur-xl py-5 px-16 rounded-2xl gap-10 drop-shadow-2xl border-[1px] border-cust-white">
              <div className="flex flex-row w-full justify-between items-center">
                <div className="text-3xl font-bold">To Do List</div>
                <Button
                  type={"button"}
                  variation={"secondary-circle"}
                  onClick={() => toggleAddTaskPopUp()}
                >
                  <SVGs.PlusCircle fillColor="#FAFAFA" />
                </Button>
              </div>
              <div className="flex flex-col w-full justify-start items-center">
                <div className="flex flex-col w-full justify-start items-center gap-3">
                  <Input className="rounded-full" type="checkbox">
                    Bahan Rapat BEM
                  </Input>
                  <Input className="rounded-full" type="checkbox">
                    Bahan Rapat BEM
                  </Input>
                  <Input className="rounded-full" type="checkbox">
                    Bahan Rapat BEM
                  </Input>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-1/2 h-full justify-center items-center bg-cust-white bg-opacity-30 backdrop-blur-xl py-5 px-16 rounded-2xl gap-10 drop-shadow-2xl border-[1px] border-cust-white">
              <div className="flex flex-row w-full justify-between items-center">
                <div className="text-3xl font-bold">Completed</div>
                <Button
                  type={"button"}
                  variation={"secondary-circle"}
                  onClick={() => toggleAddTaskPopUp()}
                >
                  <SVGs.PlusCircle fillColor="#FAFAFA" />
                </Button>
              </div>
              <div className="flex flex-col w-full justify-start items-center">
                <div className="flex flex-col w-full justify-start items-center gap-3">
                  <Input className="rounded-full" type="checkbox">
                    Bahan Rapat BEM
                  </Input>
                  <Input className="rounded-full" type="checkbox">
                    Bahan Rapat BEM
                  </Input>
                  <Input className="rounded-full" type="checkbox">
                    Bahan Rapat BEM
                  </Input>
                </div>
              </div>
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

export default ToDo;
