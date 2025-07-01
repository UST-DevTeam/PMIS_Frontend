import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
import AdminActions from '../../../../store/actions/admin-actions';
import ManageDepartmentForm from '../../../../pages/PMIS/Admin/ManageDepartment/ManageDepartmentForm'

const ManageDepartment = () => {

    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)


    let dispatch = useDispatch()

    
    let dbConfigList = useSelector((state) => {
        let interdata = state?.adminData?.getManageDepartment
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,
                "status": <CstmButton child={<ToggleButton onChange={(e) => {
                    console.log(e.target.checked, "e.target.checked")
                    let data = {
                        "enabled": e.target.checked ? 1 : 0
                    }
                    dispatch(AlertConfigurationActions.patchAlertConfig(true, data, () => {
                        e.target.checked = e.target.checked
                    }, itm.id))
                    console.log(itm.enabled, "itm.enabled")
                }} defaultChecked={itm.enabled == 1 ? true : false}></ToggleButton>} />,
                
                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    dispatch(AdminActions.getManageDepartment())
                    setmodalHead("Edit Department")
                    setmodalBody(<>
                        <ManageDepartmentForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
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
                                dispatch(CommonActions.deleteApiCaller(`${Urls.admin_department}/${itm.uniqueId}`, () => {
                                    dispatch(AdminActions.getManageDepartment())
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
        let interdata = state?.adminData?.getManageDepartment
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
                name: "Customer",
                value: "customerName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },           
            {
                name: "Department",
                value: "department",
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
        dispatch(AdminActions.getManageDepartment(value, objectToQueryString(data)))
    }

    useEffect(() => {
        dispatch(AdminActions.getManageDepartment())
    }, [])

    return <>
        <AdvancedTable
            headerButton={
                <div className='flex gap-1'>
                    <Button classes='w-auto' 
                        onClick={(e) => {
                            setmodalOpen(prev => !prev)
                            setmodalHead("New Department")
                            setmodalBody(
                                <ManageDepartmentForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />
                            )
                        }}
                        name={"Add Department"}>
                    </Button>
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
            heading = {'Total Department :- '}
        />
        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />
    </>

};

export default ManageDepartment;