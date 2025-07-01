import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../../components/EditButton';
import ManageClaimTypeDesignationForm from '../../../../pages/PMIS/Admin/ManageClaimTypeDesignation/ManageClaimTypeDesignationForm'
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
import AdminActions from '../../../../store/actions/admin-actions';
import FileUploader from '../../../../components/FIleUploader';

const ManageClaimTypeDesignation = () => {

    const [modalOpen, setmodalOpen] = useState(false)
    const [fileOpen, setFileOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)

    let dispatch = useDispatch()

    const currentDate = new Date();
    const dt = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '-')
    
    let dbConfigList = useSelector((state) => {
        let interdata = state?.adminData?.getManageClaimTypeDesignation || []
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,              
                
                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    dispatch(AdminActions.getManageClaimTypeDesignation(true, `claimTypeId=${itm?.uniqueId}`))
                    setmodalHead("Edit ClaimType Grade")
                    setmodalBody(<>
                        <ManageClaimTypeDesignationForm isEditable={true} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
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
                                dispatch(CommonActions.deleteApiCaller(`${Urls.admin_claim_type_designation}/${itm.uniqueId}`, () => {
                                    dispatch(AdminActions.getManageClaimTypeDesignation())
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
        let interdata = state?.adminData?.getManageClaimTypeDesignation || []
        if (interdata.length > 0) {
            return interdata[0]["overall_table_count"]
        } else {
            return 0
        }
    })

    let claimTypeHeaders = useSelector((state) => {
        let interdata = state?.adminData?.getManageClaimType || [""]
        return interdata
    })

    const {register,handleSubmit,watch,setValue,setValues,getValues,formState: { errors },} = useForm()



    let hh = claimTypeHeaders.map((item) => { 
        return {
            name: item.claimType,
            value: item.claimType,
            style:'min-w-[140px] max-w-[200px] text-center'
        };
    });

    let table = {
        columns: [
            {
                name: "Grade",
                value: "designation",
                style: "min-w-[140px] max-w-[200px] text-center sticky left-0 z-10 bg-[#3e454d]"
            },          
            {
                name: "Site ID",
                value: "siteId",
                style: "min-w-[140px] max-w-[200px] text-center sticky left-[140px] z-10 bg-[#3e454d]"
            },          
            {
                name: "Task Name",
                value: "taskName",
                style: "min-w-[140px] max-w-[200px] text-center sticky left-[279px] z-10 bg-[#3e454d]"
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
    const pp=[{
        name: "Edit",
        value: "edit",
        style: "min-w-[100px] max-w-[200px] text-center"
    },
    {
        name: "Delete",
        value: "delete",
        style: "min-w-[100px] max-w-[200px] text-center"
    }]

    if (table?.columns) {
        table.columns.push(...hh);
    }
    if (table?.columns) {
        table.columns.push(...pp);
    }
    
    const onSubmit = (data) => {
        let value = data.reseter
        delete data.reseter
        dispatch(AdminActions.getManageClaimTypeDesignation(value, objectToQueryString(data)))
    }

    useEffect(() => {
        dispatch(AdminActions.getManageClaimType())
        dispatch(AdminActions.getManageClaimTypeDesignation())
    }, [modalOpen])
    

    const onTableViewSubmit = (data) => { 
        data["fileType"]="ManageClaimType"
        dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
            dispatch(AdminActions.getManageClaimTypeDesignation())
            setFileOpen(false)
        }))
    }
    return <>
        <AdvancedTable
            headerButton={<div className='flex gap-1'><Button classes='w-auto' onClick={(e) => {
                setmodalOpen(prev => !prev)
                // dispatch(AdminActions.getManageClaimTypeDesignation())
                setmodalHead("New Claim Type Grade")
                setmodalBody(<ManageClaimTypeDesignationForm claimTypeHeaders={claimTypeHeaders} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            }}
                name={"Add New"}></Button>
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
        />

        <Modal size={"smsh"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        {/* <CommonForm/> */}
        <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen} tempbtn={true} tempbtnlink = {["/template/Circle.xlsx","Circle.xlsx"]}/>
    </>


};

export default ManageClaimTypeDesignation;