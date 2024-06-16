import React, { useState, useEffect } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import SVGs from "../components/shared/SVGs";
import StatusPopUp from "../components/shared/StatusPopUp";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../api/services/auth";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [statusPopUp, setStatusPopUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    try {
      const response = await handleLogin(formData);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { status } = error.response;
        if (status === 500) {
          setErrorMessage("Email atau password salah. Silakan coba lagi!");
        } else if (status === 400) {
          setErrorMessage("Itu bukan email. Silakan coba lagi!");
        } else if (status === 404) {
          setErrorMessage("Email tidak ditemukan!");
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorMessage("");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [errorMessage]);

  return (
    <>
      <div className="flex flex-row max-w-screen h-screen justify-between items-center font-SfProDisplay bg-cust-pink-lightest">
        <div className="flex justify-center items-center w-1/2 h-full font-SfProDisplay text-7xl font-black">
          <SVGs.LogoComplete />
        </div>
        <div className="flex flex-col justify-center items-center w-1/2 h-[calc(100%-24px)] bg-cust-blue-light mr-3 rounded-2xl px-20 text-cust-white gap-6">
          <div className="font-bold text-5xl text-left w-full">
            Begin Your Journey
          </div>
          <div className="font-bold text-xl text-left w-full">Log In</div>
          <div className="flex flex-col justify-left items-center w-full gap-5">
            <div className="flex flex-col justify-center items-center w-full text-left">
              <div className=" font-medium text-left text-lg w-full">Email</div>
              <Input
                type="text"
                name="email"
                placeholder="Email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required={true}
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
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required={true}
              />
            </div>
          </div>
          <div className="self-center">
            Belum punya akun?{" "}
            <a
              className="font-semibold text-cust-orange-normal"
              href="/register"
            >
              Daftar
            </a>
          </div>
          <Button
            className={"self-end"}
            type="submit"
            variation="primary"
            onClick={() => handleSubmit()}
          >
            Masuk
          </Button>
          <div
            className={`text-cust-white text-xs italic mt-4 ${
              errorMessage === "" ? "" : "bg-red-600"
            } py-1 px-4 rounded-full`}
          >
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </div>
      </div>
      {statusPopUp && <StatusPopUp />}
    </>
  );
};

export default Login;
