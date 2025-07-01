import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import { ALERTS } from '../store/reducers/component-reducer';
import { UilExclamationTriangle, UilInfoCircle } from '@iconscout/react-unicons'
import swal from 'sweetalert';
import Button from './Button';
export const SweetAlerts = () => {

    const dispatch = useDispatch()
    let swAlerts = useSelector((state) => {
        let interdata = state?.component?.alerts
        interdata = {
            ...interdata,
            buttons: interdata?.buttons?.length > 0 ? interdata?.buttons : [
                <Button classes='w-15 bg-rose-400' onClick={() => {
                    dispatch(ALERTS({ show: false }))
                }} name={"OK"} />]
        }
        return interdata
    })

    const [swalProps, setSwalProps] = useState({
        show: true,
        title: 'Example',
        text: 'Hello World',
    });

    const icons = {
        warning: <UilExclamationTriangle size="52" className={"hello"} />,
        error: <UilExclamationTriangle size="52" className={"hello"} />,
        info: <UilInfoCircle size="52" className={"hello"} />,
        success: <UilInfoCircle size="52" className={"hello"} />
    }

    const showAlert = () => {
        swal({
            title: swAlerts?.head,
            text: swAlerts?.text,
            icon: swAlerts?.icon,
            button: 'OK',
        });

        dispatch(ALERTS({ show: false }))

    };
    return <>

        {
            swAlerts?.type == 1 ? <>{showAlert()}</> : <>
                <Modal size={"sm"} isOpen={swAlerts?.show} setIsOpen={() => {
                    dispatch(ALERTS({ show: false }))
                }} children={<div className='flex h-full flex-col px-2 items-center'>



                    <div className="text-red-400">{icons[swAlerts?.icon]}</div>
                    <h1 className="text-white font-semibold mt-3">{swAlerts?.text}</h1>
                    <div className='mt-6  flex justify-evenly w-48'>
                        {swAlerts?.buttons?.map((itms) => {
                            return itms
                        })}
                    </div>
                </div>} />
            </>

        }



    </>
}


export default SweetAlerts;

