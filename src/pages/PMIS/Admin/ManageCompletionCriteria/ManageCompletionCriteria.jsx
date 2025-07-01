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
import OperationManagementActions from '../../../../store/actions/admin-actions';
import AdminActions from '../../../../store/actions/admin-actions';
import ManageCompletionCriteriaForm from '../../../../pages/PMIS/Admin/ManageCompletionCriteria/ManageCompletionCriteriaForm'

const ManageCompletionCriteria = () => {

    const [modalOpen, setmodalOpen] = useState(false)
    const [fileOpen, setFileOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)


    let dispatch = useDispatch()

    
    let dbConfigList = useSelector((state) => {
        let interdata = state?.adminData?.getManageCompletionCriteria  || []
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,
                
                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    dispatch(AdminActions.getManageCompletionCriteria())
                    setmodalHead("Edit Profile")
                    setmodalBody(<>
                        <ManageCompletionCriteriaForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                    </>)
                }}></EditButton>} />,
                
                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-rose-400' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.admin_completion_criteria}/${itm.uniqueId}`, () => {
                                    dispatch(AdminActions.getManageCompletionCriteria())
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
        let interdata = state?.adminData?.getManageCompletionCriteria || []
        if (interdata.length > 0) {
            return interdata[0]["overall_table_count"]
        } else {
            return 0
        }
    })

    const {register,handleSubmit,watch,setValue,setValues,getValues,formState: { errors },} = useForm()

    let table = {
        columns: [
            {
                name: "Completion Criteria",
                value: "completion",
                style: "min-w-[140px] max-w-[200px] text-center"
            },                   
            {
                name: "Type",
                value: "type",
                style: "min-w-[100px] max-w-[200px] text-center"
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
        dispatch(AdminActions.getManageCompletionCriteria(value, objectToQueryString(data)))
    }

    useEffect(() => {
        dispatch(AdminActions.getManageCompletionCriteria())
    }, [])

    // const onTableViewSubmit = (data) => { 
    //     console.log(data, "datadata")
    //     data["fileType"]="ManageCircle"
    //     data['collection'] = "circle"
    //     dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
    //         dispatch(AdminActions.getManageCircle())
    //         setFileOpen(false)
    //     }))
    // }
    return <>
        <AdvancedTable
            headerButton={
                <div className='flex gap-1'>
                    <Button classes='w-auto' 
                        onClick={(e) => {
                            setmodalOpen(prev => !prev)
                            setmodalHead("New Completion Criteria")
                            setmodalBody(
                                <ManageCompletionCriteriaForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />
                            )
                        }}
                        name={"Add Completion Criteria"}>
                    </Button>

                    {/* <Button name={"Upload File"} classes='w-auto ' 
                        onClick={(e) => {
                            setFileOpen(prev=>!prev)
                        }}>
                    </Button> */}
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
            heading = {'Total Completion Criteria :- '}
        />
        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />
        {/* <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen}  /> */}
    </>

};

export default ManageCompletionCriteria;