import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import HabitsTrackerContent from "../components/shared/HabitsTrackerContent";
import Button from "../components/ui/Button";
import SVGs from "../components/shared/SVGs";
import AddHabitPopUp from "../components/shared/AddHabitPopUp";
import { getHabit, editHabit, deleteHabit } from "../api/services/habit";
import EditHabitPopUp from "../components/shared/EditHabitPopUp";

const Habit = () => {
  const [isAddHabitPopUpVisible, setAddHabitPopUpVisible] = useState(false);
  const [isEditHabitPopUpVisible, setEditHabitPopUpVisible] = useState(false);
  const [isMorning, setMorning] = useState(true);
  const [isEvening, setEvening] = useState(false);
  const [habits, setHabits] = useState([]);
  const [habitsToEdit, setHabitsToEdit] = useState([]);

  const getHabits = async () => {
    try {
      const response = await getHabit();
      setHabits(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHabits();
  }, []);

  const handleCheckboxChange = async (id, day) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === id) {
        return { ...habit, [day]: !habit[day] };
      }
      return habit;
    });

    setHabits(updatedHabits);

    const habit = updatedHabits.find((habit) => habit.id === id);
    try {
      await editHabit(id, habit);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAddHabitPopUp = () => {
    setAddHabitPopUpVisible(!isAddHabitPopUpVisible);
  };

  const toggleEditHabitPopUp = (habit) => {
    setHabitsToEdit(habit);
    setEditHabitPopUpVisible(!isEditHabitPopUpVisible);
  };

  const morningHabits = habits.filter(
    (habit) => habit.time_of_day === "morning"
  );
  const eveningHabits = habits.filter(
    (habit) => habit.time_of_day === "evening"
  );

  return (
    <>
      <MainLayout>
        <div className="flex flex-col min-h-screen justify-start items-center gap-5 px-5 pb-16 bg-HomeBG bg-cover bg-no-repeat">
          <div className="flex flex-row w-full h-auto justify-between items-center bg-cust-pink-lighter rounded-2xl py-7 px-16 bg-opacity-30 backdrop-blur-xl drop-shadow-2xl border-[1px] border-cust-white">
            <div className="flex flex-col w-1/4 justify-center items-start font-bold text-3xl">
              Your Routines
            </div>
            <div className="flex flex-row w-1/4 justify-end items-center font-bold text-3xl gap-10">
              2
              <Button
                className={"flex flex-row justify-center items-center gap-3"}
                type={"button"}
                variation={"primary-smallest"}
                onClick={() => toggleAddHabitPopUp()}
              >
                <SVGs.PlusCircle fillColor="#FAFAFA" />
                <div>Add</div>
              </Button>
            </div>
          </div>
          <div className="flex flex-row w-full h-full justify-between items-stretch gap-5">
            <div className="flex flex-col w-1/2 justify-start items-center bg-cust-white bg-opacity-30 backdrop-blur-xl py-5 px-16 rounded-2xl gap-5 drop-shadow-2xl border-[1px] border-cust-white">
              <div className="text-3xl font-bold w-full">Morning</div>
              <div className="flex flex-col w-full justify-between items-center gap-3">
                {morningHabits.length > 0 ? (
                  habits
                    .filter((habit) => habit.time_of_day === "morning")
                    .map((habit) => (
                      <HabitsTrackerContent
                        key={habit.id}
                        label={habit.name}
                        monday={habit.monday}
                        tuesday={habit.tuesday}
                        wednesday={habit.wednesday}
                        thursday={habit.thursday}
                        friday={habit.friday}
                        saturday={habit.saturday}
                        sunday={habit.sunday}
                        onChange={(e) =>
                          handleCheckboxChange(habit.id, e.target.name)
                        }
                        onClick={() => toggleEditHabitPopUp(habit)}
                      />
                    ))
                ) : (
                  <div>No routinity found</div>
                )}
              </div>
              <hr className="w-full h-[2px] bg-cust-black rounded-full" />
              <Button
                type={"button"}
                className={
                  "flex flex-row justify-center items-center gap-3 self-start hover:text-cust-pink-normal"
                }
                onClick={() => {
                  setMorning(true);
                  setEvening(false);
                  toggleAddHabitPopUp();
                }}
              >
                <SVGs.PlusCircle />
                Add Habit
              </Button>
            </div>
            <div className="flex flex-col w-1/2 justify-start items-center bg-cust-white bg-opacity-30 backdrop-blur-xl py-5 px-16 rounded-2xl gap-5 drop-shadow-2xl border-[1px] border-cust-white">
              <div className="text-3xl font-bold w-full">Evening</div>
              <div className="flex flex-col w-full justify-between items-center gap-3">
                {eveningHabits.length > 0 ? (
                  habits
                    .filter((habit) => habit.time_of_day === "evening")
                    .map((habit) => (
                      <HabitsTrackerContent
                        key={habit.id}
                        label={habit.name}
                        monday={habit.monday}
                        tuesday={habit.tuesday}
                        wednesday={habit.wednesday}
                        thursday={habit.thursday}
                        friday={habit.friday}
                        saturday={habit.saturday}
                        sunday={habit.sunday}
                        onChange={(e) =>
                          handleCheckboxChange(habit.id, e.target.name)
                        }
                        onClick={() => toggleEditHabitPopUp(habit)}
                      />
                    ))
                ) : (
                  <div>No routinity found</div>
                )}
              </div>
              <hr className="w-full h-[2px] bg-cust-black rounded-full" />
              <Button
                type={"button"}
                className={
                  "flex flex-row justify-center items-center gap-3 self-start hover:text-cust-pink-normal"
                }
                onClick={() => {
                  setMorning(false);
                  setEvening(true);
                  toggleAddHabitPopUp();
                }}
              >
                <SVGs.PlusCircle />
                Add Habit
              </Button>
            </div>
          </div>
        </div>
      </MainLayout>
      {isAddHabitPopUpVisible && (
        <AddHabitPopUp
          toggleAddHabitPopUp={toggleAddHabitPopUp}
          Morning={isMorning}
          Evening={isEvening}
        />
      )}
      {isEditHabitPopUpVisible && habitsToEdit && (
        <EditHabitPopUp
          habitId={habitsToEdit.id}
          toggleEditHabitPopUp={toggleEditHabitPopUp}
          initialHabitData={habitsToEdit}
        />
      )}
    </>
  );
};

export default Habit;
