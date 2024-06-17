import React from "react";
import Button from "../ui/Button";

const AgendaCard = ({ title, description, start_time, end_time, onClick }) => {
  return (
    <div className="flex flex-col justify-start items-center drop-shadow-xl self-start">
      <div className="flex flex-col justify-start items-center w-full bg-cust-blue-light text-cust-white rounded-t-2xl px-5 py-4 gap-1 border-t-[1px] border-x-[1px] border-cust-white">
        <div className="text-xl text-left w-full font-bold">
          {title}
        </div>
      </div>
      <div className="flex flex-col justify-start items-center w-full bg-cust-white rounded-b-2xl px-5 py-4 gap-2 border-b-[1px] border-x-[1px] border-cust-white">
        <div className="flex flex-col justify-between items-center w-full font-bold">
          <div className="flex flex-row justify-between items-center text-sm text-left w-full">
            <div>Start :</div>
            <div>{start_time}</div>
          </div>
          <div className="flex flex-row justify-between items-center text-sm text-left w-full">
            <div>End :</div>
            <div>{end_time}</div>
          </div>
        </div>
        <hr className="bg-cust-black w-full h-[2px] rounded-full opacity-30" />
        <div className="flex w-full text-justify break-all">{description}</div>
        <Button type={"button"} variation={"primary-smallest"} onClick={onClick}>
          See Detail
        </Button>
      </div>
    </div>
  );
};

export default AgendaCard;
