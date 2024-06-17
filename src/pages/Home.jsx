import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/ui/Button";
import SVGs from "../components/shared/SVGs";
import Input from "../components/ui/Input";
import HabitsTrackerContent from "../components/shared/HabitsTrackerContent";
import Note from "../components/shared/Note";
import AddAgendaPopUp from "../components/shared/AddAgendaPopUp";
import AddNotesPopUp from "../components/shared/AddNotesPopUp";
import AddTaskPopUp from "../components/shared/AddTaskPopUp";
import AddHabitPopUp from "../components/shared/AddHabitPopUp";
import EditTaskPopUp from "../components/shared/EditTaskPopUp";
import { getAgenda } from "../api/services/agenda";
import { deleteNote, getNote } from "../api/services/notes";
import { getToDo, editToDo, deleteToDo } from "../api/services/todo";
import AgendaCard from "../components/shared/AgendaCard";
import EditAgendaPopUp from "../components/shared/EditAgendaPopUp";
import { getHabit, editHabit, deleteHabit } from "../api/services/habit";
import EditHabitPopUp from "../components/shared/EditHabitPopUp";
import EditNotesPopUp from "../components/shared/EditNotesPopUp";

const Home = () => {
  const [isAddAgendaPopUpVisible, setAddAgendaPopUpVisible] = useState(false);
  const [isAddNotesPopUpVisible, setAddNotesPopUpVisible] = useState(false);
  const [isAddTaskPopUpVisible, setAddTaskPopUpVisible] = useState(false);
  const [isAddHabitPopUpVisible, setAddHabitPopUpVisible] = useState(false);
  const [isEditNotesPopUpVisible, setEditNotesPopUpVisible] = useState(false);
  const [isEditTaskPopUpVisible, setEditTaskPopUpVisible] = useState(false);
  const [isEditAgendaPopUpVisible, setEditAgendaPopUpVisible] = useState(false);
  const [isEditHabitPopUpVisible, setEditHabitPopUpVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [toDos, setToDos] = useState([]);
  const [toDosToEdit, setToDosToEdit] = useState(null);
  const [agendas, setAgendas] = useState([]);
  const [todayAgendas, setTodayAgendas] = useState([]);
  const [upcomingAgendas, setUpcomingAgendas] = useState([]);
  const [agendaToEdit, setAgendaToEdit] = useState(null);
  const [isMorning, setMorning] = useState(true);
  const [isEvening, setEvening] = useState(false);
  const [habits, setHabits] = useState([]);
  const [habitsToEdit, setHabitsToEdit] = useState([]);

  const getNotes = async () => {
    try {
      const response = await getNote();
      setNotes(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getToDos = async () => {
    try {
      const response = await getToDo();
      setToDos(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToDos();
  }, []);

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

  useEffect(() => {
    getNotes();
  }, []);

  const handleCheckboxChangeToDo = async (id) => {
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

  const handleDeleteNote = async (noteId) => {
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

  const getAgendas = async () => {
    try {
      const response = await getAgenda();
      setAgendas(response);
      separateAgendas(response);
    } catch (error) {
      console.error("Error fetching agendas:", error);
    }
  };

  useEffect(() => {
    getAgendas();
  }, []);

  useEffect(() => {
    getAgendas();
  }, []);

  const separateAgendas = (agendas) => {
    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }); // Get current date in local time zone format (MM/DD/YYYY for US locale)

    const todayAgendas = agendas.filter((agenda) => {
      const agendaDate = new Date(agenda.start_time.split(" ")[0]);
      return (
        agendaDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }) === today
      );
    });

    const upcomingAgendas = agendas.filter((agenda) => {
      const agendaDate = new Date(agenda.start_time.split(" ")[0]);
      return (
        agendaDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }) !== today
      );
    });

    setTodayAgendas(todayAgendas);
    setUpcomingAgendas(upcomingAgendas);
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const toggleEditTaskPopUp = (todo) => {
    setToDosToEdit(todo);
    setEditTaskPopUpVisible(!isEditTaskPopUpVisible);
  };

  const toggleAddAgendaPopUp = () => {
    setAddAgendaPopUpVisible(!isAddAgendaPopUpVisible);
  };

  const toggleAddNotesPopUp = () => {
    setAddNotesPopUpVisible(!isAddNotesPopUpVisible);
  };

  const toggleEditNotesPopUp = (note) => {
    setNoteToEdit(note);
    setEditNotesPopUpVisible(!isEditNotesPopUpVisible);
  };

  const toggleAddTaskPopUp = () => {
    setAddTaskPopUpVisible(!isAddTaskPopUpVisible);
  };

  const toggleAddHabitPopUp = () => {
    setAddHabitPopUpVisible(!isAddHabitPopUpVisible);
  };

  const toggleEditAgendaPopUp = (agenda) => {
    setAgendaToEdit(agenda);
    setEditAgendaPopUpVisible(!isEditAgendaPopUpVisible);
  };

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

  const handleCheckboxChangeHabits = async (id, day) => {
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

  const toggleEditHabitPopUp = (habit) => {
    setHabitsToEdit(habit);
    setEditHabitPopUpVisible(!isEditHabitPopUpVisible);
  };

  const pinnedNotes = notes.filter((note) => note.pinned);
  const otherNotes = notes.filter((note) => !note.pinned);

  const morningHabits = habits.filter(
    (habit) => habit.time_of_day === "morning"
  );
  const eveningHabits = habits.filter(
    (habit) => habit.time_of_day === "evening"
  );

  return (
    <>
      <MainLayout>
        <div className="flex flex-col min-h-screen justify-start items-center gap-5 px-5 pb-16 bg-HomeBG bg-cover">
          <div className="flex flex-row w-full h-auto justify-center items-center bg-cust-pink-lighter rounded-2xl py-5 px-16 bg-opacity-30 backdrop-blur-xl drop-shadow-2xl border-[1px] border-cust-white">
            <div className="flex flex-col w-1/4 justify-center items-start">
              <div className="text-3xl font-bold">Hi, Andrea</div>
              <div className="text-lg">Today's Summary</div>
            </div>
            <div className="flex flex-col w-1/4 justify-center items-center">
              <div className="text-3xl font-bold">
                {todayAgendas.length + upcomingAgendas.length}
              </div>
              <div className="text-lg">Upcoming Events</div>
            </div>
            <div className="flex flex-col w-1/4 justify-center items-center">
              <div className="text-3xl font-bold">
                {toDos.filter((todo) => !todo.completed).length}
              </div>
              <div className="text-lg">To Do Lists</div>
            </div>
            <div className="flex flex-col w-1/4 justify-center items-center">
              <div className="text-3xl font-bold">2</div>
              <div className="text-lg">Habits Left</div>
            </div>
          </div>
          <div className="flex flex-row w-full h-full justify-center items-stretch gap-5">
            <div className="flex flex-col w-3/5 justify-start items-center bg-cust-blue-lighter bg-opacity-30 backdrop-blur-xl py-5 px-16 rounded-2xl drop-shadow-2xl border-[1px] border-cust-white gap-5">
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
              <div className="flex flex-col justify-start items-center gap-8 w-full">
                <div className="flex flex-col w-full justify-start items-center gap-5">
                  <div className="flex w-full text-cust-grey">Today</div>
                  <div className="grid grid-cols-3 justify-start items-center w-full gap-5">
                    {todayAgendas.map((agenda) => (
                      <AgendaCard
                        key={agenda.id}
                        title={agenda.title}
                        start_time={agenda.start_time}
                        end_time={agenda.end_time}
                        description={agenda.description}
                        onClick={() => toggleEditAgendaPopUp(agenda)}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col w-full justify-start items-center gap-5">
                  <div className="flex w-full text-cust-grey">Upcoming</div>
                  <div className="grid grid-cols-3 justify-start items-center w-full gap-5">
                    {upcomingAgendas.map((agenda) => (
                      <AgendaCard
                        key={agenda.id}
                        title={agenda.title}
                        start_time={agenda.start_time}
                        end_time={agenda.end_time}
                        description={agenda.description}
                        onClick={() => toggleEditAgendaPopUp(agenda)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-2/5 justify-start items-center bg-cust-white bg-opacity-30 backdrop-blur-xl py-5 px-16 rounded-2xl gap-10 drop-shadow-2xl border-[1px] border-cust-white">
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
                            onChange={() => handleCheckboxChangeToDo(todo.id)}
                            onClickDelete={() => handleDeleteNote(todo.id)}
                            onClick={() => toggleEditTaskPopUp(todo)}
                            checked={todo.completed}
                          >
                            {todo.title}
                          </Input>
                        ))
                    ) : (
                      <div>
                        Looks like you're free this time. Have a good day,
                        Champ!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full h-full justify-center items-stretch gap-5">
            <div className="flex flex-col w-1/2 justify-start items-center bg-cust-white bg-opacity-30 backdrop-blur-xl py-5 px-16 rounded-2xl gap-5 drop-shadow-2xl border-[1px] border-cust-white">
              <div className="text-3xl font-bold w-full">Habits Tracker</div>
              <div className="flex flex-col w-full justify-between items-center gap-3">
                {morningHabits.length > 0 ? (
                  habits.map((habit) => (
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
                        handleCheckboxChangeHabits(habit.id, e.target.name)
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
              <div className="grid grid-cols-2 w-full justify-between items-center gap-5">
                {pinnedNotes.length > 0 ? (
                  pinnedNotes.map((note) => (
                    <Note
                      key={note.id}
                      title={note.title}
                      content={note.content}
                      pinned={note.pinned}
                      onClick={() => handleDeleteNote(note.id)}
                      onEdit={() => toggleEditNotesPopUp(note)}
                    />
                  ))
                ) : otherNotes.length > 0 ? (
                  otherNotes.map((note) => (
                    <Note
                      key={note.id}
                      title={note.title}
                      content={note.content}
                      pinned={note.pinned}
                      onClick={() => handleDeleteNote(note.id)}
                      onEdit={() => toggleEditNotesPopUp(note)}
                    />
                  ))
                ) : (
                  <div className="text-center w-full self-center">
                    No notes found. Go write some notes, Champ!
                  </div>
                )}
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
      {isEditAgendaPopUpVisible && agendaToEdit && (
        <EditAgendaPopUp
          toggleEditAgendaPopUp={() => toggleEditAgendaPopUp(null)}
          agendaId={agendaToEdit.id}
          initialAgendaData={agendaToEdit}
        />
      )}
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
      {isAddTaskPopUpVisible && (
        <AddTaskPopUp
          toggleAddTaskPopUp={toggleAddTaskPopUp}
          toggleAddAgendaPopUp={toggleAddAgendaPopUp}
        />
      )}
      {isEditTaskPopUpVisible && toDosToEdit && (
        <EditTaskPopUp
          toDoId={toDosToEdit.id}
          toggleEditTaskPopUp={toggleEditTaskPopUp}
          initialTaskData={toDosToEdit}
        />
      )}
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

export default Home;
