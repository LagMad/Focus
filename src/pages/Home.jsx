import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/ui/Button";
import SVGs from "../components/shared/SVGs";
import Input from "../components/ui/Input";
import HabitsTrackerContent from "../components/shared/HabitsTrackerContent";
import Notes from "../components/shared/Note";
import AddAgendaPopUp from "../components/shared/AddAgendaPopUp";
import AddNotesPopUp from "../components/shared/AddNotesPopUp";
import AddTaskPopUp from "../components/shared/AddTaskPopUp";

const Home = () => {
  const [isAddAgendaPopUpVisible, setAddAgendaPopUpVisible] = useState(false);
  const [isAddNotesPopUpVisible, setAddNotesPopUpVisible] = useState(false);
  const [isAddTaskPopUpVisible, setAddTaskPopUpVisible] = useState(false);

  const toggleAddAgendaPopUp = () => {
    setAddAgendaPopUpVisible(!isAddAgendaPopUpVisible);
  };

  const toggleAddNotesPopUp = () => {
    setAddNotesPopUpVisible(!isAddNotesPopUpVisible);
  };

  const toggleAddTaskPopUp = () => {
    setAddTaskPopUpVisible(!isAddTaskPopUpVisible);
  };

  return (
    <>
      <MainLayout>
        <div className="flex flex-col min-h-screen justify-start items-center gap-5 px-5 pb-16 bg-HomeBG bg-cover bg-no-repeat">
          <div className="flex flex-row w-full h-auto justify-center items-center bg-cust-pink-lighter rounded-2xl py-5 px-16 bg-opacity-30 backdrop-blur-xl drop-shadow-2xl border-[1px] border-cust-white">
            <div className="flex flex-col w-1/4 justify-center items-start">
              <div className="text-3xl font-bold">Hi, Andrea</div>
              <div className="text-lg">Today's Summary</div>
            </div>
            <div className="flex flex-col w-1/4 justify-center items-center">
              <div className="text-3xl font-bold">3</div>
              <div className="text-lg">Upcoming Events</div>
            </div>
            <div className="flex flex-col w-1/4 justify-center items-center">
              <div className="text-3xl font-bold">5</div>
              <div className="text-lg">To Do Lists</div>
            </div>
            <div className="flex flex-col w-1/4 justify-center items-center">
              <div className="text-3xl font-bold">2</div>
              <div className="text-lg">Habits Left</div>
            </div>
          </div>
          <div className="flex flex-row w-full h-full justify-center items-stretch gap-5">
            <div className="flex flex-col w-2/3 justify-start items-center bg-cust-blue-lighter bg-opacity-30 backdrop-blur-xl py-5 px-16 rounded-2xl drop-shadow-2xl border-[1px] border-cust-white">
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
            <div className="flex flex-col w-1/3 h-full justify-center items-center bg-cust-white bg-opacity-30 backdrop-blur-xl py-5 px-16 rounded-2xl gap-10 drop-shadow-2xl border-[1px] border-cust-white">
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
          </div>
          <div className="flex flex-row w-full h-full justify-center items-stretch gap-5">
            <div className="flex flex-col w-1/2 justify-center items-center bg-cust-white bg-opacity-30 backdrop-blur-xl py-5 px-16 rounded-2xl gap-5 drop-shadow-2xl border-[1px] border-cust-white">
              <div className="text-3xl font-bold w-full">Habits Tracker</div>
              <div className="flex flex-col w-full justify-between items-center gap-3">
                <HabitsTrackerContent label={"Wake up before 5AM"} />
                <HabitsTrackerContent label={"Baca buku 30min"} />
              </div>
              <hr className="w-full h-[2px] bg-cust-black rounded-full" />
              <Button
                type={"button"}
                className={
                  "flex flex-row justify-center items-center gap-3 self-start"
                }
                onClick={() => alert("Click!")}
              >
                <SVGs.PlusCircle />
                Add Habit
              </Button>
            </div>
            <div className="flex flex-col w-1/2 justify-start items-center bg-cust-pink-lighter bg-opacity-30 backdrop-blur-xl py-5 px-16 rounded-2xl gap-10 drop-shadow-2xl border-[1px] border-cust-white">
              <div className="flex flex-row w-full justify-between items-center">
                <div className="text-3xl font-bold">Notes</div>
                <Button
                  className={"flex flex-row justify-center items-center gap-3"}
                  type={"button"}
                  variation={"primary-smallest"}
                  onClick={() => toggleAddNotesPopUp()}
                >
                  <SVGs.PlusCircle fillColor="#FAFAFA" />
                  <div>Add</div>
                </Button>
              </div>
              <div className="flex flex-row w-full justify-between items-center gap-5">
                <Notes
                  title={"Praktikum"}
                  description={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae scelerisque velit. Nam fringilla, odio ut placerat ornare, nulla dolor ornare ex, eu cursus dolor metus non mauris. Quisque mollis orci ullamcorper arcu mollis, ut vehicula quam semper. Nunc commodo sed ante nec euismod. Praesent ornare massa non nisi varius, finibus sollicitudin ex hendrerit."
                  }
                />
                <Notes
                  title={"Praktikum"}
                  description={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae scelerisque velit. Nam fringilla, odio ut placerat ornare, nulla dolor ornare ex, eu cursus dolor metus non mauris. Quisque mollis orci ullamcorper arcu mollis, ut vehicula quam semper. Nunc commodo sed ante nec euismod. Praesent ornare massa non nisi varius, finibus sollicitudin ex hendrerit."
                  }
                />
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
      {isAddNotesPopUpVisible && (
        <AddNotesPopUp toggleAddNotesPopUp={toggleAddNotesPopUp} />
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

export default Home;
