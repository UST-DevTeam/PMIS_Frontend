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
import ToggleButton from '../../../../components/ToggleButton';
import { objectToQueryString } from '../../../../utils/commonFunnction';
import { ALERTS } from '../../../../store/reducers/component-reducer';
import CommonActions from '../../../../store/actions/common-actions';
import { Urls } from '../../../../utils/url';
// import OperationManagementActions from '../../../../store/actions/OperationManagement-actions';
import InvoiceBasedForm from '../InvoiceBased/InvoiceBasedForm';
import FinanceActions from '../../../../store/actions/finance-actions';

const Unbilled = () => {
    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    let dispatch = useDispatch()
    // let roleList = useSelector((state) => {
    //     let interdata = state?.operationManagement?.USERS_LIST
    //     return interdata
    // })
    let dbConfigList = useSelector((state) => {
        let interdata = state?.financeData?.getPoLifeCycle || []
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,

                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    dispatch(FinanceActions.getPoLifeCycle())
                    setmodalHead("Edit User")
                    setmodalBody(<>
                        <InvoiceBased isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                        {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>)
                    console.log('ahshshhs',itm)
                    //setmodalOpen(false)
                }}></EditButton>} />,
                
                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-rose-400' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.finance_poLifeCycle}/${itm.uniqueId}`, () => {
                                    dispatch(FinanceActions.getPoLifeCycle())
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
        let interdata = state?.financeData?.getPoLifeCycle || []
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
                name: "Project ID",
                value: "projectId",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Project Group",
                value: "projectGroup",
                style: "min-w-[140px] max-w-[200px] text-center"
            },                      
            {
                name: "Project Type",
                value: "projectType",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Sub Project Type",
                value: "subProjectType",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "System Ref ID",
                value: "systemRefId",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Site Id",
                value: "siteId",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "RFAI Date",
                value: "rfaiDate",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "MD Date",
                value: "mdDate",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "MS1 Date",
                value: "ms1Date",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "MS2 Date",
                value: "invoiceNumber",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Item Code",
                value: "itemCode",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Total Unbilled Amount",
                value: "totalUnbilledAmount",
                style: "min-w-[140px] max-w-[200px] text-center"
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
    const onSubmit = (data) => {
        console.log("jsjsjsjss", data)
        let value = data.reseter
        delete data.reseter
        dispatch(FinanceActions.getPoLifeCycle(value, objectToQueryString(data)))
    }
    useEffect(() => {
        // dispatch(FinanceActions.getPoLifeCycle())
    }, [])
    return <>
        <AdvancedTable
            // headerButton={<><Button onClick={(e) => {
            //     setmodalOpen(prev => !prev)
            //     setmodalHead("New PO Life Cycle ")
            //     setmodalBody(<POLifeCycleForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            // }}
            //     name={"Add New"}></Button></>}
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
            heading = {'Total Count:- '}    
        />

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        {/* <CommonForm/> */}
    </>


};

export default Unbilled;