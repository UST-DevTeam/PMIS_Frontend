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
import { Urls, backendassetUrl, baseUrl } from "../../../../utils/url";
import OperationManagementActions from '../../../../store/actions/admin-actions';
import AdminActions from '../../../../store/actions/admin-actions';
import FileUploader from '../../../../components/FIleUploader';
import ExpenseAdvanceActions from '../../../../store/actions/expenseAdvance-actions';
import FillAdvanceForm from '../../../../pages/PMIS/MyHome/ClaimAdvAdvanceForm/FillAdvanceForm'

const FillAdvance = () => {

    const [modalOpen, setmodalOpen] = useState(false)
    const [fileOpen, setFileOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)

    let dispatch = useDispatch()

    // let Advnumber  = itm?.AdvanceNo || ""

    const currentDate = new Date();
    const dt = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).replace(/\//g, '-')

    let dbConfigList = useSelector((state) => {
        let interdata = state?.expenseAdvanceData?.getFillAdvance || [""]
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,

                // attachment: (
                //   <div className="flex justify-center items-center">
                //     <img
                //       src={backendassetUrl + itm?.attachment}
                //       className="w-24 h-14 content-center flex object-contain"
                //     />
                //   </div>
                // ),

                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    dispatch(ExpenseAdvanceActions.getFillAdvance())
                    setmodalHead("Edit Claim Type")
                    setmodalBody(<>
                        <FillAdvanceForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                        {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>)
                    //setmodalOpen(false)
                }}></EditButton>} />,

                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-rose-400' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.expAdv_fill_advance}/${itm.uniqueId}`, () => {
                                    dispatch(ExpenseAdvanceActions.getFillAdvance())
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
        let interdata = state?.expenseAdvanceData?.getFillAdvance || []
        if (interdata.length > 0) {
            return interdata[0]["overall_table_count"]
        } else {
            return 0
        }
    })

    const { register, handleSubmit, watch, setValue, setValues, getValues, formState: { errors }, } = useForm()

    let table = {
        columns: [
            {
                name: "Advance No.",
                value: "AdvanceNo",
                style: "min-w-[170px] max-w-[450px] text-center font-extrabold sticky left-0 bg-[#3e454d]",
            },
            {
                name: "Project ID",
                value: "projectIdName",
                style: "min-w-[170px] max-w-[450px] text-center",
            },
            {
                name: "Advance Type",
                value: "advanceType",
                style: "min-w-[170px] max-w-[450px] text-center",
            },
            {
                name: "Advance Date",
                value: "CreatedAt",
                style: "min-w-[170px] max-w-[450px] text-center",
            },
            {
                name: "Customer",
                value: "customerName",
                style: "min-w-[130px] max-w-[450px] text-center",
            },
            {
                name: "Cost Center",
                value: "costcenter",
                style: "min-w-[170px] max-w-[450px] text-center",
            },
            {
                name: "Amount",
                value: "Amount",
                style: "min-w-[170px] max-w-[450px] text-center",
            },
            {
                name: "Current Status",
                value: "status",
                style: "min-w-[140px] max-w-[450px] text-center",
            },
            {
                name: "Additional Info",
                value: "additionalInfo",
                style: "min-w-[330px] max-w-[450px] text-center",
            },
            {
                name: "Remarks",
                value: "remark",
                style: "min-w-[330px] max-w-[450px] text-center",
            },
            {
                name: "Edit",
                value: "edit",
                style: "min-w-[100px] max-w-[100px] text-center",
            },
            {
                name: "Delete",
                value: "delete",
                style: "min-w-[100px] max-w-[100px] text-center",
            },
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
        let value = data.reseter
        delete data.reseter
        dispatch(ExpenseAdvanceActions.getFillAdvance(value, objectToQueryString(data)))
    }

    useEffect(() => {
        dispatch(ExpenseAdvanceActions.getFillAdvance())
    }, [])

    const onTableViewSubmit = (data) => {
        data["fileType"] = "ManageClaimType"
        dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
            dispatch(ExpenseAdvanceActions.getFillAdvance())
            setFileOpen(false)
        }))
    }
    return <>
        <AdvancedTable
            headerButton={<div className='flex gap-1'><Button classes='w-auto' onClick={(e) => {
                // dispatch(ExpenseAdvanceActions.getClaimTypeAdvance(true, `claimTypeAdvance=${Advnumber}`))
                setmodalOpen(prev => !prev)
                setmodalHead("Add Advance")
                setmodalBody(<FillAdvanceForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            }}
                name={"Add Advance"}></Button>
                {/* <Button name={"Upload File"} classes='w-auto mr-1' onClick={(e) => {
                    setFileOpen(prev=>!prev)
                }}></Button> */}
            </div>}
            table={table}
            // templateButton={["/template/Circle.xlsx","Circle.xlsx"]}
            // exportButton={["/export/manageCircle","Export_Circle("+dt+").xlsx"]}
            filterAfter={onSubmit}
            tableName={"UserListTable"}
            handleSubmit={handleSubmit}
            data={dbConfigList}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
            totalCount={dbConfigTotalCount}
            heading={'Total -'}
        />

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        {/* <CommonForm/> */}
        <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen} tempbtn={true} tempbtnlink={["/template/Circle.xlsx", "Circle.xlsx"]} />
    </>


};

export default FillAdvance;