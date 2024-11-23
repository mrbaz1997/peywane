import React, { useState } from "react";
import Input from "./Input";

const PasswordInput = ({ ...reset }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className=" relative">
      <Input type={isShow ? "text" : "password"} {...reset} />
      <button
        onClick={() => setIsShow(!isShow)}
        type="button"
        className="btn-circle absolute bottom-0 left-0 flex justify-center items-center"
      >
        {isShow ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 14 14"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13.23 6.246c.166.207.258.476.258.754c0 .279-.092.547-.258.754C12.18 9.025 9.79 11.5 7 11.5S1.82 9.025.77 7.754A1.2 1.2 0 0 1 .512 7c0-.278.092-.547.258-.754C1.82 4.975 4.21 2.5 7 2.5s5.18 2.475 6.23 3.746" />
              <path d="M7 9a2 2 0 1 0 0-4a2 2 0 0 0 0 4" />
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 14 14"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M1.68 4.206C2.652 6.015 4.67 7.258 7 7.258s4.348-1.243 5.322-3.052M2.75 5.596L.5 7.481m4.916-.415L4.333 9.794m6.917-4.198l2.25 1.885m-4.92-.415l1.083 2.728"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
