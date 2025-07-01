import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ComponentActions from "../store/actions/component-actions";

const Expander = ({
  itm,
  parentTitle = '',
  navigate,
}) => {
  const [expand, setExpend] = useState(false);
  const dispatch = useDispatch();

  const handleExpend = () => {
    setExpend((prev) => !prev);
  };

  return (
    <div className="relative w-fit mt-5 -top-[14px]">
      <Button
        onClick={
          itm.children.length
            ? handleExpend
            : () => {
              if(!itm.href) return
              navigate(itm.href + (itm?.use ? "" : `${parentTitle}`) + `?from=${parentTitle}`) 
            }
        }
        classes="btn-cls !py-[6px] !w-fit"
        name={itm.title}
      />

      {expand && itm.children.length ? (
        <div className="ml-6">
          {itm.children.map((item, index) => (
            <div
              className={`flex ${index + 1 !== itm.children.length ? "border-l-2" : ""
                } relative`}
            >
              <div
                className={`h-[25px] border-b-2 ${index + 1 === itm.children.length ? "border-l-2" : ""
                  } w-[40px] relative`}
              >
                {Boolean(item.children.length) && (
                  <div className="w-fit cursor-pointer border-white border-2 rounded-full absolute -bottom-2 z-10 bg-[#3E454D] -left-2">
                    <svg
                      className="w-3 h-3 fill-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                    </svg>
                  </div>
                )}
              </div>

              <Expander
                key={index + item.title}
                itm={item}
                parentTitle={parentTitle + "/" + item.title}
                navigate={navigate}
              />
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const TreeStructure = ({ data }) => {
console.log("____data__", data)
  const navigate = useNavigate();

  return (
    <div className="px-4 flex space-x-4 h-[80vh] overflow-y-scroll mb-[300px]">
      {data.map((itm, index) => {
        return (
          <Expander
            key={index + itm.title}
            itm={itm}
            navigate={navigate}
            parentTitle={itm.title}
          />
        );
      })}
    </div>
  );
};

export default TreeStructure;
