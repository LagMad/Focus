import React from "react";
import SVGs from "./SVGs";
import Button from "../ui/Button";

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full h-20 flex justify-between items-center px-20 font-SfProDisplay bg-cust-blue-light drop-shadow-lg">
      <div className="w-1/6">
        <SVGs.Logo />
      </div>
      <div className="flex flex-row w-4/6 justify-center items-center gap-20">
        <Button
          type={"button"}
          variation={"navbar"}
          path={"/"}
          onClick={() => navigate("/")}
        >
          Dashboard
        </Button>
        <Button
          type={"button"}
          variation={"navbar"}
          path={"/agenda"}
          onClick={() => navigate("/")}
        >
          Agenda
        </Button>
        <Button
          type={"button"}
          variation={"navbar"}
          path={"/todo"}
          onClick={() => navigate("/")}
        >
          To Do
        </Button>
        <Button
          type={"button"}
          variation={"navbar"}
          path={"/habit"}
          onClick={() => navigate("/")}
        >
          Habit
        </Button>
        <Button
          type={"button"}
          variation={"navbar"}
          path={"/notes"}
          onClick={() => navigate("/")}
        >
          Notes
        </Button>
      </div>
      <div className="flex w-1/6 justify-end">
        <Button className={"self-end"} type={"button"} variation={"primary-smaller"}>
          Profile
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
