import React from "react";
import {
  UilCheckCircle,
  UilFolderCheck,
  UilCheckSquare,
} from "@iconscout/react-unicons";
import Button from "./Button";

const ActionButton = ({
  onClick,
  bgColor='',
  icon = <UilCheckSquare size="18" className={"hello"} />,
}) => {
  return (
    <div className="flex justify-around">
      <Button name={""} classes={"w-10" + ` ${bgColor}`} icon={icon} onClick={onClick} />
    </div>
  );
};

export default ActionButton;
