import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../../components/EditButton';
import ManageCostCenterForm from '../../../../pages/PMIS/Admin/ManageCostCenter/ManageCostCenterForm'
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
import OperationManagementActions from '../../../../store/actions/admin-actions';
import AdminActions from '../../../../store/actions/admin-actions';
import FileUploader from '../../../../components/FIleUploader';

const ManageCostCenter = () => {

    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    const [fileOpen, setFileOpen] = useState(false)


    let dispatch = useDispatch()
  

    let dbConfigList = useSelector((state) => {
        let interdata = state?.adminData?.getManageCostCenter
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
                    dispatch(AdminActions.getManageCostCenter())
                    setmodalHead("Edit")
                    setmodalBody(
                        <ManageCostCenterForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                    )
                }}></EditButton>} />,
                
                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-rose-400' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.admin_cost_center}/${itm.uniqueId}`, () => {
                                    dispatch(AdminActions.getManageCostCenter())
                                    dispatch(ALERTS({ show: false }))
                                }))
                            }} name={"OK"} />,
                            <Button classes='w-auto' onClick={() => {
                                console.log('snnsnsnsns')
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
        let interdata = state?.adminData?.getManageCostCenter
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
                name: "Customer Name",
                value: "customerName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Zone",
                value: "zoneName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Cost Center",
                value: "costCenter",
                style: "min-w-[140px] max-w-[200px] text-center"
            },           
            {
                name: "Description",
                value: "description",
                style: "min-w-[140px] max-w-[200px] text-center"
            },           
            {
                name: "Business Unit",
                value: "businessUnit",
                style: "min-w-[140px] max-w-[200px] text-center"
            }, 
            {
                name: "UST Project ID",
                value: "ustProjectId",
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
        dispatch(AdminActions.getManageCostCenter(value, objectToQueryString(data)))
    }
    useEffect(() => {
        dispatch(AdminActions.getManageCostCenter())
    }, [])

    const onTableViewSubmit = (data) => {
        data["fileType"]="ManageCostCenter"
        data['collection'] = "costCenter"
        dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
            dispatch(AdminActions.getManageCostCenter())
            setFileOpen(false)
        }))
    }


    return <>
        <AdvancedTable
            headerButton={<div className='flex gap-1'><Button classes='w-auto ' onClick={(e) => {
                setmodalOpen(prev => !prev)
                dispatch(AdminActions.getManageCostCenter())
                setmodalHead("New Cost Center")
                setmodalBody(<ManageCostCenterForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            }}
                name={"Add Cost Center"}></Button>
                <Button name={"Upload File"} classes='w-auto' onClick={(e) => {
                    setFileOpen(prev=>!prev)
                }}></Button>
                <Button name={"Export"} classes='w-auto mr-1' onClick={(e) => {
                    dispatch(CommonActions.commondownload("/export/manageCostCenter","Export_Cost_Center.xlsx"))
                }}></Button>
                </div>}
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
            heading = {"Total Cost Center :- "}
        />

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />
        <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen} tempbtn={true} tempbtnlink = {["/template/CostCenter.xlsx","CostCenter.xlsx"]}  />
    </>


};

export default ManageCostCenter;