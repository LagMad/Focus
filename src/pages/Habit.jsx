import React from "react";
import MainLayout from "../components/layout/MainLayout";
import HabitsTrackerContent from "../components/shared/HabitsTrackerContent";
import Button from "../components/ui/Button";
import SVGs from "../components/shared/SVGs";

const Habit = () => {
  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen justify-start items-center gap-5 px-5 pb-16 bg-HomeBG bg-cover bg-no-repeat">
        <div className="flex flex-row w-full h-auto justify-between items-center bg-cust-pink-lighter rounded-2xl py-7 px-16 bg-opacity-30 backdrop-blur-xl drop-shadow-2xl border-[1px] border-cust-white">
          <div className="flex flex-col w-1/4 justify-center items-start font-bold text-3xl">
            Your Routines
          </div>
          <div className="flex flex-col w-1/4 justify-center items-center font-bold text-3xl">
            2
          </div>
        </div>
        <div className="flex flex-row w-full h-full justify-between items-center gap-5">
          <div className="flex flex-col w-1/2 h-full justify-center items-center bg-cust-white bg-opacity-30 backdrop-blur-xl py-5 px-16 rounded-2xl gap-5 drop-shadow-2xl border-[1px] border-cust-white">
            <div className="text-3xl font-bold w-full">Morning</div>
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
          <div className="flex flex-col w-1/2 h-full justify-center items-center bg-cust-white bg-opacity-30 backdrop-blur-xl py-5 px-16 rounded-2xl gap-5 drop-shadow-2xl border-[1px] border-cust-white">
            <div className="text-3xl font-bold w-full">Evening</div>
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
        </div>
      </div>
    </MainLayout>
  );
};

export default Habit;
