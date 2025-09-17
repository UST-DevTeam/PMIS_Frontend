import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import CommonForm from '../../../components/CommonForm';
import Button from '../../../components/Button';
import AirtelActions from '../../../store/actions/airtel-actions';

const AirtelMappedCircleForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {


    let dispatch = useDispatch()

    let airtelCircleList = useSelector((state) => {
        return state?.airtelData?.getAirtelCircleList.map((itm) => {
            return {
                label: itm?.circleCode,
                value: itm?.uniqueId
            }
        })
    })

    let Form = [
        {
            label: "Airtel Circle",
            value: "",
            name: "airtelCircle",
            type: "text",
            required: true,
            props: {
                onChange: ((e) => {
                    // console.log(e.target.value, "e geeter")
                }),
            },
            classes: "col-span-1"
        },
        {
            label: "MCOM Circle",
            value: "",
            type:"select",
            name: "mcomCircle",
            required: true,
            props: {
                onChange: ((e) => {

                }),
            },
            option:airtelCircleList,
            classes: "col-span-1"
        },
    ]

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        getValues,
        formState: { errors },
    } = useForm()


    const onTableViewSubmit = (data) => {
        if (formValue.uniqueId) {
            dispatch(AirtelActions.postAirtelMappedCircle(true, data, () => {
                setIsOpen(false)
                dispatch(AirtelActions.getAirtelMappedCircle())
            }, formValue.uniqueId))
        } else {
            dispatch(AirtelActions.postAirtelMappedCircle(true, data, () => {
                setIsOpen(false)
                dispatch(AirtelActions.getAirtelMappedCircle())
            }))
        }
    }

    useEffect(() => {
        dispatch(AirtelActions.getAirtelCircleList())
        if (resetting) {
            reset({})
            Form.map((fieldName) => {
                setValue(fieldName["name"], fieldName["value"]);
            });
        } else {
            reset({})
            Object.keys(formValue).forEach((key) => {
                if (["endAt", "startAt"].indexOf(key.name) != -1) {
                    const momentObj = moment(formValue[key.name]);
                    setValue(key.name, momentObj.toDate());
                } else {
                    setValue(key, formValue[key]);
                }
            })
        }
    }, [formValue, resetting])

    return <>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
            <CommonForm classes={"grid-cols-2 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            <Button classes={"mt-2 w-sm text-center flex mx-auto"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
        </div>
    </>
};



export default AirtelMappedCircleForm;