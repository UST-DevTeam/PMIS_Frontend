import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../../components/EditButton';
import AdvancedTable from '../../../../components/AdvancedTable';
import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import { objectToQueryString } from '../../../../utils/commonFunnction';
import CommonActions from '../../../../store/actions/common-actions';
import AdminActions from '../../../../store/actions/admin-actions';


const ApprovalLogs = () => {


    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    const [strValFil, setstrVal] = useState(false);


    let dispatch = useDispatch()
    let roleList = useSelector((state) => {
        let interdata = state?.operationManagement?.USERS_LIST
        return interdata
    })

    let dbConfigList = useSelector((state) => {
        console.log(state, "state statejjjj")
        let interdata = state?.adminData?.getManageApprovalLogs || []
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,
                // "status": <CstmButton child={<ToggleButton onChange={(e) => {
                //     console.log(e.target.checked, "e.target.checked")
                //     let data = {
                //         "enabled": e.target.checked ? 1 : 0
                //     }
                //     dispatch(AlertConfigurationActions.patchAlertConfig(true, data, () => {
                //         // alert(e.target.checked)
                //         e.target.checked = e.target.checked
                //     }, itm.id))
                //     // if(itm.enabled==0){
                //     //     itm.enabled=1
                //     // }else{
                //     //     itm.enabled=0
                //     // }
                //     // itm.enabled=itm.enabled==0?1:0
                //     console.log(itm.enabled, "itm.enabled")
                // }} defaultChecked={itm.enabled == 1 ? true : false}></ToggleButton>} />,
                // "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                //     setmodalOpen(true)
                //     dispatch(OperationManagementActions.getOperationUserList())
                //     setmodalHead("Edit User")
                //     // setmodalBody(<>
                //     //     <OperationManagementForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                //     //     {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                //     // </>)
                //     console.log('ahshshhs',itm)
                //     //setmodalOpen(false)
                // }}></EditButton>} />,
                
                // "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                //     let msgdata = {
                //         show: true,
                //         icon: 'warning',
                //         buttons: [
                //             <Button classes='w-15 bg-rose-400' onClick={() => {
                //                 dispatch(CommonActions.deleteApiCaller(`${Urls.operationUser}/${itm.uniqueId}`, () => {
                //                     dispatch(OperationManagementActions.getOperationUserList())
                //                     dispatch(ALERTS({ show: false }))
                //                 }))
                //             }} name={"OK"} />,
                //             <Button classes='w-auto' onClick={() => {
                //                 console.log('snnsnsnsns')
                //                 dispatch(ALERTS({ show: false }))
                //             }} name={"Cancel"} />
                //         ],
                //         text: "Are you sure you want to Delete?"
                //     }
                //     dispatch(ALERTS(msgdata))
                // }}></DeleteButton>} />
            }
            return updateditm
        });
    })
    
    let dbConfigTotalCount = useSelector((state) => {
        let interdata = state?.adminData?.getManageApprovalLogs
        if (interdata.length > 0) {
            return interdata[0]["overall_table_count"]
        } else {
            return 0
        }
    })
    // let Form = [
    //     { label: "DB Server", value: "", option: ["Please Select Your DB Server"], type: "select" },
    //     { label: "Custom Queries", value: "", type: "textarea" }
    // ]
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
            {
                name: "Expense/Advance Number",
                value: "Number",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
           
            {
                name: "Action",
                value: "action",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Action By",
                value: "actionBy",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Employee Name",
                value: "empName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },             
            {
                name: "Action At",
                value: "actionAt",
                style: "min-w-[140px] max-w-[200px] text-center"
            },           
            {
                name: "Amount",
                value: "Amount",
                style: "min-w-[90px] max-w-[200px] text-center"
            },           
            {
                name: "Approved Amount",
                value: "ApprovedAmount",
                style: "min-w-[190px] max-w-[200px] text-center"
            },           
                     
            // {
            //     name: "Edit",
            //     value: "edit",
            //     style: "min-w-[100px] max-w-[200px] text-center"
            // },
            // {
            //     name: "Delete",
            //     value: "delete",
            //     style: "min-w-[100px] max-w-[200px] text-center"
            // }
        ],
        properties: {
            rpp: [10, 20, 50, 100]
        },
        filter: [
            // {
            //     label: "Role",
            //     type: "select",
            //     name: "rolename",
            //     option: roleList,
            //     props: {
            //     }
            // }
        ]
    }
    // const onSubmit = (data) => {
    //     console.log("jsjsjsjss", data)
    //     let value = data.reseter
    //     delete data.reseter
    //     dispatch(OperationManagementActions.getOperationUserList(value, objectToQueryString(data)))
    // }
    const onSubmit = (data) => {
        // let value = data.reseter;
        // delete data.reseter;
        let shouldReset = data.reseter;
        delete data.reseter;
        let strVal = objectToQueryString(data);
        setstrVal(strVal);
        dispatch(AdminActions.getapprovalLogs(true, strVal));
      };
    useEffect(() => {
        dispatch(AdminActions.getapprovalLogs())
        // dispatch(OperationManagementActions.getRoleList())
    }, [])
    return <>
        <AdvancedTable
            headerButton={
            <div className="flex gap-1">
              <Button
              classes="w-auto"
              onClick={(e) => {
                dispatch(CommonActions.commondownload2("/export/ApprovalLogs","Export_ApprovalLogs.xlsx"))
              }}
              name={"Export"}
            ></Button>
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
            heading={"Total:-"}
        />

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        {/* <CommonForm/> */}
    </>


};

export default ApprovalLogs;