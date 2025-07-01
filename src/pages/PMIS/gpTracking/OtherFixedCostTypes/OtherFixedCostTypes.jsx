import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../../components/EditButton';
// import ManageCircleForm from '../../../../pages/PMIS/Admin/ManageCircle/ManageCircleForm'
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
import OtherFixedCostTypesForm from './OtherFixedCostTypesForm';
import gpTrackingActions from '../../../../store/actions/gpTrackingActions';
const OtherFixedCostTypes = () => {

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
        
        let interdata = state?.gpTrackingReducer?.getOtherFixedCostTypes || [""]
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,

                unitRate: `${itm.unitRate}/km`, 

                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    dispatch(gpTrackingActions.getGPOtherFixedCostTypes())
                    setmodalHead("Edit Unit Rate")
                    setmodalBody(<>
                        <OtherFixedCostTypesForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                        {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>)
                    // console.log('ahshshhs',itm)
                    //setmodalOpen(false)
                }}></EditButton>} />,
                
                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-rose-400' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.gpTracking_OtherCostTypes}/${itm.uniqueId}`, () => {
                                    dispatch(gpTrackingActions.getGPOtherFixedCostTypes())
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
        let interdata = state?.gpTrackingReducer?.getOtherFixedCostTypes || 0
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
                name: "Cost Type",
                value: "costType",
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
        // dispatch(AdminActions.getManageClaimTypeUnitRate(value, objectToQueryString(data)))
        dispatch(gpTrackingActions.getGPOtherFixedCostTypes(value, objectToQueryString(data)))

    }

    useEffect(() => {
        // dispatch(AdminActions.getManageClaimTypeUnitRate())
        dispatch(gpTrackingActions.getGPOtherFixedCostTypes())
    }, [])

    const onTableViewSubmit = (data) => { 
        data["fileType"]="ManageCircle"
        dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
            // dispatch(AdminActions.getManageClaimTypeUnitRate())
            dispatch(gpTrackingActions.getGPOtherFixedCostTypes())
            setFileOpen(false)
        }))
    }
    return <>
        <AdvancedTable
            headerButton={<div className='flex gap-1'><Button classes='w-auto' onClick={(e) => {
                setmodalOpen(prev => !prev)
                setmodalHead("New Cost Type")
                setmodalBody(<OtherFixedCostTypesForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            }}
                name={"Add New Cost Type"}>                  
                </Button>
                {/* <Button name={"Upload File"} classes='w-auto mr-1' onClick={(e) => {
                    setFileOpen(prev=>!prev)
                }}>

                </Button> */}
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
            heading = {'Total Count :-'}
        />

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        {/* <CommonForm/> */}
        <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen} tempbtn={true} tempbtnlink = {["/template/Circle.xlsx","Circle.xlsx"]}/>
    </>


};

export default OtherFixedCostTypes;