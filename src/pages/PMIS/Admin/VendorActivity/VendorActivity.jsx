import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
import AdminActions from '../../../../store/actions/admin-actions';
import VendorActivityForm from './VendorActivityForm';

const VendorActivity = () => {

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
        let interdata = state?.adminData?.getPartnerActivity || [""]
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,
                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    setmodalHead("Edit Activity")
                    dispatch(AdminActions.getPartnerWorkDescription(true,`customerId=${itm.customer}`));
                    dispatch(AdminActions.getActivityAndOemCompiliance(true, `subProjectType=${itm.subProject}&partnerActivity=${"Yes"}`));
                    setmodalBody(<>
                        <VendorActivityForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                    </>)
                }}></EditButton>} />,
                
                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-rose-400' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.admin_partner_activity}/${itm.uniqueId}`, () => {
                                    dispatch(ALERTS({ show: false }))
                                    dispatch(AdminActions.getPartnerActivity())
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
        let interdata = state?.adminData?.getPartnerActivity
        if (interdata.length > 0) {
            return interdata[0]["overall_table_count"]
        } else {
            return 0
        }
    })


    const {register,handleSubmit,watch,setValue,setValues,getValues,formState: { errors }} = useForm()

    let table = {
        columns: [
            {
                name: "Customer",
                value: "customerName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Project Type",
                value: "projectType",
                style: "min-w-[140px] max-w-[200px] text-center"
            },          
            {
                name: "Sub Project Type",
                value: "subProjectTypeName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },          
            {
                name: "Work Description",
                value: "workDescriptionName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },          
            {
                name: "MS List",
                value: "milestone",
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
        filter: []
    }

    const onSubmit = (data) => {
        let value = data.reseter
        delete data.reseter
        dispatch(AdminActions.getPartnerActivity(value, objectToQueryString(data)))
    }

    useEffect(() => {
        dispatch(AdminActions.getPartnerActivity())
    }, [])


    return <>
        <AdvancedTable
            headerButton={
                <div className='flex gap-1'>
                    <Button 
                        classes='w-auto' 
                        onClick={(e) => {
                            setmodalOpen(prev => !prev)
                            setmodalHead("New Activity")
                            setmodalBody(<VendorActivityForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
                        }}
                        name={"Add"}>
                    </Button>
                    <Button 
                        name={"Export"} 
                        classes='w-auto mr-1' 
                        onClick={(e) => {
                            // dispatch(CommonActions.commondownload("/export/manageCircle","Export_Circle("+dt+").xlsx"))
                            dispatch(CommonActions.commondownload("/export/partnerActivity","Export_Partner_Activity.xlsx"))
                        }}>
                    </Button>
                </div>
            }
            table={table}
            filterAfter={onSubmit}
            tableName={"PartnerActivity"}
            handleSubmit={handleSubmit}
            data={dbConfigList}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
            totalCount={dbConfigTotalCount}
            heading = {"Total:- "}
        />

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />
    </>
};

export default VendorActivity;