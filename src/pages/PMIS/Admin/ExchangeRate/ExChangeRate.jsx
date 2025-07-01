import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../../components/EditButton';
import AdvancedTable from '../../../../components/AdvancedTable';
import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import DeleteButton from '../../../../components/DeleteButton';
import CstmButton from '../../../../components/CstmButton';
import { ALERTS } from '../../../../store/reducers/component-reducer';
import CommonActions from '../../../../store/actions/common-actions';
import { Urls } from '../../../../utils/url';
import AdminActions from '../../../../store/actions/admin-actions';
import ExchangeForm from './ExchangeForm';


const ExChangeRate = () => {

    const [modalOpen, setmodalOpen] = useState(false)
    const [fileOpen, setFileOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)

    let dispatch = useDispatch()

    
    let dbConfigList = useSelector((state) => {
        let interdata = state?.adminData?.getExchnageRate || [""]
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,
                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    setmodalHead("Edit")
                    setmodalBody(<>
                        <ExchangeForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                    </>)
                }}></EditButton>} />,
                
                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-rose-400' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.exchangeRate}/${itm.uniqueId}`, () => {
                                    dispatch(ALERTS({ show: false }))
                                    dispatch(AdminActions.getExchnageRate())
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
        let interdata = state?.adminData?.getExchnageRate
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
            name: "Exchange Year",
            value: "year",
            style: "min-w-[140px] max-w-[200px] text-center"
          },
          {
            name: "Rate",
            value: "rate",
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
    }

    useEffect(() => {
      dispatch(AdminActions.getExchnageRate())
    }, [])


    return <>
        <AdvancedTable
            headerButton={
                <div className='flex gap-1'>
                    <Button 
                        classes='w-auto' 
                        onClick={(e) => {
                            setmodalOpen(prev => !prev)
                            setmodalHead("Exchnage Rate")
                            setmodalBody(<ExchangeForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
                        }}
                        name={"Add"}>
                    </Button>
                </div>
            }
            table={table}
            filterAfter={onSubmit}
            tableName={"ExchangeRate"}
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

export default ExChangeRate;