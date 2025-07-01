import React, { useEffect, useRef, useState } from "react";
import { UilAngleDown, UilAngleUp } from "@iconscout/react-unicons";
import Modalmoreinfo from "./Modalmoreinfo";
import Button from "./Button";
import { ListItemAvatar } from "@material-ui/core";

const AdvancedTableExpandableOneRow = ({
    multiSelect,
    setOpenModal,
    setModalBody,
    table,
    itm,
    hide,
    finalData
}) => {
    const [expand, setExpand] = useState(false);
    console.log("called_____")
    console.log("finalData___", finalData)


    const countRef = useRef({})

    function getRowSpan(itm) {

        let count = 0

        if (!("workDescription" in itm)) {
            count = 1
        }
        else if (!(itm?.workDescription in finalData)) {
            count = 1
        }
        else if (finalData[itm?.workDescription]?.length) {
            if (finalData[itm?.workDescription][0]?._id === itm?._id) {
                count = finalData[itm?.workDescription].length
                countRef.current = {
                    ...countRef.current,
                    [itm.workDescription]: true
                }
                console.log("countRef.current", countRef.current)
            }
            else {
                count = 0
            }
        }
        return count
    }

    function expendedRows() {
        const rows = []
        Object.keys(finalData).map(key => {
            finalData[key].forEach(item => {
                const data = []
                table?.childs?.milestoneArray.map(innerItem => {


                    
                    if (["Vendor Item Code", "Vendor Rate", "PO eligibility (Yes/No)"].includes(innerItem?.name)) {
                        if (getRowSpan(item)) {
                            // data.push(<td rowSpan={`${getRowSpan(item)}`} className="text-[35px] text-center whitespace-nowrap pl-1 text-white border-[#0e8670] border-[0.1px] bg-[#475058] text-primaryLine">{innerItem.name === "Vendor Item Code" ? finalData[item?.workDescription]?.[0]?.["itemCode"] : innerItem.name === "Vendor Rate" ? finalData[item?.workDescription]?.[0]?.["rate"] : innerItem.name === "PO eligibility (Yes/No)" ? finalData[item?.workDescription]?.[0]?.["POEligibility"] : item[innerItem?.value]}</td>)
                            data.push(<td rowSpan={`${getRowSpan(item)}`} className="text-[12px] text-center whitespace-nowrap pl-1 text-white border-[#0e8670] border-[0.1px] bg-[#475058] text-primaryLine">
                                {innerItem.name === "Vendor Item Code" ? finalData[item?.workDescription]?.[0]?.["itemCode"] : innerItem.name === "Vendor Rate" ? finalData[item?.workDescription]?.[0]?.["rate"] : innerItem.name === "PO eligibility (Yes/No)" ? <span className="px-4 py-[2px] bg-[#1cb99c] rounded-md"> {finalData[item?.workDescription]?.[0]?.["POEligibility"] }</span> : item[innerItem?.value]}
                            </td>)
                        } else {
                            return
                        }
                    }
                    else {
                        data.push(<td className="text-[12px] text-center whitespace-nowrap pl-1 text-white border-[#0e8670] border-[0.1px] bg-[#475058] text-primaryLine">{item[innerItem?.value]}</td>)
                    }
                })
                rows.push(<tr className="border-[#0e8670]">{data}</tr>)
            })
        })
        return rows
    }

    return (
        <>
            <tr>
                <td className="text-[12px] pl-1 !h-[10px] border-[#0e8670] h-[10px] border-[0.1px] text-primaryLine">
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

                        <td rowSpan={`${getRowSpan(itm)}`}
                            className={`text-[12px] !h-[10px] pl-1 border-[#0e8670] border-[0.1px] text-white ${innerItm.style ? innerItm.style : " min-w-[300px] max-w-[500px]"
                                } `}
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

            {/* {expand &&
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

                                {table?.childs[onewq[0]]?.map((itts, index) => {
                                    console.log("itts.name", itts.name)
                                    return (
                                        // !countRef.current[onewqq?.workDescription] ? (
                                        ["Vendor Item Code", "Vendor Rate", "PO eligibility (Yes/No)"].includes(itts.name) ? (
                                            getRowSpan(onewqq) > 0 ?
                                                <td rowspan={`${getRowSpan(onewqq)}`}
                                                    className={`text-[12px] pl-1 cursor-pointer border-[#0e8670] border-[0.1px] bg-[#475058] text-white ${itts.style ? itts.style : " min-w-[300px] max-w-[500px]"
                                                        }`}
                                                >
                                                    <Modalmoreinfo
                                                        ctt={32}
                                                        setModalBody={setModalBody}
                                                        setOpenModal={setOpenModal}
                                                        value={itts.name === "Vendor Item Code" ? finalData[onewqq?.workDescription]?.[0]?.["itemCode"] : itts.name === "Vendor Rate" ? finalData[onewqq?.workDescription]?.[0]?.["rate"] : itts.name === "PO eligibility (Yes/No)" ? finalData[onewqq?.workDescription]?.[0]?.["POEligibility"] : ""}
                                                    />
                                                </td> : null
                                        )
                                            :
                                            <td
                                                className={`text-[12px] pl-1 cursor-pointer border-[#0e8670] border-[0.1px] bg-[#475058] text-white ${itts.style ? itts.style : " min-w-[300px] max-w-[500px]"
                                                    }`}
                                            >
                                                <Modalmoreinfo
                                                    ctt={32}
                                                    setModalBody={setModalBody}
                                                    setOpenModal={setOpenModal}
                                                    value={onewqq[itts.value]}
                                                />
                                            </td>
                                        // ) : ""


                                    );
                                })}
                            </tr>
                        );
                    });
                })} */}

            {expand && expendedRows()}
        </>
    );
};

export default AdvancedTableExpandableOneRow;
