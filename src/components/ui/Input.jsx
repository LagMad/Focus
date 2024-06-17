import React, { forwardRef, useState } from "react";
import Button from "./Button";
import SVGs from "../shared/SVGs";

const Input = forwardRef(
  (
    {
      children,
      type = "text",
      name,
      className,
      onChange,
      onClickDelete,
      onClick,
      value,
      placeholder,
      deadline,
      readOnly,
      required = false,
      options = [],
      checked,
    },
    ref
  ) => {
    if (type === "select") {
      return (
        <div className="flex relative w-full group">
          <select
            ref={ref}
            name={name}
            id={name}
            className={`block py-3 px-3 w-full rounded-lg text-sm text-black focus:text-cust-darker-blue bg-transparent border-2 border-cust-black-light-active focus:border-cust-darker-blue focus:outline-none ${className}`}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            required={required}
          >
            <option className="" value="" disabled hidden>
              {placeholder}
            </option>
            {options.map((option) => (
              <option
                className="py-10 text-cust-darker-blue hover:text hover:bg-cust-darker-blue"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
          {children}
        </div>
      );
    } else if (type === "checkbox") {
      return (
        <div className="flex items-center justify-between relative w-full group gap-6">
          <div className="flex flex-row items-center justify-start gap-3">
            <input
              ref={ref}
              type="checkbox"
              name={name}
              id={name}
              className={`appearance-none h-6 w-6 border-4 border-cust-black checked:bg-cust-blue-light checked:border-cust-darker-blue outline-none cursor-pointer ${className}`}
              onChange={onChange}
              checked={checked}
            />
            <label
              htmlFor={name}
              className="text-base text-cust-black hover:text-cust-pink-normal transition-all duration-300 cursor-pointer"
              onClick={onClick}
            >
              {children}
            </label>
          </div>
          <div className="flex flex-row justify-end items-center gap-3">
            <div className="bg-red-600 text-cust-white px-5 rounded-full">
              Deadline : {deadline}
            </div>
            <Button type={"button"} onClick={onClickDelete}>
              <SVGs.Trash />
            </Button>
          </div>
        </div>
      );
    } else if (type === "textarea") {
      return (
        <div className="flex relative w-full group">
          <textarea
            ref={ref}
            name={name}
            id={name}
            className={`${className} block py-3 px-3 w-full rounded-lg text-sm text-black focus:text-black bg-cust-pink-lightest outline-none`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            required={required}
          />
          {children}
        </div>
      );
    } else {
      return (
        <div className="flex relative w-full group">
          <input
            ref={ref}
            type={type}
            name={name}
            id={name}
            className={`${className} block py-3 px-3 w-full rounded-lg text-sm text-black focus:text-cust-darker-blue bg-transparent border-2 border-cust-black-light-active focus:border-cust-darker-blue focus:outline-none`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            required={required}
          />
          {children}
        </div>
      );
    }
  }
);

export default Input;
