import React from "react";
import Button from "../ui/Button";
import SVGs from "./SVGs";

const Note = ({ title, content, pinned, onEdit, onClick }) => {
  return (
    <div className="flex flex-col w-full max-h-96 justify-start items-center bg-cust-white p-5 gap-3 rounded-2xl border-[1px] border-cust-white">
      <div className="text-xl font-bold w-full">{title}</div>
      <hr className="w-full h-[2px] bg-cust-black rounded-full opacity-30" />
      <div className="text-xs text-justify w-full break-words">{content}</div>
      <div className="flex flex-row justify-between items-center w-full">
        <Button type={"button"} onClick={onClick}>
          <SVGs.Trash />
        </Button>
        <Button
          type={"button"}
          variation={"secondary-circle"}
          onClick={onEdit}
        >
          <SVGs.Pen />
        </Button>
      </div>
    </div>
  );
};

export default Note;
