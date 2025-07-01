import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../../components/EditButton';
import ManageProjectGroupForm from '../../../../pages/PMIS/Admin/ManageProjectGroup/ManageProjectGroupForm';
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

const ManageProjectGroup = () => {

    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)


    let dispatch = useDispatch()
  

    let dbConfigList = useSelector((state) => {
        let interdata = state?.adminData?.getManageProjectGroup
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,
                // projectGroupId: `${itm.costCenter || ''}-${itm.shortName || ''}-${itm.shortCode || ''}`,
                "status": <CstmButton child={<ToggleButton onChange={(e) => {
                    console.log(e.target.checked, "e.target.checked")
                    let data = {
                        "enabled": e.target.checked ? 1 : 0
                    }
                    dispatch(AlertConfigurationActions.patchAlertConfig(true, data, () => {
                        // alert(e.target.checked)
                        e.target.checked = e.target.checked
                    }, itm.id))
                    // if(itm.enabled==0){ 
                    //     itm.enabled=1
                    // }else{
                    //     itm.enabled=0
                    // }
                    // itm.enabled=itm.enabled==0?1:0
                    console.log(itm.enabled, "itm.enabled")
                }} defaultChecked={itm.enabled == 1 ? true : false}></ToggleButton>} />,
                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    dispatch(AdminActions.getManageProjectGroup())
                    setmodalHead("Edit Project Group")
                    setmodalBody(<>
                        <ManageProjectGroupForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
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
                                dispatch(CommonActions.deleteApiCaller(`${Urls.admin_project_group}/${itm.uniqueId}`, () => {
                                    dispatch(AdminActions.getManageProjectGroup())
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
        let interdata = state?.adminData?.getManageProjectGroup
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
                name: "Project Group ID",
                value: "projectGroupId",
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
        // console.log("jsjsjsjss", data)
        let value = data.reseter
        delete data.reseter
        dispatch(AdminActions.getManageProjectGroup(value, objectToQueryString(data)))
    }
    useEffect(() => {
        dispatch(AdminActions.getManageProjectGroup())
        // dispatch(OperationManagementActions.getRoleList())
    }, [])
    return <>
        <AdvancedTable
            headerButton={<><Button classes='mr-1' onClick={(e) => {
                setmodalOpen(prev => !prev)
                // dispatch(AdminActions.getManageCircle())
                setmodalHead("New Project Group")
                setmodalBody(<ManageProjectGroupForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            }}
                name={"Add Project Group"}></Button>
                <Button name={"Export"} classes='w-auto mr-1' onClick={(e) => {
                    dispatch(CommonActions.commondownload("/export/manageProjectGroup","ProjectGroup.xlsx"))
                }}></Button>
                </>}
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
            heading = {"Total Project Group :- "}
        />

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        {/* <CommonForm/> */}
    </>


};

export default ManageProjectGroup;