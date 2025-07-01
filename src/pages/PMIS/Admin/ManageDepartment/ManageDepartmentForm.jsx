import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../components/Modal';
import CommonForm from '../../../../components/CommonForm';
import Button from '../../../../components/Button';
import AdminActions from '../../../../store/actions/admin-actions';

const ManageDepartmentForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {


    const [modalOpen, setmodalOpen] = useState(false)


    let dispatch = useDispatch()

    let roleList = useSelector((state) => {
        console.log(state, "state state")
        return state?.adminManagement?.roleList
    })
    let databaseList = useSelector((state) => {
        console.log(state, "state")
        let interdata = state?.customQuery?.databaseList

        console.log(interdata, "interdatainterdata")
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
            label: "Customer",
            value: "",
            name: "customer",
            type: "select",
            option:customerList,
            required: true,
            props: {
                onChange: ((e) => {
                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Department",
            value: "",
            name: "department",
            type: "text",
            required: true,
            filter: true,
            props: {
                onChange: ((e) => {
                }),
            },
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
    const onSubmit = (data) => {
    }
    const onTableViewSubmit = (data) => {
        if (formValue.uniqueId) {
            dispatch(AdminActions.postManageDepartment(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageDepartment())
            }, formValue.uniqueId))
        } else {
            dispatch(AdminActions.postManageDepartment(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageDepartment())
            }))
        }
    }
    console.log(Form, "Form 11")
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
            Form.forEach((key) => {
                if (["endAt", "startAt"].indexOf(key.name) != -1) {
                    console.log("date formValuekey", key.name, formValue[key.name])
                    const momentObj = moment(formValue[key.name]);
                    setValue(key.name, momentObj.toDate());


                } else {
                    // console.log("formValuekey",key,key)
                    setValue(key.name, formValue[key.name]);
                }
            })
        }
    }, [formValue, resetting])
    return <>


        <Modal size={"xl"} children={<><CommonForm classes={"grid-cols-1 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} /></>} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
            <CommonForm classes={"grid-cols-2 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            <Button classes={"mt-2 w-sm text-center flex mx-auto"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
        </div>
    </>


};

export default ManageDepartmentForm;