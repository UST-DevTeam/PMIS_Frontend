import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../components/EditButton';
import EmpDetails from './EmpDetails';
import AdvancedTable from '../../../components/AdvancedTable';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import DeleteButton from '../../../components/DeleteButton';
import CstmButton from '../../../components/CstmButton';
import ToggleButton from '../../../components/ToggleButton';
import { objectToQueryString } from '../../../utils/commonFunnction';
import { ALERTS } from '../../../store/reducers/component-reducer';
import CommonActions from '../../../store/actions/common-actions';
import { Urls, backendassetUrl, baseUrl } from '../../../utils/url';
import OperationManagementActions from '../../../store/actions/admin-actions';
import AdminActions from '../../../store/actions/admin-actions';
import { useNavigate, useParams } from 'react-router-dom';




const Asset = () => {


    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [type, settype] = useState(false)
    const [modalHead, setmodalHead] = useState(<></>)


    let dispatch = useDispatch()

    let navigate = useNavigate()







    let dbConfigList = useSelector((state) => {
        console.log(state, "state statejjjj")
        let interdata = state?.adminData?.getManageCustomer
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,

                // imgshow: <img src={backendassetUrl + itm?.companyimg} />,
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
                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    dispatch(AdminActions.getManageCustomer())
                    setmodalHead("Edit Customer Details")
                    setmodalBody(<>
                        <ManageCustomerForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                        {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>)
                }}></EditButton>} />,

                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-rose-400' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.admin_customer}/${itm.uniqueId}`, () => {
                                    dispatch(AdminActions.getManageCustomer())
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
                }}></DeleteButton>} />,


                "view": <CstmButton className={"p-5"} child={<Button name={""} onClick={() => {
                    setmodalOpen(true)
                    setmodalHead("Show PDF")
                    setmodalBody(<>

                        {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>)
                }}></Button>} />,




            }
            return updateditm
        });
    })
    let dbConfigTotalCount = useSelector((state) => {
        let interdata = state?.adminData?.getManageCustomer
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
    const { register, handleSubmit, watch, setValue, setValues, getValues, formState: { errors } } = useForm()

    let table = {
        columns: [
            {
                name: "Employee Name",
                value: "empName",
                style: "min-w-[140px] max-w-[200px] text-center sticky left-0 bg-[#3e454d]"
            },
            {
                name: "Emp ID",
                value: "empId",
                style: "min-w-[250px] max-w-[450px] text-center sticky left-0 bg-[#3e454d]"
            },
            {
                name: "Reporting Manager",
                value: "reportingManager",
                style: "min-w-[250px] max-w-[450px] text-center"
            },
            {
                name: "Asset Name",
                value: "assetName",
                style: "min-w-[250px] max-w-[450px] text-center"
            },
            {
                name: "Asset Category",
                value: "assetCategory",
                style: "min-w-[250px] max-w-[450px] text-center"
            },
            {
                name: "Serial Number",
                value: "serialNumber",
                style: "min-w-[250px] max-w-[450px] text-center"
            },
            {
                name: "Tag Number",
                value: "tagNumber",
                style: "min-w-[250px] max-w-[450px] text-center"
            },
            {
                name: "Asset Description",
                value: "assetDescription",
                style: "min-w-[250px] max-w-[450px] text-center"
            },
            {
                name: "Status",
                value: "status",
                style: "min-w-[250px] max-w-[450px] text-center"
            },
            // {
            //     name: "Edit",
            //     value: "edit",
            //     style: "min-w-[100px] max-w-[100px] text-center"
            // },
            // {
            //     name: "Delete",
            //     value: "delete",
            //     style: "min-w-[100px] max-w-[100px] text-center"
            // },
            // {
            //     name: "View",
            //     value: "view",
            //     style: "min-w-[100px] max-w-[100px] text-center"
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
        let value = data.reseter
        delete data.reseter
        dispatch(AdminActions.getManageCustomer(value, objectToQueryString(data)))
    }
    useEffect(() => {
        dispatch(AdminActions.getManageCustomer())
    }, [])
    return <>
        <AdvancedTable
            headerButton={<> <Button onClick={() => {
                // navigate(`${"/empdetails"}`)
            }}
                name={"Add New"}></Button></>}
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
        />

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        {/* <CommonForm/> */}
    </>
}


export default Asset;