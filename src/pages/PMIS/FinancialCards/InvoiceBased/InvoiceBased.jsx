import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../../components/EditButton';
import AdvancedTable from '../../../../components/AdvancedTable';
import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import DeleteButton from '../../../../components/DeleteButton';
import CstmButton from '../../../../components/CstmButton';
import { getAccessType, objectToQueryString } from '../../../../utils/commonFunnction';
import { ALERTS } from '../../../../store/reducers/component-reducer';
import CommonActions from '../../../../store/actions/common-actions';
import { Urls } from '../../../../utils/url';
import InvoiceBasedForm from '../InvoiceBased/InvoiceBasedForm';
import FileUploader from "../../../../components/FIleUploader";
import FinanceActions from '../../../../store/actions/finance-actions';
import moment from 'moment';
import ConditionalButton from '../../../../components/ConditionalButton';
import CurrentuserActions from '../../../../store/actions/currentuser-action';
import SearchBarView from '../../../../components/SearchBarView';
import { useParams } from 'react-router-dom';

const InvoiceBased = () => {

    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    const [selectAll, setSelectAll] = useState([]);
    const [invoiceRow, setInvoiceRow] = useState([]);
    const [fileOpen, setFileOpen] = useState(false);
    const [strValFil, setstrVal] = useState(false);
    const [bulkfileOpen, setbulkfileOpen] = useState(false);
    const [fileType, setfileType] = useState("");
    const endDate = moment().format("Y");
    let dispatch = useDispatch()
    const {customer,customerId} = useParams()

    let showType = getAccessType("Actions(PO Status Invoice)")
    let shouldIncludeEditColumn = false

    

    if (showType === "visible"){
      shouldIncludeEditColumn = true
    }

    let dbConfigL = useSelector((state) => {
        let interdata = state?.financeData?.getPOInvoicedBased;
        return interdata;
      });

    let dbConfigList = useSelector((state) => {
        let interdata = state?.financeData?.getPOInvoicedBased || []
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
                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    dispatch(CurrentuserActions.getcurrentuserPG(true, `customer=${itm?.customer}`,1))
                    dispatch(FinanceActions.getPOInvoicedBased())
                    setmodalHead("Update PO Invoice Based")
                    setmodalBody(<>
                        <InvoiceBasedForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                    </>)
                }}></EditButton>} />,
                
                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-rose-400' onClick={() => {
                                dispatch(CommonActions.deleteApiCallerBulk(`${Urls.finance_poinvoice_based}`,{ids : [itm.uniqueId]}, () => {
                                    dispatch(FinanceActions.getPOInvoicedBased())
                                    dispatch(ALERTS({ show: false }))
                                }))
                            }} name={"OK"} />,
                            <Button classes='w-auto' onClick={() => {
                                dispatch(ALERTS({ show: false }))
                            }} name={"Cancel"} />
                        ],
                        text: "Are you sure you want to Delete?"
                    }
                    dispatch(ALERTS(msgdata))
                }}></DeleteButton>} />
            }
            return updateditm
        });
    })
    
    let dbConfigTotalCount = useSelector((state) => {
        let interdata = state?.financeData?.getPOInvoicedBased || []
        if (interdata.length > 0) {
            return interdata[0]["overall_table_count"]
        } else {
            return 0
        }
    })

    let customerList = useSelector((state) => {
        return state?.filterData?.getfinancialPoManagementCustomer.map((itm) => {
          return {
            label: itm.customer,
            value: itm.customer,
          };
        });
      });

    let projectGroupList = useSelector((state) => {
        return state?.filterData?.getfinancialPoManagementProjectGroup.map((itm) => {
          return {
            label: itm.projectGroup,
            value: itm.projectGroup,
          };
        });
      });

    let projectIdList = useSelector((state) => {
        return state?.filterData?.getfinancialPoManagementProjectId.map((itm) => {
          return {
            label: itm.projectId,
            value: itm.projectId,
          };
        });
      });


    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setValues,
        getValues,
        formState: { errors },
    } = useForm()

    let table = {
        columns: [
          ...(shouldIncludeEditColumn ? [
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
                )
                ,
                value: "checkboxInvoice",
                style: "min-w-[40px] max-w-[60px] text-center",
              }
            ]
            : []),
            {
                name: "Customer",
                value: "customerName",
                style: "min-w-[160px] max-w-[160px] text-center sticky left-0 bg-[#3e454d]  -top-1 z-20"
            },          
            {
                name: "Project Group",
                value: "projectGroupId",
                style: "min-w-[140px] max-w-[200px] text-center sticky left-[160px] bg-[#3e454d]  -top-1 z-20"
            },                                    
            {
                name: "GBPA",
                value: "gbpa",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "PO Number",
                value: "poNumber",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "PO Start Date",
                value: "poStartDate",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "PO End Date",
                value: "poEndDate",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Validity(Days)",
                value: "povalidity",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Item Code",
                value: "itemCode",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Description",
                value: "description",
                style: "min-w-[500px] max-w-[500px] text-center -z-10"
            },            
            {
                name: "Unit Rate(INR)",
                value: "unitRate(INR)",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Initial PO Qty",
                value: "initialPoQty",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Invoiced Quantity",
                value: "invoicedQty",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Open Quantity(Post Invoice)",
                value: "openQty",
                style: "min-w-[250px] max-w-[250px] text-center"
            },                    
            {
                name: "Open PO Value(INR)-Invoiced",
                value: "OpenPoValue",
                style: "min-w-[250px] max-w-[250px] text-center"
            },            
            {
                name: "Item Code Status",
                value: "itemCodeStatus",
                style: "min-w-[140px] max-w-[200px] text-center"
            }, 
            {
                name: "PO Status",
                value: "poStatus",
                style: "min-w-[140px] max-w-[200px] text-center"
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
            rpp: [10, 20, 50, 100]
        },
        filter: [
            {
                label: "Item Code Status",
                type: "select",
                name: "itemCodeStatus",
                option:[
                    {label:"Open",value:'Open'},
                    {label:"Closed",value:'Closed'},
                ],
                props: {
                }
            },
            {
                label: "PO Status",
                type: "select",
                name: "poStatus",
                option:[
                    {label:"Open",value:'Open'},
                    {label:"Closed",value:'Closed'},
                    {label:"Short Closed",value:'Short Closed'},
                ],
                props: {
                }
            },
        ]
    }
    const onSubmit = (data) => {
        let value = data.reseter
        delete data.reseter
        let strVal=objectToQueryString(data)
        setstrVal(strVal)
        dispatch(FinanceActions.getPOInvoicedBased(value, strVal,customerId))
    }
    useEffect(() => {
        dispatch(FinanceActions.getPOInvoicedBased(true,"",customerId))
    }, [])

    const onTableViewSubmit = (data) => {
      data["fileType"]=fileType
      dispatch(
        CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
          setFileOpen(false);
          setbulkfileOpen(false)
          resetting("");
          dispatch(FinanceActions.getPOInvoicedBased(true,"",customerId));
        })
      );
    };

    const handleBulkDelte = () => {
      dispatch(
        CommonActions.deleteApiCallerBulk(
          `${Urls.finance_poinvoice_based}`,
          {
            ids: selectAll
          },
          () => {
            dispatch(FinanceActions.getPOInvoicedBased(true,"",customerId));
            setmodalOpen(false)
            setInvoiceRow([]);
            setSelectAll([]);
          }
        )
      );   
    };


    return <>
        <AdvancedTable
            searchView={
              <>
                <SearchBarView
                  onblur={(e) => {}}
                  onchange={(e) => {
                    const poQuery = (e.target.value ? "searvhView=" + (e.target.value + '&') : "" ) +strValFil;
                    dispatch(FinanceActions.getPOInvoicedBased(true,poQuery))
                  }}
                  placeHolder={"Search...."}
                />
              </>
            }
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
                        <button onClick={handleBulkDelte} className="w-1/4 rounded-full bg-green-600 ">
                            OK
                        </button>
                      </div>
                    );
                  }}
                  name={"Delete"}
                ></Button>
            )}
            <ConditionalButton
              showType={getAccessType("Add New(PO Status Invoice)")} 
              classes="w-auto mr-1" onClick={(e) => {
              setmodalOpen(prev => !prev)
              setmodalHead("New PO Invoice Based")
              setmodalBody(<InvoiceBasedForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            }}
              name={"Add"}>                
            </ConditionalButton>
            <ConditionalButton
              showType={getAccessType("Upload file(PO Status Invoice)")}
              name={"Upload File"}
              classes="w-auto mr-1"
              onClick={(e) => {
                setFileOpen((prev) => !prev);
                setfileType(`PoInvoice`)
              }}
            ></ConditionalButton>

            <ConditionalButton
              showType={getAccessType("Upload file(PO Status Invoice)")}
              name={"Upgrade File"}
              classes="w-auto mr-1"
              onClick={(e) => {
                setbulkfileOpen((prev) => !prev);
                setfileType(`PoUpgrade`)
              }}
            ></ConditionalButton>
                
                </>}
            table={table}
            exportButton={[`/export/poInvoice/${customerId}`+"?"+strValFil , "Export_PoInvoice.xlsx",]}
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
            getaccessExport = {"Export(PO Status Invoice)"}
        />
        <FileUploader
          isOpen={fileOpen}
          fileUploadUrl={""}
          tempbtn={true} 
          onTableViewSubmit={onTableViewSubmit}
          setIsOpen={setFileOpen}
          tempbtnlink = {["/template/PoInvoice.xlsx","PoInvoice.xlsx"]}
        />
        <FileUploader
          isOpen={bulkfileOpen}
          fileUploadUrl={""}
          tempbtn={true}
          onTableViewSubmit={onTableViewSubmit}
          setIsOpen={setbulkfileOpen}
          head = {"PO-Upgrade"}
          tempbtnlink = {["/template/PO_Upgrade.xlsx","PO_Upgrade.xlsx"]}
        />

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        {/* <CommonForm/> */}
    </>


};

export default InvoiceBased;