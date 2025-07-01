import React from "react";
import { useEffect } from "react";

const ConditionalButton = ({ onClick, showType, name, classes = "", icon }) => {
  let data = [
    ["bg-", "bg-pcol"],
    ["w-", "w-full"],
  ];

  useEffect(() => {
    function addClassToAllChildren(el) {
      if (el) {
        el.classList.add("not");
        const children = el.children;

        for (let i = 0; i < children.length; i++) {
          addClassToAllChildren(children[i]);
        }
      }
    }

    const element = document.querySelector("#add-not-1");
    addClassToAllChildren(element);
    const element2 = document.querySelector("#add-not-2");
    addClassToAllChildren(element2);
  });
  let tkn = 1;
  let value = "";

  data.map((itm) => {
    if (classes.search(itm[0]) == -1) {
      value = value + " " + itm[1];
    }
  });

  classes = classes + value;

  return (
    <>
      {showType == "invisible" && (
        <></>
      )}
      {showType == "disabled" && (
        <button
        id="add-not-1"

          className={`${classes} ${
            classes.includes("bg") ? "   bg-gray-500 " : " bg-gray-100 "
          } not flex text-nowrap items-center rounded-md px-3 py-[2px] text-xs font-semibold leading-6 text-white shadow-md hover:bg-onHoverButton transition-colors duration-500`}
        >
          {name} {icon}
        </button>
      )}
      {showType == "visible" && (
        <button
          onClick={onClick}
          id="add-not-2"
          className={`${classes} ${
            classes.includes("bg") ? "  " : " bg-pbutton "
          } flex not text-nowrap items-center rounded-md px-3 py-[2px] text-xs font-semibold leading-6 text-white shadow-md hover:bg-onHoverButton transition-colors duration-500`}
        >
          {name} {icon}
        </button>
      )}
    </>
  );
};

export default ConditionalButton;
