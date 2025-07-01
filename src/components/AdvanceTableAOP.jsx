import React, { useEffect, useState } from "react";
import Button from "./Button";
import PopupMenu from "./PopupMenu";
import { UilColumns, UilExclamationTriangle } from "@iconscout/react-unicons";
import Modalmoreinfo from "./Modalmoreinfo";
import Modal from "./Modal";
import { getAccessType, objectToArray } from "../utils/commonFunnction";
import FilterView from "./FilterView";
import { useDispatch } from "react-redux";
import CommonActions from "../store/actions/common-actions";
import ConditionalButton from "./ConditionalButton";
import ComponentActions from "../store/actions/component-actions";

const AdvancedTableAOP = ({
  totalHeads = false,
  tableName = "",
  headerButton,
  templateButton,
  exportButton,
  exportSiteButton,
  exportSiteWithTask,
  UploadSites,
  UploadTask,
  filterAfter = () => { },
  handleSubmit = () => { },
  table,
  data,
  errors,
  reset,
  register,
  setValue,
  getValues,
  totalCount = 0,
  showTotalCount = true,
  actions = ["Edit", "Delete"],
  icon,
  checkboxshow = false,
  delurl = "",
  geturl = "",
  getaccessAdd = "",
  getaccessExport = "",
  heading = "",
  searchView = "",
  TableHeight = "h-[68vh] xl:h-[44vh]"
  
}) => {

  const [hide, setHide] = useState([]);
  const [finalData, setFinalData] = useState([])
  const [lastVisitedPage, setLastVisitedPage] = useState(50);
  const [RPP, setRPP] = useState(50);
  const [sRPP, ssRPP] = useState(0);
  const [activeFilter, setActiveFilter] = useState([]);
  const [activedFilter, setActivedFilter] = useState({});
  const [currentPage, setcurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  data = (data[0]?.uniqueId) ? data : [];
  let pages = Array.from({
    length: totalCount % RPP == 0 ? totalCount / RPP : totalCount / RPP + 1,
  });

  const handleRPPChange = (value) => {
    setRPP(value);
    setcurrentPage(1);
    const callApiPagination = (page, rrp) => {
      setcurrentPage(page);
      const filters = {
        ...activedFilter,
        reseter: true,
        page: page,
        limit: rrp

      };
      sessionStorage.setItem("page", value)
      filterAfter(filters);
      setActivedFilter(filters);
      setActiveFilter(objectToArray(filters));
    };
    callApiPagination(1, value)
  };


  // const pages = Math.ceil(totalCount / RPP);

  let dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [modalBody, setModalBody] = useState("");
  table.properties = {
    ...table.properties,
    rpp: [50, 100, 500, 1000],
  };

  const callApiPagination = (value) => {
    setcurrentPage(value);
    const filters = {
      ...activedFilter,
      reseter: true,
      page: value,
      limit: RPP

    };
    sessionStorage.setItem("page", value)
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

  useEffect(() => {
    if (data !== finalData) {
      setFinalData(data);
    }
  }, [data])

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




  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(finalData.map((row) => row.uniqueId));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (uniqueId) => {
    if (selectedRows.includes(uniqueId)) {
      setSelectedRows(selectedRows.filter((id) => id !== uniqueId));
    } else {
      setSelectedRows([...selectedRows, uniqueId]);
    }
  };

  const handleDelete = () => {
    dispatch(
      CommonActions.deleteApiCallerBulk(
        `${delurl}`,
        {
          ids: selectedRows
        },
        () => {
          setShowDeleteModal(false);
          setSelectedRows([]);
          setSelectAll(false);
          setRPP(50)
          setcurrentPage(1);
          dispatch(geturl);
        }
      )
    );
  };


  function getTotalsHeads() {
    const row = [];

    
    Array.from({ length: 7 }).forEach(_ => {
      row.push(<th className={`border-pcol h-8 text-[5px] bg-[#3E454D] text-white text-center`}></th>);
    });

    
    const keys = {
      planRevenue: 0,
      COGS: 0,
      planGp: 0,
      gm: 0,
      SGNA: 0,
      np: 0,
      actualRevenue: 0,
      actualCOGS: 0,
      actualGp: 0,
      actualGm: 0,
      actualSGNA: 0,
      actualNp: 0,
      edit:'',
      delete:''
    };

    
    const temp = [
      "planRevenue", "COGS", "planGp", "gm", "SGNA", "np", 
      "actualRevenue", "actualCOGS", 'actualGp', 'actualGm', 'actualSGNA', 'actualNp','edit','delete'
    ];

    
    temp.forEach(key => {
      let total = data.reduce((acc, item) => {
        if (item && key in item) {
          acc += +item[key] || 0;
        }
        return acc;
      }, 0);

      
      if (key === "planRevenue") {
        keys.planRevenue = total;
      }
      if (key === "COGS") {
        keys.COGS = total;
      }
      if (key === "planGp") {
        keys.planGp = keys.planRevenue - keys.COGS;
      }
      if (key === "gm") {
        keys.gm = ((keys.planRevenue - keys.COGS) / keys.planRevenue) * 100;
        total = keys.gm;
      }
      if (key === "SGNA") {
        keys.SGNA = total;
      }
      if (key === "np") {
        keys.np = (keys.planRevenue === 0 ? 0 : ((keys.planRevenue - keys.COGS - keys.SGNA) / keys.planRevenue) * 100);
        total = keys.np;
      }
      if (key === "actualRevenue") {
        keys.actualRevenue = total;
      }
      if (key === "actualCOGS") {
        keys.actualCOGS = total;
      }
      if (key === "actualGp") {
        keys.actualGp = keys.actualRevenue - keys.actualCOGS;
        total = keys.actualGp;
      }
      if (key === "actualGm") {
        keys.actualGm = ((keys.actualRevenue - keys.actualCOGS) / keys.actualRevenue) * 100;
        total = keys.actualGm;
      }
      if (key === "actualSGNA") {
        keys.actualSGNA = total;
      }
      if (key === "actualNp") {
        keys.actualNp = (keys.actualRevenue === 0 ? 0 : ((keys.actualRevenue - keys.actualCOGS - keys.actualSGNA) / keys.actualRevenue) * 100);
        total = keys.actualNp;
      }
      if (key === 'edit'){
        keys.edit = ''
      }
      if (key === 'delete'){
        keys.delete = ''
      }
      
      

      
      if (key === "actualNp" || key === "actualGm" || key === "gm" || key === "np") {
        row.push(
          <th className={`border-pcol h-8 text-[9px] border-[1.5px] bg-[#3E454D] text-white text-center`}>
            {total ? total.toFixed(2) +" "+ "%" :"0.00 %"}
          </th>
        );
      } 
      
      else {


        if (key === 'edit' || key === 'delete') {
          row.push(
            <th className={`border-pcol h-8 text-[9px] border-[0px] bg-[#3E454D] text-[#3E454D] text-center`}>
              {}
            </th>
          );
        }

        else{row.push(
          <th className={`border-pcol h-8 text-[9px] border-[1.5px] bg-[#3E454D] text-white text-center`}>
            {total ? total.toFixed(2) : "0.00"}
          </th>
        );
      }
    }
    });

    return row;
}



  return (
    <>
      <div className="absolute left-0 right-0 2xl:top-60 2xl:bottom-0  flex-col">
        <div className="m-2 ">
          <div className="flex justify-between">
            <div className="flex flex-row">
              {
                heading && <div className="flex flex-row mt-[6px] text-white">
                  <p className="text-[#f4d3a8] font-semibold whitespace-nowrap">{heading}</p>
                  {showTotalCount && (
                    <p className="text-[#E6BE8A] font-bold">{totalCount}</p>
                  )}
                </div>
              }

              <div className="flex flex-row mx-8 gap-1">{searchView}</div>
            </div>
            <div className="flex flex-row">

              {selectedRows.length > 0 && (
                <Button
                  name={""}
                  classes="w-full mr-1 bg-rose-500 text-white"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete
                </Button>
              )}

              <FilterView
                onReset={onReset}
                tablefilter={table.filter}
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
                table={table}
                data={data}
                errors={errors}
                register={register}
                setValue={setValue}
                getValues={getValues}
              />
              <PopupMenu
                name={"Hide/Unhide"}
                icon={icon ? icon : <UilColumns size="32" className={"hello"} />}
                child={
                  <>
                    <div className="flex z-40 max-h-96 overflow-scroll flex-col not">
                      {table.columns.map((itts, index) => {
                        return (
                          <>
                            <div className="flex m-1 not">
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
                              <span className="text-[11px]  text-white mx-2 font-semibold not">
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
              {templateButton ? (
                <Button
                  name={"Template"}
                  classes="w-full mx-1"
                  onClick={() => {
                    dispatch(
                      CommonActions.commondownload(
                        templateButton[0],
                        templateButton[1]
                      )
                    );
                  }}
                >
                  Template
                </Button>
              ) : (
                <></>
              )}
              {exportButton ? (
                <ConditionalButton
                  showType={getAccessType(getaccessExport)}
                  name={"Export"}
                  classes="w-full mr-1"
                  onClick={() => {
                    if (tableName === "AccrualRevenueTrend") {
                      dispatch(CommonActions.commondownloadpost(exportButton[0], exportButton[1], exportButton[2], exportButton[3])
                      );
                    } else if (tableName === "AcctualWorkdoneform") {
                      dispatch(CommonActions.commondownloadpost(exportButton[0], exportButton[1], exportButton[2], exportButton[3])
                      );
                    }
                    else if (tableName === "EvmFinancialForm") {
                      dispatch(CommonActions.commondownloadpost(exportButton[0], exportButton[1], exportButton[2], exportButton[3])
                      );
                    }
                    else if (tableName === "PLform") {
                      dispatch(CommonActions.commondownloadpost(exportButton[0], exportButton[1], exportButton[2], exportButton[3])
                      );
                    }
                    else if (tableName === "SobTable") {
                      dispatch(CommonActions.commondownloadpost(exportButton[0], exportButton[1], exportButton[2], exportButton[3])
                      );
                    }
                    else {
                      dispatch(CommonActions.commondownload(exportButton[0], exportButton[1]))
                    }
                  }}
                >
                  Export
                </ConditionalButton>
              ) : (
                <></>
              )}
              {exportSiteButton ? (
                <ConditionalButton
                  showType={getAccessType("Download Project")}
                  name={"Export Site"}
                  classes="w-full mr-1"
                  onClick={() => {
                    dispatch(
                      CommonActions.commondownload(
                        exportSiteButton[0],
                        exportSiteButton[1]
                      )
                    );
                  }}
                >
                  Export
                </ConditionalButton>
              ) : (
                <></>
              )}
              {exportSiteWithTask ? (
                <ConditionalButton
                  showType={getAccessType("Download Project")}
                  name={"Export Site with task"}
                  classes="w-full mr-1"
                  onClick={() => {
                    dispatch(
                      CommonActions.commondownload(
                        exportSiteWithTask[0],
                        exportSiteWithTask[1]
                      )
                    );
                  }}
                >
                  Export
                </ConditionalButton>
              ) : (
                <></>
              )}
              {UploadSites ? (
                <Button
                  name={"Upload Sites"}
                  classes="w-full mr-1"
                  onClick={() => {
                    dispatch(
                      CommonActions.commondownload(
                        exportButton[0],
                        exportButton[1]
                      )
                    );
                  }}
                >
                  Export
                </Button>
              ) : (
                <></>
              )}
              {UploadTask ? (
                <Button
                  name={"Upload Task"}
                  classes="w-full"
                  onClick={() => {
                    dispatch(
                      CommonActions.commondownload(
                        exportButton[0],
                        exportButton[1]
                      )
                    );
                  }}
                >
                  Export
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        {/* <div className={`m-2 overflow-x-auto ${TableHeight} pb-6 border-1 border-solid border-black rounded-lg`}> */}
          {/* <div className="m-2 overflow-x-scroll h-[68vh] pb-6 border-1 border-solid border-black rounded-lg"> */}
          <div className={`m-2 overflow-x-auto ${TableHeight} pb-2 border-1 border-solid border-black  rounded-lg`}>
       {" "}
          {1 == 1 ? (
            <table border={1} className="w-[100%] table-auto">
              <thead className="sticky -top-1 h-4 z-30"> 
              {totalHeads && getTotalsHeads()}
                <tr>
                  {checkboxshow && (
                    <th className="border-primaryLine h-10 border-[1.5px] bg-primaryLine min-w-[50px] max-w-[50px] text-center">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                  )}
                  {table.columns.map((itts, index) => {
                    return hide.indexOf(String(index)) == -1 ? (
                      <>
                        {actions.includes(itts.name) ? (
                          ["Edit", ""].includes(itts.name) ? (
                            <th
                              colSpan={actions.length}
                              className={`border-primaryLine h-10  border-[1.5px] bg-[#3E454D] min-w-[120px] max-w-[200px] text-center`}
                            >
                              <span className="text-white text-[14px]">
                                {"Actions"}
                              </span>
                            </th>
                          ) : !actions.includes("Edit") ? (
                            <td
                              colSpan={actions.length}
                              className={`border-primaryLine h-10  border-[1.5px] bg-[#3E454D] min-w-[120px] max-w-[200px] text-center`}
                            >
                              <span className="text-white text-[14px]">
                                {"Actions"}
                              </span>
                            </td>
                          ) : (
                            ""
                          )
                        ) : (
                          <>
                            <th
                              className={`border-primaryLine border-[1.5px] h-10 ${itts?.bg ? itts?.bg : "bg-primaryLine"}   ${itts.style
                                ? itts.style
                                : " min-w-[300px] max-w-[500px]"
                                }`}
                            >
                              <span className="text-black-600 text-[11px]">
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



              {finalData.length > 0 ? (
                <tbody>
                  {finalData.map((itm) => {
                    return (
                      <tr>
                        {checkboxshow && (
                          <td className="text-[12px] h-2 pl-1 border-pcol border-[0.1px] overflow-hidden text-white min-w-[50px] max-w-[50px] text-center">
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(itm.uniqueId)}
                              onChange={() => handleSelectRow(itm.uniqueId)}
                            />
                          </td>
                        )}
                        {table.columns.map((innerItm, index) => {
                          return hide.indexOf(String(index)) == -1 ? (
                            <td
                              
                              className={`pl-1 border-[#0e8670] border-[0.1px] overflow-hidden text-white ${innerItm.style
                                ? innerItm.style
                                : "min-w-[200px] max-w-[500px]"
                                } `}
                            >
                              <Modalmoreinfo
                                pStyle={'15px'}
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
                    );
                  })}
                </tbody>
              ) : (
                <tbody>
                  <tr className="border-[1.5px] border-pcol text-center text-slate-200">
                    <td colSpan={table.columns.length} className="text-xl">
                      <span className="text-[13px] font-bold">No Records Found</span>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          ) : (
            <>
              <table border={1} className="w-[100%] table-auto">
                <thead className="sticky -top-1 h-4 z-30">

                  <tr className="flex">
                    {table.columns.map((itts, index) => {
                      return hide.indexOf(String(index)) == -1 ? (
                        <>
                          {["Edit", "Delete"].includes(itts.name) ? (
                            ["Edit"].includes(itts.name) ? (
                              <th
                                colSpan={actions.length}
                                className={
                                  " border-pcol border-[0.1px] bg-primaryLine  "
                                }
                              >
                                <span className="text-white text-[12px] ">
                                  {"Actions"}
                                </span>
                              </th>
                            ) : (
                              ""
                            )
                          ) : (
                            <>
                              <th className=" border-pcol border-[0.1px] bg-primaryLine ">
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
                      className={`border cursor-pointer px-2 mx-2 ${currentPage == index + 1
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
                    className={`border cursor-pointer border-primaryLine ${currentPage == index + 1
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
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-75 z-[10]">
          <div className="bg-white p-4 rounded-lg shadow-xl">
            <UilExclamationTriangle className="text-red-500 flex mx-auto w-14 h-14" />
            <p className="mt-4">{`Are you sure you want to delete ${selectedRows.length > 1 ? "these rows" : "this row"
              }?`}</p>
            <div className="mt-6 flex justify-center space-x-4">
              <Button name="Delete" classes="w-auto bg-rose-500" onClick={handleDelete} />
              <Button name="Cancel" classes="w-auto" onClick={() => setShowDeleteModal(false)} />

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdvancedTableAOP;
