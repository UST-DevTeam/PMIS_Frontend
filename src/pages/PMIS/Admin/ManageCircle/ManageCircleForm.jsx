import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../components/Modal';
import CommonForm from '../../../../components/CommonForm';
import Button from '../../../../components/Button';
import AdminActions from '../../../../store/actions/admin-actions';

const ManageCircleForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {

    const [modalOpen, setmodalOpen] = useState(false)


    let dispatch = useDispatch()


    let roleList = useSelector((state) => {
        return state?.adminManagement?.roleList
    })

    let databaseList = useSelector((state) => {
        let interdata = state?.customQuery?.databaseList
        return state?.customQuery?.databaseList
    })

    let customerList = useSelector((state) => {
        return state?.adminData?.getManageCustomer.map((itm) => {
            return {
                label: itm?.customerName,
                value: itm?.uniqueId
            }
        })
    })

    let Form = [
        {
            label: "Customer Name",
            value: "",
            name: Object.entries(formValue).length > 0  ? "customerName" : "customer",
            type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
            required: true,
            option: customerList,
            classes: "col-span-1"
        },
        {
            label: "Circle Name",
            value: "",
            name: "circleName",
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
            label: "Circle ID",
            value: "",
            type: Object.entries(formValue).length > 0 ? "sdisabled" : "text",
            name: "circleCode",
            required: true,
            props: {
                onChange: ((e) => {

                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Band",
            value: "",
            name: "band",
            type: "text",
            // required: true,
            props: {
                onChange: ((e) => {

                }),
            },
            classes: "col-span-1"
        }
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
            dispatch(AdminActions.postManageCircle(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageCircle())
            }, formValue.uniqueId))
        } else {
            dispatch(AdminActions.postManageCircle(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageCircle())
            }))
        }
    }
    // console.log(Form, "Form 11")
    useEffect(() => {
        dispatch(AdminActions.getManageCustomer())
        if (resetting) {
            reset({})
            Form.map((fieldName) => {
                setValue(fieldName["name"], fieldName["value"]);
            });
        } else {
            reset({})
            console.log(Object.keys(formValue), "Object.keys(formValue)")
            Object.keys(formValue).forEach((key) => {

                if (["endAt", "startAt"].indexOf(key.name) != -1) {
                    console.log("date formValuekey", key.name, formValue[key.name])
                    const momentObj = moment(formValue[key.name]);
                    setValue(key.name, momentObj.toDate());


                } else {
                    // console.log("formValuekey",key,key)
                    setValue(key, formValue[key]);
                }
            })
        }
    }, [formValue, resetting])
    return <>


        <Modal size={"xl"} children={<><CommonForm classes={"grid-cols-1 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} /></>} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
            <CommonForm classes={"grid-cols-1 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            <Button classes={"mt-2 w-sm text-center flex mx-auto"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
        </div>
    </>
};



export default ManageCircleForm;