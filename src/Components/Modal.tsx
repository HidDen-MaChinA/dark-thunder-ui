import React, { useState } from "react";
import ReactPortal from "./ReactPortal";

type DropdownProps = {
  button?: React.ReactNode;
  children?: React.ReactNode;
};

export default function Modal(props: DropdownProps) {
  const { button, children } = props;
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative flex flex-col">
      <label
        onClick={() => {
          setOpened(true);
        }}
      >
        {button}
      </label>

      {opened && (
        <ReactPortal wrapperId="overlay">
          <div className="flex w-full h-full items-center justify-center">
            <div
              className="absolute w-[100vw] h-[100vh] bg-[#00000070] z-30"
              onClick={() => {
                setOpened(false);
              }}
            ></div>
            <div className="p-3 bg-white shadow-md rounded-xl z-40 min-w-[30px]">
              {children}
            </div>
          </div>
        </ReactPortal>
      )}
    </div>
  );
}
