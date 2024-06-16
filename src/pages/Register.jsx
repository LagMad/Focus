import React, { useState, useEffect } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import SVGs from "../components/shared/SVGs";
import { handleRegister } from "../api/services/auth";
import StatusPopUp from "../components/shared/StatusPopUp";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusPopUp, setStatusPopUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      const response = await handleRegister(formData);
      toggleStatusPopUp();
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 500 || status === 400) {
          setErrorMessage("Email sudah terdaftar!");
          d;
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    }
  };

  const toggleStatusPopUp = () => {
    setStatusPopUp(!statusPopUp);
  };

  useEffect(() => {
    // Check if passwords match and update the button's disabled state
    setIsButtonDisabled(password !== confirmPassword);
  }, [password, confirmPassword]);

  const passwordsMatch = password === confirmPassword;

  return (
    <>
      <div className="flex flex-row max-w-screen h-screen justify-between items-center font-SfProDisplay bg-cust-pink-lightest">
        <div className="flex justify-center items-center w-1/2 h-full font-SfProDisplay text-7xl font-black">
          <SVGs.LogoComplete />
        </div>
        <div className="flex flex-col justify-center items-center w-1/2 h-[calc(100%-24px)] bg-cust-blue-light mr-3 rounded-2xl px-20 text-cust-white gap-6">
          <div className="font-bold text-5xl text-left w-full">Get Started</div>
          <div className="font-bold text-xl text-left w-full">Sign Up</div>
          <div className="flex flex-col justify-left items-center w-full gap-5">
            <div className="flex flex-col justify-center items-center w-full text-left">
              <div className=" font-medium text-left text-lg w-full">
                Nama Lengkap
              </div>
              <Input
                type="text"
                name="name"
                placeholder="Nama Lengkap"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col justify-center items-center w-full text-left">
              <div className=" font-medium text-left text-lg w-full">Email</div>
              <Input
                type="text"
                name="email"
                placeholder="Email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col justify-center items-center w-full text-left">
              <div className=" font-medium text-left text-lg w-full">
                Password
              </div>
              <Input
                type="text"
                name="password"
                placeholder="Password"
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col justify-center items-center w-full text-left">
              <div className=" font-medium text-left text-lg w-full">
                Konfirmasi Password
              </div>
              <Input
                type="text"
                name="password_confirmation"
                placeholder="Konfirmasi Password"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    password_confirmation: e.target.value,
                  });
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            {!passwordsMatch && (
              <p className="text-cust-white text-xs italic mt-4 bg-red-600 py-1 px-4 rounded-full">
                Passwords do not match.
              </p>
            )}
          </div>
          <div className="self-center">
            Sudah punya akun?{" "}
            <a
              className="font-semibold text-cust-orange-normal"
              href="/login"
            >
              Masuk
            </a>
          </div>
          <Button
            className={"self-end"}
            type="submit"
            variation="primary"
            onClick={() => handleSubmit()}
            disabled={isButtonDisabled}
          >
            Daftar
          </Button>
        </div>
      </div>
      {statusPopUp && <StatusPopUp />}
    </>
  );
};

export default Register;
