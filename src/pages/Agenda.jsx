import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/ui/Button";
import SVGs from "../components/shared/SVGs";
import AddAgendaPopUp from "../components/shared/AddAgendaPopUp";
import AddTaskPopUp from "../components/shared/AddTaskPopUp";
import EditAgendaPopUp from "../components/shared/EditAgendaPopUp";
import EditTaskPopUp from "../components/shared/EditTaskPopUp";
import AgendaCard from "../components/shared/AgendaCard";
import { getAgenda } from "../api/services/agenda";

const Agenda = () => {
  const [isAddAgendaPopUpVisible, setAddAgendaPopUpVisible] = useState(false);
  const [isAddTaskPopUpVisible, setAddTaskPopUpVisible] = useState(false);
  const [isEditAgendaPopUpVisible, setEditAgendaPopUpVisible] = useState(false);
  const [isEditTaskPopUpVisible, setEditTaskPopUpVisible] = useState(false);
  const [agendas, setAgendas] = useState([]);
  const [todayAgendas, setTodayAgendas] = useState([]);
  const [upcomingAgendas, setUpcomingAgendas] = useState([]);
  const [agendaToEdit, setAgendaToEdit] = useState(null);

  const toggleAddAgendaPopUp = () => {
    setAddAgendaPopUpVisible(!isAddAgendaPopUpVisible);
  };

  const toggleAddTaskPopUp = () => {
    setAddTaskPopUpVisible(!isAddTaskPopUpVisible);
  };

  const toggleEditAgendaPopUp = (agenda) => {
    setAgendaToEdit(agenda);
    setEditAgendaPopUpVisible(!isEditAgendaPopUpVisible);
  };

  const toggleEditTaskPopUp = () => {
    setEditTaskPopUpVisible(!isEditTaskPopUpVisible);
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

  return (
    <>
      <MainLayout>
        <div className="flex flex-col min-h-screen justify-start items-center gap-5 px-5 pb-16 bg-HomeBG bg-cover bg-no-repeat">
          <div className="flex flex-row w-full h-auto justify-between items-center bg-cust-pink-lighter rounded-2xl py-7 px-16 bg-opacity-30 backdrop-blur-xl drop-shadow-2xl border-[1px] border-cust-white">
            <div className="flex flex-col w-1/4 justify-center items-start font-bold text-3xl">
              Your Calendar
            </div>
            <div className="flex flex-col w-1/4 justify-center items-end font-bold text-3xl">
              {currentDate}
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
          <div className="flex flex-col justify-start items-stretch gap-8 w-full">
            <div className="flex flex-col w-full justify-start items-center gap-5">
              <div className="flex w-full text-cust-grey ml-32">Today</div>
              <div className="grid grid-cols-4 justify-start items-center w-full gap-5">
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
              <div className="flex w-full text-cust-grey ml-32">Upcoming</div>
              <div className="grid grid-cols-4 justify-start items-stretch w-full gap-5">
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
      {isEditAgendaPopUpVisible && agendaToEdit && (
        <EditAgendaPopUp
          toggleEditAgendaPopUp={() => toggleEditAgendaPopUp(null)}
          agendaId={agendaToEdit.id}
          initialAgendaData={agendaToEdit}
        />
      )}
    </>
  );
};

export default Agenda;
