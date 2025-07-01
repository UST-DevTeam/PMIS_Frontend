import React, { useEffect, useState } from "react";
import { UilAngleDown, UilAngleUp } from "@iconscout/react-unicons";
import Modalmoreinfo from "./Modalmoreinfo";
import Button from "./Button";

const AdvancedTableExpandableOneRow = ({
  multiSelect,
  setOpenModal,
  setModalBody,
  table,
  itm,
  hide,
}) => {
  const [expand, setExpand] = useState(false);
console.log("AdvancedTableExpandableOneRow")
  return (
    <>
      <tr>
        <td className="text-[12px] pl-1 border-[#0e8670] border-[0.1px] text-primaryLine">
          <span
            onClick={() => {
              setExpand((prev) => !prev);
            }}
          >
            {expand ? <UilAngleUp /> : <UilAngleDown />}
          </span>
        </td>

        {table.columns.map((innerItm, index) => {
          return hide.indexOf(String(index)) == -1 ? (
            <td 
              className={`text-[12px] pl-1 border-[#0e8670] border-[0.1px] text-white ${
                innerItm.style ? innerItm.style : " min-w-[300px] max-w-[500px]"
              }`}
            >
              <Modalmoreinfo
                ctt={32}
                setModalBody={setModalBody}
                setOpenModal={setOpenModal}
                value={itm[innerItm.value]}
              />
            </td>
          ) : (
            <></>
          );
        })}
      </tr>

      {expand &&
        table?.childs &&
        Object.entries(table.childs)?.map((onewq) => {
          return itm[onewq[0]]?.map((onewqq) => {
            return (
              <tr>
                <td className="text-[12px] pl-1 border-[#0e8670] border-[0.1px] bg-[#475058] text-primaryLine ">
                  {multiSelect ? (
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        name="groupOfCheck[]"
                        value={onewqq.uniqueId}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </td>

                {table?.childs[onewq[0]]?.map((itts) => {
                  {/* console.log(itts, onewqq, "ittsittsittsittsitts"); */}
                  return (
                    <td
                      className={`text-[12px] pl-1 cursor-pointer border-[#0e8670] border-[0.1px] bg-[#475058] text-white ${
                        itts.style ? itts.style : " min-w-[300px] max-w-[500px]"
                      }`}
                    >
                      <Modalmoreinfo
                        pStyle={'diudui'}
                        
                        ctt={32}
                        setModalBody={setModalBody}
                        setOpenModal={setOpenModal}
                        value={onewqq[itts.value]}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          });
        })}
    </>
  );
};

export default AdvancedTableExpandableOneRow;
