import React from "react";

const ButtonWithTooltip = ({
  text = "",
  tooltipText = "",
  icon = "",
  className = "",
  onClick = () => {},
}) => {
  return (
    <>
      <div class="group flex flex-col relative items-center w-auto">
        {/* <p
            className="cursor-pointer text-center"
            onClick={() => {
              setOpenModal(true);
              setModalBody(
                <p className="p-3 overflow-scroll text-center">{value}</p>
              );
            }}
          >
            {moreinfo(value, ctt) + "..."}
          </p> */}

        <button
          onClick={onClick}
          className={`${
            className ? className : ""
          } text-white text-xs py-2 px-4 rounded w-full`}
        >
          {text} {icon}
        </button>
        <span class="pointer-events-none w-max absolute -top-8 bg-gray-500 z-[100px] rounded-lg p-2 opacity-0 transition-opacity group-hover:opacity-100">
          {tooltipText}
        </span>
      </div>

      <p data-tooltip-target="tooltip-hover"></p>
    </>
  );
  return (
    <div className="relative inline-block">
      <span className="tooltip absolute bg-gray-900 text-white text-xs rounded px-1 bottom-full left-1/2 -translate-x-1/2 transform transition-opacity opacity-0 pointer-events-none">
        {tooltipText}
      </span>
    </div>
  );
};

export default ButtonWithTooltip;
