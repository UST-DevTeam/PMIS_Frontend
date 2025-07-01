import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../../components/EditButton';
import ManageZoneForm from '../../../../pages/PMIS/Admin/ManageZone/ManageZoneForm'
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
import { GET_MANAGE_CIRCLE } from '../../../../store/reducers/admin-reducer';

const ManageZone = () => {

    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    const [fileOpen, setFileOpen] = useState(false)


    let dispatch = useDispatch()


    const currentDate = new Date();
    const dt = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '-')
  

    let dbConfigList = useSelector((state) => {
        let interdata = state?.adminData?.getManageZone
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,
                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    setmodalHead("Edit Zone")
                    dispatch(GET_MANAGE_CIRCLE({ dataAll:[], reset:true }));
                    dispatch(AdminActions.getManageCircle(true, `customer=${itm.customer}`));
                    setmodalBody(<ManageZoneForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />)
                }}></EditButton>} />,
                
                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-rose-400' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.admin_zone}/${itm.uniqueId}`, () => {
                                    dispatch(AdminActions.getManageZone())
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
        let interdata = state?.adminData?.getManageZone
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
                name: "Zone Name",
                value: "zoneName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Zone ID",
                value: "shortCode",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Circle",
                value: "circleName",
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
        dispatch(AdminActions.getManageZone(value, objectToQueryString(data)))
    }
    useEffect(() => {
        dispatch(AdminActions.getManageZone())
        dispatch(GET_MANAGE_CIRCLE({ dataAll:[], reset:true }));
    }, [])

    const onTableViewSubmit = (data) => {
        data["fileType"]="ManageZone"
        data['collection'] = "zone"
        dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
            dispatch(AdminActions.getManageZone())
            setFileOpen(false)
        }))
    }



    return <>
        <AdvancedTable
            headerButton={<div className='flex gap-1'><Button classes='w-auto ' onClick={(e) => {
                setmodalOpen(prev => !prev)
                setmodalHead("New Zone")
                dispatch(GET_MANAGE_CIRCLE({ dataAll:[], reset:true }));
                setmodalBody(<ManageZoneForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            }}
                name={"Add Zone"}></Button>
                <Button name={"Upload File"} classes='w-auto' onClick={(e) => {
                    setFileOpen(prev=>!prev)
                }}></Button>
                <Button name={"Export"} classes='w-auto mr-1' onClick={(e) => {
                    dispatch(CommonActions.commondownload("/export/manageZone","Export_Zone("+dt+").xlsx"))
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
            heading = {"Total Zone :- "}
        />

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />
        <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen} tempbtn={true} tempbtnlink = {["/template/Zone.xlsx","Zone.xlsx"]}  />
    </>


};

export default ManageZone;