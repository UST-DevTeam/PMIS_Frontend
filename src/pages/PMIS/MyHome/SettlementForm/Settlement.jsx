import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';


import AdvancedTable from '../../../../components/AdvancedTable';
import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import DeleteButton from '../../../../components/DeleteButton';
import CstmButton from '../../../../components/CstmButton';
import { objectToQueryString } from '../../../../utils/commonFunnction';
import FileUploader from '../../../../components/FIleUploader';
import { ALERTS } from '../../../../store/reducers/component-reducer';
import CommonActions from '../../../../store/actions/common-actions';
import { Urls } from '../../../../utils/url';
import AdminActions from '../../../../store/actions/admin-actions';
import SettlementForm from './SettlementForm';
import EditButton from '../../../../components/EditButton';
import HrActions from '../../../../store/actions/hr-actions';
import ExpenseAdvanceActions from '../../../../store/actions/expenseAdvance-actions';
const  Settlement = () => {

    const [modalOpen, setmodalOpen] = useState(false)
    const [fileOpen, setFileOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    const [strValFil, setstrVal] = useState(false);
    let dispatch = useDispatch()
    let dbConfigList = useSelector((state) => {
        console.log('statattatat',state)
        let interdata = state?.expenseAdvanceData?.getSettlementAmount
        return interdata?.map((itm) => {
            
            let updateditm = {
                ...itm,


                SettlementID: (
                    <p
                      className={`cursor-pointer font-extrabold ${
                        [3, 5, 7].includes(itm?.SettlementID)
                          ? "text-pcol"
                          : "text-pcol"
                      }`}
                    >
                      {itm.SettlementID}
                    </p>
                  ),



                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    setmodalHead("Edit Settlement Amount")
                    setmodalBody(<>
                        <SettlementForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} filtervalue = {strValFil} />
                    </>)
                }}></EditButton>} />,
                
                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-rose-400' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.admin_profile}/${itm.uniqueId}`, () => {
                                    dispatch(AdminActions.getAccuralRevenueMasterProject())
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
        let interdata = state?.expenseAdvanceData?.getSettlementAmount
        if (interdata.length > 0) {
            return interdata[0]["overall_table_count"]
        } else {
            return 0
        }
    })

    let projectTypeList = useSelector((state) => {
        return state?.filterData?.getfinancialworkdoneprojecttype.map((itm) => {
          return {
            label: itm.projectType,
            value: itm.uid,
          };
        });
      });

    let employeesList = useSelector((state) => {
    return state?.hrReducer?.getHRAllEmployee.map((itm) => {
        return {
        label: itm.empName,
        value: itm.uniqueId,
        };
    });
    });

    const {register,handleSubmit,watch,setValue,setValues,getValues,formState: { errors },} = useForm()

    let table = {
        columns: [
            {
                name: "Settlement ID",
                value: "SettlementID",
                style: "min-w-[100px] max-w-[200px] text-center sticky text-red-600"
            },
            {
                name: "Employee ID",
                value: "empCode",
                style: "min-w-[140px] max-w-[200px] text-center sticky"
            },
             
            {
                name: "UST Employee ID",
                value: "ustCode",
                style: "min-w-[140px] max-w-[200px] text-center sticky"
            },
            {
                name: "Employee Name",
                value: "empName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Settlement Requisition Date",
                value: "SettlementRequisitionDate",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Approval Date",
                value: "approvalDate",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Amount",
                value: "Amount",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Remarks",
                value: "remarks",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            
                       
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
        ],
        properties: {
            rpp: [10, 20, 50, 100]
        },
        // filter: [
        //     {
        //         label: "Project Type",
        //         type: "select",
        //         name: "projectType",
        //         option:projectTypeList,
        //         props: {
        //         }
        //     },
        //     {
        //         label: "Project ID",
        //         type: "text",
        //         name: "projectId",
        //         props: {}
        //     },
        // ]
    }

    const onSubmit = (data) => {
        delete data.rolename
        delete data.sub
        let shouldReset = data.reseter;
        delete data.reseter
        let strVal = objectToQueryString(data);
        setstrVal(strVal);
        dispatch(ExpenseAdvanceActions.getSettlementAmount(true, objectToQueryString(data)))
    }

    
    useEffect(() => {
        dispatch(ExpenseAdvanceActions.getSettlementAmount())
        dispatch(HrActions.getHRAllEmployee());
    }, []);

    const onTableViewSubmit3 = (data) => {
        data["fileType"] = "SettlementAmount";
        dispatch(
          CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
            dispatch(ExpenseAdvanceActions.getSettlementAmount());
            setFileOpen(false);
            resetting("");
          })
        );
      };
    return <>
        <AdvancedTable
            headerButton={
                <div className='flex gap-1'>
                    <Button
                        name={"Add New Settlement"}
                        classes="w-auto"
                        onClick={(e) => {setmodalOpen((prev) => !prev)
                        setmodalHead("Add") 
                        setmodalBody(<SettlementForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />) 
                        }}>
                    </Button>
                    <Button
                        name={"Upload"}
                        classes="w-auto"
                        onClick={(e) => {setFileOpen((prev) => !prev);}}>
                    </Button>
                    <Button
                        name={"Export"}
                        classes="w-auto"
                        onClick={() => {
                            dispatch(CommonActions.commondownload("/export/SettlementAmount","Export_SettlementAmount.xlsx"))
                          }}>
                    </Button>
                </div>
            }
            table={table}
            filterAfter={onSubmit}
            tableName={"UserListTable"}
            handleSubmit={handleSubmit}
            data={dbConfigList}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
            totalCount={dbConfigTotalCount}
            heading = {'Total Count :-  '}
        />
        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />
        <FileUploader
        isOpen={fileOpen}
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit3}
        setIsOpen={setFileOpen}
        tempbtn={true} tempbtnlink = {["/template/SettlementAmount.xlsx","SettlementAmount.xlsx"]}
        head = {"Upload File"}
      />

    </>

};

export default Settlement;