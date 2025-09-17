import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import AdvancedTable from '../../../components/AdvancedTable';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import DeleteButton from '../../../components/DeleteButton';
import CstmButton from '../../../components/CstmButton';
import { objectToQueryString } from '../../../utils/commonFunnction';
import { ALERTS } from '../../../store/reducers/component-reducer';
import CommonActions from '../../../store/actions/common-actions';
import { Urls } from '../../../utils/url';
import FileUploader from '../../../components/FIleUploader';
import AirtelMappedCircleForm from './AirtelMappedCircleForm';
import AirtelActions from '../../../store/actions/airtel-actions';

const AirtelMappedCircle = () => {

    const [modalOpen, setmodalOpen] = useState(false)
    const [fileOpen, setFileOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)

    let dispatch = useDispatch()
    
    let dbConfigList = useSelector((state) => {
        let interdata = state?.airtelData?.getAirtelMappedCircle || [""]
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,
                
                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-rose-400' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.airtelMappedCircle}/${itm.uniqueId}`, () => {
                                    dispatch(AirtelActions.getAirtelMappedCircle())
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
        let interdata = state?.airtelData?.getAirtelMappedCircle
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
                name: "Airtel Circle",
                value: "airtelCircle",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "MCOM Circle",
                value: "mcomCircle",
                style: "min-w-[140px] max-w-[200px] text-center"
            },          
            // {
            //     name: "Edit",
            //     value: "edit",
            //     style: "min-w-[100px] max-w-[200px] text-center"
            // },
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
        dispatch(AirtelActions.getAirtelMappedCircle(value, objectToQueryString(data)))
    }

    useEffect(() => {
        dispatch(AirtelActions.getAirtelMappedCircle())
    }, [])

    const onTableViewSubmit = (data) => { 
        data["fileType"]="ManageCircle"
        data['collection'] = "circle"
        dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
            dispatch(AirtelActions.getAirtelMappedCircle())
            setFileOpen(false)
        }))
    }

    return <>
        <AdvancedTable
            headerButton={<div className='flex gap-1'><Button classes='w-auto' onClick={(e) => {
                setmodalOpen(prev => !prev)
                setmodalHead("New Circle")
                setmodalBody(<AirtelMappedCircleForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            }}
                name={"Add Circle"}></Button>

                {/* <Button name={"Upload File"} classes='w-auto mr-1' onClick={(e) => {
                    setFileOpen(prev=>!prev)
                }}></Button> */}

                <Button name={"Export"} classes='w-auto mr-1' onClick={(e) => {
                    dispatch(CommonActions.commondownload("/export/airtelMappedCircle","Export_Airtel_MCOM_Circle.xlsx"))
                }}></Button>

                </div>}
            table={table}
            filterAfter={onSubmit}
            tableName={"AirtelMappedCircle"}
            handleSubmit={handleSubmit}
            data={dbConfigList}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
            totalCount={dbConfigTotalCount}
            heading = {"Total Circle :- "}
            actions = {['Delete']}
        />

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />
        <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen} tempbtn={true} tempbtnlink = {["/template/Circle.xlsx","Circle.xlsx"]} />
    </>


};

export default AirtelMappedCircle;