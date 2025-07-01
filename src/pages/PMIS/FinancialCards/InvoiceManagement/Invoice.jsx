import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";
import AdvancedTable from "../../../../components/AdvancedTable";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import { getAccessType, objectToQueryString } from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls } from "../../../../utils/url";
import FinanceActions from "../../../../store/actions/finance-actions";
import FileUploader from "../../../../components/FIleUploader";
import AdminActions from "../../../../store/actions/admin-actions";
import InvoiceForm from "../InvoiceManagement/InvoiceForm";
import moment from "moment";
import ConditionalButton from "../../../../components/ConditionalButton";
import CurrentuserActions from "../../../../store/actions/currentuser-action";
import { useParams } from "react-router-dom";

const Invoice = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [invoiceRow, setInvoiceRow] = useState([]);
  const [selectAll, setSelectAll] = useState([]);
  const [fileOpen, setFileOpen] = useState(false);
  const [modalHead, setmodalHead] = useState(<></>);
  const [strValFil, setstrVal] = useState(false);
  const endDate = moment().format("Y");

  let dispatch = useDispatch();

  const {customerId} = useParams()
  
  let dbConfigL = useSelector((state) => {
    let interdata = state?.financeData?.getInvoice;
    return interdata;
  });

  let showType = getAccessType("Action(Revenue Invoice)")

    let shouldIncludeEditColumn = false

    if (showType === "visible"){
      shouldIncludeEditColumn = true
    }

  let dbConfigList = useSelector((state) => {
    let interdata = state?.financeData?.getInvoice || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,

        checkboxInvoice: (
          <input
            type="checkbox"
            id={itm.uniqueId}
            checked={invoiceRow.includes(itm.uniqueId)}
            value={itm.uniqueId}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectAll((prev) => [...new Set([...prev, e.target.id])]);
                setInvoiceRow((prev) => [...prev, e.target.value]);
                
              } else {
                if (selectAll.includes(e.target.id)) {
                  setSelectAll((prev) =>
                    prev.filter((id) => id !== e.target.id)
                  );
                }
                setInvoiceRow((prev) =>
                  prev.filter((id) => id !== e.target.value)
                );
              }
            }}
          />
        ),

        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  dispatch(CurrentuserActions.getcurrentuserPG(true, `customer=${itm?.customer}`))
                  dispatch(CurrentuserActions.getcurrentuserPT(true, `customer=${itm?.customer}`))
                  dispatch(CurrentuserActions.getcurrentuserPID(true, `projectGroup=${itm?.projectGroup}`))
                  dispatch(AdminActions.getInvoiceSiteId(true,`projectId=${itm?.projectId}`));
                  setmodalHead("Edit Invoice");
                  setmodalBody(
                    <>
                      <InvoiceForm
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
                        filtervalue = {strValFil}
                      />
                    </>
                  );
                }}
              ></EditButton>
            }
          />
        ),

        delete: (
          <CstmButton
            child={
              <DeleteButton
                name={""}
                onClick={() => {
                  let msgdata = {
                    show: true,
                    icon: "warning",
                    buttons: [
                      <Button
                        classes='w-15 bg-rose-400'
                        onClick={() => {
                          dispatch(
                            CommonActions.deleteApiCallerBulk(
                              `${Urls.finance_Invoice}`,
                              {ids : [itm.uniqueId]},
                              () => {
                                dispatch(FinanceActions.getInvoice());
                                dispatch(ALERTS({ show: false }));
                              }
                            )
                          );
                        }}
                        name={"OK"}
                      />,
                      <Button
                        classes="w-auto"
                        onClick={() => {
                          console.log("snnsnsnsns");
                          dispatch(ALERTS({ show: false }));
                        }}
                        name={"Cancel"}
                      />,
                    ],
                    text: "Are you sure you want to Delete?",
                  };
                  dispatch(ALERTS(msgdata));
                }}
              ></DeleteButton>
            }
          />
        ),
      };
      return updateditm;
    });
  });

  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.financeData?.getInvoice || [];
    console.log(interdata,"_________interdata___________")
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });

  let listYear = [];

  for (let ywq = 2019; ywq <= +endDate; ywq++) {
    listYear.push({'label':ywq,'value':ywq});
  }

  let monthList = [
    {'label':'Jan', 'value':'Jan'},
    {'label':'Feb', 'value':'Feb'},
    {'label':'Mar', 'value':'Mar'},
    {'label':'Apr', 'value':'Apr'},
    {'label':'May', 'value':'May'},
    {'label':'Jun', 'value':'Jun'},
    {'label':'Jul', 'value':'Jul'},
    {'label':'Aug', 'value':'Aug'},
    {'label':'Sep', 'value':'Sep'},
    {'label':'Oct', 'value':'Oct'},
    {'label':'Nov', 'value':'Nov'},
    {'label':'Dec', 'value':'Dec'},
  ]


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();

  let table = {
    columns: [
      ...(shouldIncludeEditColumn
        ? [
      {
        name: (
          <input
            type="checkbox"
            className='check-state'
            onChange={(e) => {
              if (e.target.checked) {
                setInvoiceRow(dbConfigL.map((itm) => itm.uniqueId));
                setSelectAll(Array.isArray(dbConfigList) ? dbConfigList.map(itm => itm.uniqueId) : []);
                try {
                  let eleRefs = document.getElementsByClassName('check-state');
                  if (eleRefs) {
                    eleRefs = Array.from(eleRefs);
                    if (Array.isArray(eleRefs)) {
                      eleRefs.forEach(ele => {
                        if (ele) {
                          ele.setAttribute('checked', true);
                        }
                      });
                    }
                  }
                } catch (error) {
                  // Handle error if needed
                }
              } else {
                setInvoiceRow([]);
                setSelectAll([]);
                try {
                  let eleRefs = document.getElementsByClassName('check-state');
                  if (eleRefs) {
                    eleRefs = Array.from(eleRefs);
                    if (Array.isArray(eleRefs)) {
                      eleRefs.forEach(ele => {
                        if (ele) {
                          ele.removeAttribute('checked');
                        }
                      });
                    }
                  }
                } catch (error) {
                  // Handle error if needed
                }
              }
            }}
          />
        ),
        value: "checkboxInvoice",
        style: "min-w-[40px] max-w-[60px] text-center",
      }
      ]
      : []),
      {
        name: "Year",
        value: "year",
        style: "min-w-[60px] max-w-[160px] text-center sticky left-0 bg-[#3e454d] z-10",
      },
      {
        name: "Month",
        value: "month",
        style: "min-w-[80px] max-w-[160px] text-center sticky left-[60px] bg-[#3e454d] z-10",
      },
      {
        name: "Customer",
        value: "customerName",
        style: "min-w-[120px] max-w-[160px] text-center sticky left-[140px] bg-[#3e454d]",
      },
      {
        name: "Project Group",
        value: "projectGroupId",
        style:
          "min-w-[140px] max-w-[200px] text-center sticky left-[260px] bg-[#3e454d] z-10",
      },
      {
        name: "Project ID",
        value: "projectIdName",
        style: "min-w-[140px] max-w-[200px] text-center sticky left-[400px] bg-[#3e454d] z-10",
      },
      {
        name: "SSID",
        value: "ssidName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Site Id",
        value: "siteIdName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "WCC No",
        value: "wccNumber",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "WCC SignOff Date",
        value: "wccSignOffdate",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "PO Number",
        value: "poNumber",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Item Code",
        value: "itemCode",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Invoiced Quantity",
        value: "qty",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Invoice Number",
        value: "invoiceNumber",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Invoice Date",
        value: "invoiceDate",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Unit Rate",
        value: "unitRate",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Amount",
        value: "amount",
        style: "min-w-[120px] max-w-[200px] text-center",
      },
      {
        name: "Status",
        value: "status",
        style: "min-w-[120px] max-w-[200px] text-center",
      },
      ...(shouldIncludeEditColumn
        ? [
        {
            name: "Edit",
            value: "edit",
            style: "min-w-[100px] max-w-[200px] text-center"
        },
        {
            name: "Delete",
            value: "delete",
            style: "min-w-[100px] max-w-[200px] text-center"
        }
          ]
        : [])
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      {
        label: "Year",
        type: "select",
        name: "year",
        option:listYear,
        props: {
        }
      },
      {
        label: "Month",
        type: "select",
        name: "month",
        option:monthList,
        props: {
        }
      },
      {
        label: "Project Group",
        type: "text",
        name: "projectGroup",
        props: {
        }
      },
      {
        label: "Project ID",
        type: "text",
        name: "projectId",
        props: {
        }
      },
      {
        label: "Site ID",
        type: "text",
        name: "siteId",
        props: {
        }
      },
      {
        label: "WCC NO",
        type: "text",
        name: "wccNumber",
        props: {
        }
      },
      {
        label: "Invoice No",
        type: "text",
        name: "invoiceNumber",
        props: {
        }
      },
    ],
  };
  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
    let strVal=objectToQueryString(data)
    setstrVal(strVal)
    dispatch(FinanceActions.getInvoice(value, strVal,customerId));
  };

  useEffect(() => {
    dispatch(FinanceActions.getInvoice(true,"",customerId));
  }, []);

  const onTableViewSubmit = (data) => {
    data["fileType"] = "invoice";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        dispatch(FinanceActions.getInvoice(true,"",customerId));
        setFileOpen(false);
        resetting("");
      })
    );
  };

  const handleBulkDelte = () => {
    dispatch(
      CommonActions.deleteApiCallerBulk(
        `${Urls.finance_Invoice}`,
        {
          ids: selectAll
        },
        () => {
          dispatch(FinanceActions.getInvoice(true,"",customerId));
          dispatch(ALERTS({ show: false }));
          setmodalOpen(false)
        }
      )
    );   
  };

  return (
    <>
      <AdvancedTable
        headerButton={
          <>
            {(Array.isArray(selectAll) && selectAll?.length > 0 && shouldIncludeEditColumn ) && (
                <Button
                  classes="w-auto mr-1"
                  onClick={(e) => {
                    setmodalOpen((prev) => !prev);
                    setmodalHead("Confirm Delete");
                    setmodalBody(
                      <div className="flex justify-center py-6">
                        <button 
                          onClick={handleBulkDelte}
                          className="w-1/4 rounded-full bg-green-600 "
                        >
                        OK
                        </button>
                      </div>
                    );
                  }}
                  name={"Delete"}
                ></Button>
            )}
            <ConditionalButton
            showType={getAccessType("Add New(Revenue Invoice)")}
              classes="w-auto mr-1"
              onClick={(e) => {
                setmodalOpen((prev) => !prev);
                setmodalHead("New Invoice");
                setmodalBody(
                  <InvoiceForm
                    isOpen={modalOpen}
                    setIsOpen={setmodalOpen}
                    resetting={true}
                    formValue={{}}
                  />
                );
              }}
              name={"Add Invoice"}
            ></ConditionalButton>
            <ConditionalButton
            showType={getAccessType("Upload(Revenue Invoice)")}
              name={"Upload File"}
              classes="w-auto mr-1"
              onClick={(e) => {
                setFileOpen((prev) => !prev);
              }}
            ></ConditionalButton>
          </>
        }
        table={table}
        exportButton={[`/export/Invoice/${customerId}`+"?"+strValFil, "Export_Invoice.xlsx"]}
        filterAfter={onSubmit}
        tableName={"UserListTable"}
        handleSubmit={handleSubmit}
        data={dbConfigList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={dbConfigTotalCount}
        heading = {'Total Count:- '}
        getaccessExport = {"Export(Revenue Invoice)"}
      />
      <FileUploader
        isOpen={fileOpen}
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit}
        setIsOpen={setFileOpen}
        tempbtn={true}
        tempbtnlink={["/template/Invoice.xlsx", "Invoice.xlsx"]}
      />
      <Modal
        size={"sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />
    </>
  );
};

export default Invoice;
