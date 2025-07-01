import React, { useEffect, useState } from "react";
import PopupMenu from "./PopupMenu";
import { UilColumns } from "@iconscout/react-unicons";
import Modal from "./Modal";
import { objectToArray } from "../utils/commonFunnction";
import FilterView from "./FilterView";
import AdvancedTableExpandableOneRow from "./AdvancedTableExpandableOneRow";

const AdvancedTableRow = ({
  tableName = "",
  headerButton,
  filterAfter = () => { },
  handleSubmit = () => { },
  table,
  data,
  errors,
  register,
  setValue,
  getValues,
  totalCount = 0,
  multiSelect = false,
  actions = ["Edit", "Delete"],
  searchView = "",
  getmultiSelect = "",
  showTotalCount = true,
  heading = "",
  setmultiSelect = () => { },
}) => {
  const [hide, setHide] = useState([]);
  const [finalData , setFinalData] = useState([])
  const [RPP, setRPP] = useState(50);
  const [activeFilter, setActiveFilter] = useState([]);
  const [activedFilter, setActivedFilter] = useState({});
  const [currentPage, setcurrentPage] = useState(1);

  let pages = Array.from({
    length: totalCount % RPP == 0 ? totalCount / RPP : totalCount / RPP + 1,
  });

  const handleRPPChange = (value) => {
    setRPP(value);
    setcurrentPage(1); 
    const callApiPagination = (page,rrp) => {
      setcurrentPage(page);
      const filters = {
        ...activedFilter,
        reseter: true,
        page: page,
        limit:rrp
      };
      sessionStorage.setItem("page",value)
      filterAfter(filters);
      setActivedFilter(filters);
      setActiveFilter(objectToArray(filters));
    }; 
    callApiPagination(1,value)
  };

  const [openModal, setOpenModal] = useState(false);
  const [modalBody, setModalBody] = useState("");
  table.properties = {
    ...table.properties,
    rpp: [50, 100, 150, 200],
  };
  

  const callApiPagination = (value) => {
      setcurrentPage(value);
      const filters = {
        ...activedFilter,
        reseter: true,
        page: value,
        limit:RPP
        
      };
      sessionStorage.setItem("page",value)
      filterAfter(filters);
    setActivedFilter(filters);
    setActiveFilter(objectToArray(filters));
  };


  const onSubmit = (formdata) => {
    formdata["reseter"] = true;
    const data = {
      ...activedFilter,
      ...formdata
    }
    filterAfter(data);
    setActivedFilter(data);
    setActiveFilter(objectToArray(data));
    dispatch(ComponentActions.popmenu(location.pathname + "_" + name, false));
  };

  const onReset = () => {
    filterAfter({ reseter: true });
    setActiveFilter([]);
    setActivedFilter({});
  };

  useEffect(() => {
    setActiveFilter([]);
    setActivedFilter({});
  }, [tableName]);

  useEffect(()=>{
    if (data !== finalData) {
      setFinalData(data);
    }
  },[data])

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

    const element = document.querySelector("#add-not");
    addClassToAllChildren(element);
  });

  return (
    <>
      <div className="absolute left-0 right-0 flex-col">
        <div className="m-2 ">
          <div className="flex justify-between">
            <div className="flex flex-row">
              <div className="flex flex-row mt-[6px] text-white">
                <p className="text-[#f4d3a8] font-semibold whitespace-nowrap">{heading}</p>
                {showTotalCount && (
                    <p className="text-[#E6BE8A] font-bold">{totalCount}</p>
                )}
              </div>
            </div>
            <div className="flex flex-row">
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-row">{searchView}</div>
            <div className="flex flex-row">
              <FilterView
                onReset={onReset}
                tablefilter={table.filter}
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
                table={table}
                data={data}
                errors={errors}
                register={register}
                setValue={register}
                getValues={getValues}
              />
              <PopupMenu
                name={"Hide / Unhide"}
                icon={<UilColumns size="32" className={"hello"} />}
                child={
                  <>
                    <div className="flex z-40 max-h-96 overflow-scroll flex-col">
                      {table.columns.map((itts, index) => {
                        return (
                          <>
                            <div className="flex m-1">
                              <input
                                type="checkbox"
                                checked={hide.indexOf(String(index)) == -1}
                                value={String(index)}
                                className="not"
                                onChange={(e) => {
                                  setHide((prev) => {
                                    if (!e.target.checked) {
                                      return [...prev, e.target.value];
                                    } else {
                                      let vle = prev.indexOf(e.target.value);
                                      if (vle != -1) {
                                        prev.splice(vle, 1);
                                      }
                                      return [...prev];
                                    }
                                  });
                                }}
                                name={itts.name}
                              />
                              <span className="text-white text-[11px] mx-2">
                                {itts.name}
                              </span>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </>
                }
              />
              {headerButton}
            </div>
          </div>
        </div>
        <div className="m-2 overflow-x-scroll h-[68vh] pb-6 border-1 border-solid border-black rounded-lg ">
          {1 == 1 ? (
            <table border={1} className="w-[100%] table-auto">
              <thead className="sticky -top-1 h-4 z-30">
                <tr>
                  <td className="border-primaryLine h-10 border-[1.5px] bg-primaryLine min-w-[10px] max-w-[10px] text-center"></td>
                  {table.columns.map((itts, index) => {
                    return hide.indexOf(String(index)) == -1 ? (
                      <>
                        {actions.includes(itts.name) ? (
                          ["Edit",].includes(itts.name) ? (
                            <td
                              colSpan={actions.length}
                              className={`border-primaryLine h-10  border-[1.5px] bg-primaryLine min-w-[200px] max-w-[200px] text-center`}
                            >
                              <span className="text-white text-[12px]">
                                {"Actions"}
                              </span>
                            </td>
                          ) : !actions.includes("Edit") ? (
                            <td
                              colSpan={actions.length}
                              className={`border-primaryLine h-10  border-[1.5px] bg-primaryLine min-w-[200px] max-w-[200px] text-center`}
                            >
                              <span className="text-white text-[12px]">
                                {"Actions"}
                              </span>
                            </td>
                          ) : (
                            ""
                          )
                        ) : (
                          <>
                            <td
                              className={`border-primaryLine border-[1.5px] h-10  bg-primaryLine ${itts.style
                                ? itts.style
                                : " min-w-[300px] max-w-[500px]"
                                }`}
                            >
                              <span className="text-white text-[12px]">
                                {itts.name}
                              </span>
                            </td>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    );
                  })}
                </tr>
              </thead>
              {
                finalData.length > 0 ? (
                  <>
                    <tbody>
                      {finalData
                        // .slice((currentPage - 1) * RPP, currentPage * RPP)
                        .map((itm) => {
                          return (
                            <AdvancedTableExpandableOneRow
                              getmultiSelect={getmultiSelect}
                              setmultiSelect={setmultiSelect}
                              multiSelect={multiSelect}
                              setModalBody={setModalBody}
                              setOpenModal={setOpenModal}
                              table={table}
                              itm={itm}
                              hide={hide}
                            />
                          );
                        })}
                    </tbody>
                  </>
                ) :
                  (
                    <>
                      <tbody>
                        <tr className="border-2 border-black text-center">
                          <td colSpan={table.columns.length} className="">
                            No Records Found
                          </td>
                        </tr>
                      </tbody>
                    </>
                  )
              }
            </table>
          ) : (
            <>
              <table border={1} className="w-[100%] table-auto">
                <thead className="sticky -top-1 h-4 z-30">
                  {/* <tr>
                                        {
                                            table.columns.map((itts, index) => {
                                                console.log(hide.indexOf(itts.name), itts.name, hide, "hidehidehide")
                                                return hide.indexOf(String(index)) == -1 ? <th className=' border-primaryLine border-2 bg-orange-600 '>
                                                    <span className='text-white text-[14px]'>{itts.name}</span>
                                                </th> : <></>
                                            })
                                        }
                                    </tr> */}

                  <tr className="flex">
                    {table.columns.map((itts, index) => {
                      // console.log(
                      //   hide.indexOf(itts.name),
                      //   itts.name,
                      //   hide,
                      //   "hidehidehide"
                      // );
                      return hide.indexOf(String(index)) == -1 ? (
                        <>
                          {["Edit", "Delete"].includes(itts.name) ? (
                            ["Edit"].includes(itts.name) ? (
                              <th
                                colSpan={actions.length}
                                className={
                                  " border-primaryLine border-[1.5px] bg-primaryLine"
                                }
                              >
                                <span className="text-white text-[12px]">
                                  {"Actions"}
                                </span>
                              </th>
                            ) : (
                              ""
                            )
                          ) : (
                            <>
                              <th className=" border-primaryLine border-[1.5px] bg-primaryLine ">
                                <span className="text-white text-[12px]">
                                  {itts.name}
                                </span>
                              </th>
                            </>
                          )}
                        </>
                      ) : (
                        <></>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>No Records Found</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
        <div className="m-2 sticky bottom-0 z-10 inset-x-0 mx-auto bg-[#3e454d] p-2">
          <div className="flex justify-between">
              <div>
                <label className="mr-2 text-white">Rows Per Page :</label>
                <select
                  value={RPP}
                  onChange={(e) => handleRPPChange(parseInt(e.target.value))}
                  className="rounded-sm" 
                >
                  {table.properties.rpp.map((itm, idx) => (
                    <option key={idx} value={itm}>
                      {itm} 
                    </option>
                  ))}
                </select>
              </div>
           

            <div className="flex ml-auto">
              {pages.map((itm, index) => {
                return pages.length > 5 ? (
                  (index + 3 > currentPage && index - 1 < currentPage) ||
                  index + 1 == 1 ||
                  index + 1 == pages.length ? (
                    <span
                      onClick={(e) => {
                        callApiPagination(index + 1, "558");
                      }}
                      className={`border cursor-pointer px-2 mx-2 ${
                        currentPage == index + 1
                          ? "bg-pcol text-white border-primaryLine"
                          : "bg-white text-black border-primaryLine"
                      } `}
                    >
                      {index + 1}
                    </span>
                  ) : (
                    <></>
                  )
                ) : (
                  <span
                    onClick={(e) => {
                      callApiPagination(index + 1);
                    }}
                    className={`border cursor-pointer border-primaryLine ${
                      currentPage == index + 1
                        ? "bg-pcol text-white"
                        : "bg-white"
                    } px-2 mx-2`}
                  >
                    {index + 1}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Modal
        children={modalBody}
        setIsOpen={setOpenModal}
        isOpen={openModal}
        size={"sm"}
      />
    </>
  );
};

export default AdvancedTableRow;
