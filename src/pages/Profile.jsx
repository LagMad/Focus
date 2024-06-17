import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { getUser } from "../api/services/profile";
import EditProfilePopUp from "../components/shared/EditProfilePopUp";

const Profile = () => {
  const [isEditProfilePopUp, setEditProfilePopUp] = useState(false);
  const [userData, setUserData] = useState([]);

  const getUserData = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const response = await getUser();
      setUserData(response);
    } catch {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleLogout = (e) => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
    window.location.reload();
  };

  const toggleEditProfilePopUp = () => {
    setEditProfilePopUp(!isEditProfilePopUp);
  };

  return (
    <>
      <MainLayout>
        <div className="flex flex-col w-full min-h-screen justify-start items-center gap-5 px-5 pb-16 bg-HomeBG bg-cover bg-no-repeat">
          <div className="flex flex-row w-3/4 h-auto justify-center items-center py-7 px-16 font-bold text-5xl text-center">
            Profile
          </div>
          <div className="flex flex-row w-3/4 h-auto justify-between items-center bg-cust-pink-lighter rounded-2xl py-7 px-16 font-bold text-3xl bg-opacity-30 backdrop-blur-xl drop-shadow-2xl border-[1px] border-cust-white">
            <div className="flex flex-col justify-center items-start font-bold text-3xl">
              Nama
            </div>
            <div className="flex flex-col justify-center items-start font-bold text-3xl">
              {userData.name}
            </div>
          </div>
          <div className="flex flex-row w-3/4 h-auto justify-between items-center bg-cust-pink-lighter rounded-2xl py-7 px-16 font-bold text-3xl bg-opacity-30 backdrop-blur-xl drop-shadow-2xl border-[1px] border-cust-white">
            <div className="flex flex-col justify-center items-start font-bold text-3xl">
              Email
            </div>
            <div className="flex flex-col justify-center items-start font-bold text-3xl">
              {userData.email}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center w-3/4 gap-5">
            <button
              className="flex flex-row w-1/2 h-auto justify-between items-center bg-cust-pink-lighter rounded-2xl py-7 px-16 font-bold text-3xl bg-opacity-30 backdrop-blur-xl drop-shadow-2xl border-[1px] border-cust-white"
              onClick={toggleEditProfilePopUp}
            >
              Edit Profile
            </button>
            <button
              className="w-1/2 h-auto justify-between items-center bg-red-600 rounded-2xl py-7 px-16 font-bold text-3xl text-cust-white drop-shadow-2xl border-[1px] border-cust-white"
              type={"button"}
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </MainLayout>
      {isEditProfilePopUp && userData && (
        <EditProfilePopUp
          userId={userData.id}
          toggleEditProfilePopUp={toggleEditProfilePopUp}
          initialUserData={userData}
        />
      )}
    </>
  );
};

export default Profile;
