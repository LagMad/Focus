import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import SVGs from "./SVGs";
import StatusPopUp from "./StatusPopUp";
import { editUser, getUser } from "../../api/services/profile";

const EditProfilePopUp = ({ toggleEditProfilePopUp, initialUserData }) => {
  const [statusPopUp, setStatusPopUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(initialUserData);

  const handleEdit = async () => {
    try {
      const response = await editUser(user);
      setTimeout(() => {
        setStatusPopUp(true);
      }, 1000);
      console.log(response)
      window.location.reload();
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 500 || status === 400) {
          setErrorMessage("An error occurred. Please try again.");
        }
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-10 backdrop-blur-sm font-SfProDisplay">
        <div className="flex flex-col w-1/3 bg-white drop-shadow-2xl rounded-xl justify-center items-center p-8 gap-5">
          <div className="text-3xl font-bold text-cust-blue-light">
            Edit Profile
          </div>
          <div className="flex flex-col w-full justify-center items-center">
            <div className="self-start">Name</div>
            <Input
              className={" focus:border-cust-blue-light"}
              placeholder={"Your name..."}
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full justify-center items-center">
            <div className="self-start">Email</div>
            <Input
              className={" focus:border-cust-blue-light"}
              placeholder={"Your email..."}
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="flex flex-row justify-end items-center w-full gap-5">
            <Button
              type={"button"}
              variation={"secondary-alt"}
              onClick={() => toggleEditProfilePopUp()}
            >
              Cancel
            </Button>
            <Button
              type={"button"}
              variation={"secondary"}
              onClick={handleEdit}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      {statusPopUp && <StatusPopUp />}
    </>
  );
};

export default EditProfilePopUp;
