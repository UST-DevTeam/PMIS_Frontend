import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../../components/EditButton';
import ManageUserProjectAllocForm from '../../../../pages/PMIS/Admin/ManageUserProjectAllocation/ManageUserProjectAllocForm'
import AdvancedTable from '../../../../components/AdvancedTable';
import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import CstmButton from '../../../../components/CstmButton';
import { objectToQueryString } from '../../../../utils/commonFunnction';
import CommonActions from '../../../../store/actions/common-actions';
import { Urls } from '../../../../utils/url';
import AdminActions from '../../../../store/actions/admin-actions';
import FileUploader from '../../../../components/FIleUploader';

const ManageUserProjectAllocation = () => {

    const [modalOpen, setmodalOpen] = useState(false)
    const [fileOpen, setFileOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    const [strValFil, setstrVal] = useState(false);
    let dispatch = useDispatch()

    let roleList = useSelector((state) => {
        return state?.adminData?.getManageProfile.map((itm) => {
          return {
            label: itm?.roleName,
            value:itm?.uniqueId
          };
        });
    });
    
    let dbConfigList = useSelector((state) => {
        let interdata = state?.adminData?.getProjectAllocation
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,
                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    // dispatch(AdminActions.getProjectAllocation())
                    setmodalHead("Project Allocation")
                    setmodalBody(<>
                        <ManageUserProjectAllocForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                    </>)
                }}></EditButton>} />,
            }
            return updateditm
        });
    })

    let dbConfigTotalCount = useSelector((state) => {
        let interdata = state?.adminData?.getProjectAllocation
        console.log(interdata,"1234567890")
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
                name: "Employee",
                value: "emp",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Profile",
                value: "userRole",
                style: "min-w-[140px] max-w-[160px] text-center"
            },                     
            {
                name: "Project",
                value: "projectIdName",
                style: "min-w-[300px] max-w-[250px] text-center"
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
        filter: [
            {
                label: "Employee",
                type:"text",
                name: "empUniqueId",
                props: {
                }
            },
            {
                label: "Project",
                type: "text",
                name: "project",
                props: {
                }
            },
            {
                label: "Profile",
                type: "select",
                name: "profile",
                option: roleList,
                props: {
                }
            },
        ]
    }

    const onSubmit = (data) => {
        let value = data.reseter
        delete data.reseter
        let strVal=objectToQueryString(data)
        setstrVal(strVal)
        dispatch(AdminActions.getProjectAllocation(value, objectToQueryString(data),strVal))
    }

    useEffect(() => {
        dispatch(AdminActions.getProjectAllocation())
        dispatch(AdminActions.getManageProfile())
    }, [])

    const onTableViewSubmit = (data) => { 
        data["fileType"]="userProjectAllocation"
        dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
            dispatch(AdminActions.getProjectAllocation())
            setFileOpen(false)
        }))
    }
    return <>
        <AdvancedTable
            headerButton={
                <div className='flex gap-1'>
                    <Button name={"Upload"} classes='w-auto' onClick={(e) => {
                        setFileOpen(prev=>!prev)
                    }}></Button>
                    <Button name={"Export"} classes='w-auto mr-1 ' onClick={(e) => {
                        dispatch(CommonActions.commondownload("/export/userProjectAllocation"+"?"+strValFil,"Export_User_Project_Allocation.xlsx"))
                    }}></Button>
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
            heading={'Total Employee :- '}
        />

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />
        <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen}  tempbtn={true} tempbtnlink = {["/template/UserProjectAllocation.xlsx","UserProjectAllocation.xlsx"]} />
    </>
};

export default ManageUserProjectAllocation;