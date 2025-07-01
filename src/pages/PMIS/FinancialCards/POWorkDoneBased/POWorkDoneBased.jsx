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
import { objectToQueryString } from '../../../../utils/commonFunnction';
import { ALERTS } from '../../../../store/reducers/component-reducer';
import CommonActions from '../../../../store/actions/common-actions';
import { Urls } from '../../../../utils/url';
import FinanceActions from '../../../../store/actions/finance-actions';
import POWorkDoneBasedForm from '../POWorkDoneBased/POWorkDoneBasedForm'
import { useParams } from 'react-router-dom';

const POWorkDoneBased = () => {
    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    const [strValFil, setstrVal] = useState(false);
    let dispatch = useDispatch()

    const{customerId} = useParams()


    let dbConfigList = useSelector((state) => {
        let interdata = state?.financeData?.getPOWorkDoneDashboard || []
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,

                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    dispatch(FinanceActions.getPOWorkDoneDashboard())
                    setmodalHead("Edit User")
                    setmodalBody(<>
                        <POWorkDoneBasedForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
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
                                dispatch(CommonActions.deleteApiCaller(`${Urls.finance_poworkdone_dashboard}/${itm.uniqueId}`, () => {
                                    dispatch(FinanceActions.getPOWorkDoneDashboard())
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
        let interdata = state?.financeData?.getPOWorkDoneDashboard || []
        if (interdata.length > 0) {
            return interdata[0]["overall_table_count"]
        } else {
            return 0
        }
    })


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
                name: "Customer",
                value: "customer",
                style: "min-w-[120px] max-w-[200px] text-center sticky left-0 z-10 bg-[#3e454d] p-2"
            },          
            {
                name: "Project Group",
                value: "projectGroup",
                style: "min-w-[150px] max-w-[200px] text-center sticky left-[120px] z-10 bg-[#3e454d]"
            },            
            {
                name: "Project ID",
                value: "projectId",
                style: "min-w-[160px] max-w-[200px] text-center sticky left-[270px] z-10 bg-[#3e454d]"
            },           
            {
                name: "GBPA",
                value: "gbpa",
                style: "min-w-[160px] max-w-[200px] text-center"
            },                                                                     
            {
                name: "Item Code",
                value: "itemCode",
                style: "min-w-[160px] max-w-[200px] text-center"
            },                                                                     
            {
                name: "Description",
                value: "description",
                style: "min-w-[250px] max-w-[350px] text-center"
            },                                                                     
            {
                name: "Unit Rate (INR)",
                value: "unitRate(INR)",
                style: "min-w-[160px] max-w-[200px] text-center"
            },                                                                     
            {
                name: "Initial PO Qty (Sum of all Open PO)",
                value: "initialPoQty",
                style: "min-w-[250px] max-w-[300px] text-center"
            },                                                                     
            {
                name: "Invoiced Quantity",
                value: "invoicedQty",
                style: "min-w-[160px] max-w-[200px] text-center"
            },                                                                     
            {
                name: "Workdone Quantity",
                value: "workDoneQty",
                style: "min-w-[160px] max-w-[200px] text-center"
            },                                                                     
            {
                name: "Open Qunatity",
                value: "openQty",
                style: "min-w-[160px] max-w-[200px] text-center"
            },                                                                     
        ],


        filter: [
            {
                label: "ProjectGroup",
                type: "text",
                name: "projectGroup",
                props: {}
            },
            {
                label: "Project ID",
                type: "text",
                name: "projectId",
                props: {}
            },
            {
                label: "Item Code",
                type: "text",
                name: "itemCode",
                props: {}
            },
        ]
    }
    const onSubmit = (data) => {

        let shouldReset = data.reseter;
        delete data.reseter
        let strVal=objectToQueryString(data)
        setstrVal(strVal)
        dispatch(FinanceActions.getPOWorkDoneDashboard(shouldReset, {},strVal,customerId))
    }
    useEffect(() => {
        dispatch(FinanceActions.getPOWorkDoneDashboard(true,{},"",customerId))
    }, [])
    return <>
        <AdvancedTable
            table={table}
            filterAfter={onSubmit}
            tableName={"UserListTable"}
            exportButton={[`/export/trackingWorkDone/${customerId}`+"?"+strValFil,"Export_Tracking_WorkDone.xlsx"]}
            handleSubmit={handleSubmit}
            data={dbConfigList}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
            totalCount={dbConfigTotalCount}
            heading = {'Total Count:- '}
            getaccessExport = {"Export(PO Tracking Work done)"}
        />

        <Modal size={"smsh"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />

    </>


};

export default POWorkDoneBased;