import React from "react";

const Button = ({ onClick = () => { }, name, classes = "", icon, bgColor, ...props }) => {
  let data = [
    ["bg-", "bg-pcol"],
    ["w-", "w-full"],
  ];

  let tkn = 1;
  let value = "";

  data.map((itm) => {
    if (classes.search(itm[0]) == -1) {
      value = value + " " + itm[1];
    }
  });

  classes = classes + value;

  return (
    <button
      onClick={onClick}
      className={`${classes} ${classes.includes("bg") ? `${bgColor}` : " bg-pbutton "
        } flex text-nowrap items-center rounded-md px-3 py-[0.5px] text-xs font-semibold leading-6 text-white shadow-md hover:bg-onHoverButton transition-colors duration-500 not`}
      {...props}>
      {name} {icon}  {props?.children}
    </button>
  );
};

export default Button;
