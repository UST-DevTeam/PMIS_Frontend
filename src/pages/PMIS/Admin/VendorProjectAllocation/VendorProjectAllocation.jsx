import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../../components/EditButton';
import VendorProjectAllocationForm from '../../../../pages/PMIS/Admin/VendorProjectAllocation/VendorProjectAllocationForm'
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
import HrActions from '../../../../store/actions/hr-actions';
import FileUploader from '../../../../components/FIleUploader';

const VendorProjectAllocation = () => {

    const [modalOpen, setmodalOpen] = useState(false)
    const [fileOpen, setFileOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    const [strValFil, setstrVal] = useState(false);


    let dispatch = useDispatch()

    let employeeList = useSelector((state) => {
        return state?.hrReducer?.getManageEmpDetails.map((itm) => {
            return {
            label: itm?.empName + "(" + itm.empCode + ")",
            value: itm?.uniqueId
            }
        })
    })

    let employeeList2 = useSelector((state) => {
        return state?.hrReducer?.getManageEmpDetails.map((itm) => {
            return {
            label:itm?.empName + "(" + itm.empCode + ")",
            value: itm?.empCode
            }
        })
    })

    let projectList = useSelector((state) => {
        return state?.adminData?.getVishal.map((itm) => {
            return {
            label: itm?.projectId,
            value: itm?.projectId
            }
        })
    })

    let roleList = useSelector((state) => {
        return state?.adminData?.getManageProfile.map((itm) => {
            return {
                label: itm?.roleName,
                value:itm?.uniqueId
            };
        });
    });
    
    let dbConfigList = useSelector((state) => {
        let interdata = state?.adminData?.getVendorProjectAllocation
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,
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
                    dispatch(AdminActions.getVendorProjectAllocation())
                    // dispatch(AdminActions.getVishal())
                    setmodalHead("Project Allocation")
                    setmodalBody(<>
                        <VendorProjectAllocationForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                        {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>)
                    //setmodalOpen(false)
                }}></EditButton>} />,
                
                // "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                //     let msgdata = {
                //         show: true,
                //         icon: 'warning',
                //         buttons: [
                //             <Button classes='w-15 bg-rose-400' onClick={() => {
                //                 dispatch(CommonActions.deleteApiCaller(`${Urls.admin_project_allocation}/${itm.uniqueId}`, () => {
                //                     dispatch(AdminActions.getProjectAllocation())
                //                     dispatch(ALERTS({ show: false }))
                //                 }))
                //             }} name={"OK"} />,
                //             <Button classes='w-auto' onClick={() => {
                //                 console.log('snnsnsnsns')
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
        let interdata = state?.adminData?.getVendorProjectAllocation
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
                name: "Partner",
                value: "vendor",
                style: "min-w-[140px] max-w-[200px] text-center"
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
                label: "Vendor",
                type: "text",
                name: "vendor"
            },
            {
                label: "Project",
                type: "text",
                name: "project",
                // option: projectList,
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

        dispatch(AdminActions.getVendorProjectAllocation(value, objectToQueryString(data),strVal))

        
    }

    useEffect(() => {
        dispatch(AdminActions.getVendorProjectAllocation())
        // dispatch(AdminActions.getManageProfile())
        // dispatch(AdminActions.getVishal())
    }, [])

    const onTableViewSubmit = (data) => { 
        data["fileType"]="partnerProjectAllocation"
        dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
            dispatch(AdminActions.getVendorProjectAllocation())
            setFileOpen(false)
        }))
    }
    return <>
        <AdvancedTable
            headerButton={<div className='flex gap-1'>
                {/* <Button classes='w-auto ' onClick={(e) => {
                setmodalOpen(prev => !prev)
                // dispatch(AdminActions.getManageCircle())
                setmodalHead("Add Project Allocation")
                setmodalBody(<ManageUserProjectAllocForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            }}
                name={"Add New"}></Button> */}
                <Button name={"Upload"} classes='w-auto ' onClick={(e) => {
                    setFileOpen(prev=>!prev)
                }}></Button>
                <Button name={"Export"} classes='w-auto ' onClick={(e) => {
                    dispatch(CommonActions.commondownload("/export/partnerProjectAllocation"+"?"+strValFil,"Export_Partner_Project_Allocation.xlsx"))
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
            heading = {"Total Partner :- "}
        />

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        {/* <CommonForm/> */}
        <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen}  tempbtn={true} tempbtnlink = {["/template/PartnerProjectAllocation.xlsx","PartnerProjectAllocation.xlsx"]} />
    </>


};

export default VendorProjectAllocation;