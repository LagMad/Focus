import React from "react";
import MainLayout from "../components/layout/MainLayout";

const Profile = () => {
  return (
    <MainLayout>
      <div className="flex flex-col w-full min-h-screen justify-start items-center gap-5 px-5 pb-16 bg-HomeBG bg-cover bg-no-repeat">
        <div className="flex flex-row w-3/4 h-auto justify-center items-center py-7 px-16 font-bold text-5xl text-center">
          Profile
        </div>
        <div className="flex flex-row w-3/4 h-auto justify-between items-center bg-cust-pink-lighter rounded-2xl py-7 px-16 font-bold text-3xl bg-opacity-30 backdrop-blur-xl drop-shadow-2xl border-[1px] border-cust-white">
          Andrea Gilbert
        </div>
        <div className="flex flex-row w-3/4 h-auto justify-between items-center bg-cust-pink-lighter rounded-2xl py-7 px-16 font-bold text-3xl bg-opacity-30 backdrop-blur-xl drop-shadow-2xl border-[1px] border-cust-white">
          <div className="flex flex-col justify-center items-start font-bold text-3xl">
            Email
          </div>
          <div className="flex flex-col justify-center items-start font-bold text-3xl">
            andreagilb@gmail.com
          </div>
        </div>
        <div className="flex flex-row w-3/4 h-auto justify-between items-center bg-cust-pink-lighter rounded-2xl py-7 px-16 font-bold text-3xl bg-opacity-30 backdrop-blur-xl drop-shadow-2xl border-[1px] border-cust-white">
          Edit Profile
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
