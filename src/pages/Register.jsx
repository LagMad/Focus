import React from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import SVGs from "../components/shared/SVGs";

const Register = () => {
  return (
    <div className="flex flex-row max-w-screen h-screen justify-between items-center font-SfProDisplay bg-cust-pink-lightest">
      <div className="flex justify-center items-center w-1/2 h-full font-SfProDisplay text-7xl font-black">
        <SVGs.LogoComplete/>
      </div>
      <div className="flex flex-col justify-center items-center w-1/2 h-[calc(100%-24px)] bg-cust-blue-light mr-3 rounded-2xl px-20 text-cust-white gap-6">
        <div className="font-bold text-5xl text-left w-full">
          Get Started
        </div>
        <div className="font-bold text-xl text-left w-full">Sign Up</div>
        <div className="flex flex-col justify-left items-center w-full gap-5">
          <div className="flex flex-col justify-center items-center w-full text-left">
            <div className=" font-medium text-left text-lg w-full">Nama Lengkap</div>
            <Input type="text" name="name" placeholder="Nama Lengkap" />
          </div>
          <div className="flex flex-col justify-center items-center w-full text-left">
            <div className=" font-medium text-left text-lg w-full">Email</div>
            <Input type="text" name="email" placeholder="Email" />
          </div>
          <div className="flex flex-col justify-center items-center w-full text-left">
            <div className=" font-medium text-left text-lg w-full">
              Password
            </div>
            <Input type="text" name="password" placeholder="Password" />
          </div>
          <div className="flex flex-col justify-center items-center w-full text-left">
            <div className=" font-medium text-left text-lg w-full">
              Konfirmasi Password
            </div>
            <Input type="text" name="confirmPassword" placeholder="Konfirmasi Password" />
          </div>
        </div>
        <Button className={"self-end"} type="button" variation="primary" onClick={() => alert("Click!")}>
          Daftar
        </Button>
      </div>
    </div>
  );
};

export default Register;
