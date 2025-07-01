import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../../components/EditButton';
import AdvancedTable from '../../../../components/AdvancedTable';
import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import DeleteButton from '../../../../components/DeleteButton';
import CstmButton from '../../../../components/CstmButton';
import { objectToQueryString } from '../../../../utils/commonFunnction';
import { ALERTS } from '../../../../store/reducers/component-reducer';
import CommonActions from '../../../../store/actions/common-actions';
import { Urls } from '../../../../utils/url';
import AdminActions from '../../../../store/actions/admin-actions';
import FileUploader from '../../../../components/FIleUploader';
import ManageComplianceL1Form from './ManageComplianceL1Form';
import { GET_CURRENT_USER_PG } from '../../../../store/reducers/currentuser-reducer';
import { GET_ACTIVITY_AND_OEM_COMPLIANCE, GET_PROJECT_TYPE_COMPLIANCE } from '../../../../store/reducers/admin-reducer';
import CurrentuserActions from '../../../../store/actions/currentuser-action';

const ManageComplianceL1 = () => {

    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    const [fileOpen, setFileOpen] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setValues,
        getValues,
        formState: { errors },
    } = useForm()

    let dispatch = useDispatch()
  
    let dbConfigList = useSelector((state) => {
        let interdata = state?.adminData?.getComplianceApprover
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,

                // "status": <CstmButton child={<ToggleButton onChange={(e) => {
                //     console.log(e.target.checked, "e.target.checked")
                //     let data = {
                //         "enabled": e.target.checked ? 1 : 0
                //     }    
                //     dispatch(AlertConfigurationActions.patchAlertConfig(true, data, () => {
                //         e.target.checked = e.target.checked
                //     }, itm.id))
                // }} defaultChecked={itm.enabled == 1 ? true : false}></ToggleButton>} />,


                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    setmodalHead("L1 Approver")
                    setValue("customer",null);
                    setValue("projectGroup", null);
                    setValue("projectType", null);
                    setValue("complianceMilestone", null);
                    dispatch(GET_CURRENT_USER_PG({ dataAll: [], reset: true }))
                    dispatch(GET_PROJECT_TYPE_COMPLIANCE({ dataAll:[], reset:true }))
                    dispatch(GET_ACTIVITY_AND_OEM_COMPLIANCE({ dataAll:[], reset:true }))
                    dispatch(AdminActions.getManageCustomer(true,`empId=${itm.uniqueId}`))
                    dispatch(CurrentuserActions.getcurrentuserPG(true, `customerId=${itm.customer}`))
                    dispatch(AdminActions.getProjectTypeCompiliance(true, `customerId=${itm.customer}`));
                    dispatch(AdminActions.getActivityAndOemCompiliance(true,`customerId=${itm.customer}&projectType=${itm.projectType}`))
                    setmodalBody(
                        <ManageComplianceL1Form isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                    )
                }}></EditButton>} />,
                
                // "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                //     let msgdata = {
                //         show: true,
                //         icon: 'warning',
                //         buttons: [
                //             <Button classes='w-15 bg-rose-400' onClick={() => {
                //                 dispatch(CommonActions.deleteApiCaller(`${Urls.admin_getComplianceapprover}/${itm.uniqueId}`, () => {
                //                     dispatch(AdminActions.getComplianceApprovertrue,`approverType=L1Approver`())
                //                     dispatch(ALERTS({ show: false }))
                //                 }))
                //             }} name={"OK"} />,
                //             <Button classes='w-auto' onClick={() => {
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
        let interdata = state?.adminData?.getComplianceApprover
        if (interdata.length > 0) {
            return interdata[0]["overall_table_count"]
        } else {
            return 0
        }
    })

    

    let table = {
        columns: [
            {
                name: "Emp Name",
                value: "emp",
                style: "min-w-[150px] max-w-[200px] text-center",
            }, 
            {
                name: "Profile",
                value: "userRole",
                style: "min-w-[120px] max-w-[200px] text-center",
            }, 
            {
                name: "Customer Name",
                value: "customerName",
                style: "min-w-[100px] max-w-[200px] text-center"
            },
            {
                name: "Project Group",
                value: "projectGroupName",
                style: "min-w-[120px] max-w-[200px] text-center"
            },
            {
                name: "Project Type",
                value: "projectType",
                style: "min-w-[120px] max-w-[200px] text-center",
            },
            {
                name: "Milestone",
                value: "complianceMilestone",
                style: "min-w-[100px] max-w-[200px] text-center",
            },               
            {
                name: "Action",
                value: "edit",
                style: "min-w-[100px] max-w-[200px] text-center"
            },
        ],
        properties: {
            rpp: [10, 20, 50, 100]
        },
        filter: []
    }

    const onSubmit = (data) => {
        let shouldReset = data.reseter
        delete data.reseter
        data['approverType'] = "L1Approver"
        let strVal = objectToQueryString(data)
        dispatch(AdminActions.getComplianceApprover(shouldReset,strVal))
    }

    useEffect(() => {
        dispatch(AdminActions.getComplianceApprover(true,`approverType=L1Approver`))
    }, [])

    const onTableViewSubmit = (data) => {
        data["fileType"]="ManageCostCenter"
        data['collection'] = "costCenter"
        dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
            dispatch(AdminActions.getComplianceApprover())
            setFileOpen(false)
        }))
    }


    return <>
        <AdvancedTable
            headerButton={
                <></>
                // <div className='flex gap-1'><Button classes='w-auto ' onClick={(e) => {
                //     setmodalOpen(prev => !prev)
                //     setmodalHead("New Compliance L1 Approver")
                //     setmodalBody(<ManageComplianceL1Form isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
                //     }}
                //     name={"Add Compliance L1"}></Button>
                // </div>
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
            heading = {"Total L1 Compliance :- "}
        />

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />
        <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen} tempbtn={true} tempbtnlink = {["/template/CostCenter.xlsx","CostCenter.xlsx"]}  />
    </>


};

export default ManageComplianceL1;