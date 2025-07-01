import React from "react";
import { UilTimesCircle } from "@iconscout/react-unicons";
import Button from "./Button";
const Modal = ({
  size,
  modalHead = "",
  children,
  isOpen,
  setIsOpen,
  closeButton = false,
  onClose,
  bgColor = "black",
  actionOnClose = () => {},
}) => {
  const sizeType = {
    xlss: "w-[96vw] h-[90vh] md:w-[60vw] md:h-[93vh]",
    xl: "w-[96vw] h-[96vh] md:w-[75vw] md:h-[86vh]",
    lg: "w-[94vw] h-[90vh] md:w-[60vw] md:h-[93vh]",
    sm: "w-[92vw] md:w-[41vw]",
    smsh: "w-[64vw] h-[94vh]",
    modal: "w-[94vw] h-[38vh] md:w-[48vw] h-[30vh]",
    full: "w-[96vw] h-[96vh] md:w-[98vw] md:h-[98vh]",
    full1: "w-[96vw] h-[60vh] md:w-[98vw] md:h-[60vh]",
  };

  const bgClass = {
    black: "bg-[#3e454d]",
  };

  return (
    <div
      className={
        isOpen
          ? "z-[4000] flex justify-around place-items-center bg-white dark:bg-darkBg fixed rm-scroll overflow-hidden top-0 bottom-0 right-0 left-0"
          : "hidden"
      }
      style={{ background: "rgba(6, 6, 6, 0.9)" }}
      onClick={() => {
        setIsOpen((prev) => !prev);
        actionOnClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative ${
          bgClass[bgColor] || bgClass.black
        } dark:bg-darkBg  ${sizeType[size]} rounded-md modal-inner`}
      >
        <div className="sticky bg-primaryLine min-h-[40px] max-h-auto top-0 right-0 rounded-md px-4">
          <h1 className="text-white text-lg pt-2 pl-4">{modalHead}</h1>
          <div
            onClick={() => {
              setIsOpen((prev) => !prev);   actionOnClose();
            }}
            className="absolute ml-auto w-fit top-1 right-3 p-1 hover:bg-main bg-transparent cursor-pointer rounded-md transition-all duration-300 shadow-md"
          >
            <UilTimesCircle className={"text-white"} size="24" />
          </div>
        </div>
        <div className="overflow-y-scroll p-2 bg-[#3e454d] rounded-md">
          {children}
        </div>
        {closeButton && (
          <div className="w-24 absolute bottom-4 right-4">
            <Button
              name={"Close"}
              onClick={(e) => {
                setIsOpen((prev) => !prev);   actionOnClose();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
