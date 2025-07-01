import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../components/Modal';
import CommonForm from '../../../../components/CommonForm';
import Button from '../../../../components/Button';
import AdminActions from '../../../../store/actions/admin-actions';



const ManageProjectGroupForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {

    // console.log(isOpen, setIsOpen, resetting, formValue, "formValueformValue")

    const [modalOpen, setmodalOpen] = useState(false)

    let dispatch = useDispatch()

    let customerList = useSelector((state) => {
        // console.log(state?.adminData?.getManageCustomer, "state?.adminData?.customerList")
        return state?.adminData?.getManageCustomer.map((itm) => {
            return {
                label: itm.shortName,
                value: itm.uniqueId
            }
        })
    })

    let costCenterList = useSelector((state) => {
        return state?.adminData?.getManageCostCenter.map((itm) => {
            return {
                label: itm.costCenter,
                value: itm.uniqueId
            }
        })
    })

    let zoneList = useSelector((state) => {
        return state?.adminData?.getManageZone.map((itm) => {
            return {
                label: itm.shortCode,
                value: itm.uniqueId
            }
        })
    })

    let Form = [
        {
            label: "Customer",
            value: "select",
            name: "customerId",
            type: "select",
            option: customerList,
            required: true,
            filter: true,
            props: {
                onChange: ((e) => {
                    dispatch(AdminActions.getManageZone(true, `customer=${e.target.value}`))
                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Zone",
            value: "select",
            name: "zoneId",
            type: "select",
            option: zoneList,
            required: true,
            filter: true,
            props: {
                onChange: ((e) => {
                    dispatch(AdminActions.getManageCostCenter(true, `zone=${e.target.value}`))
                    // console.log(selectedValue, "egeeter")

                    // setValue("queries",e.target.name)

                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Cost Center",
            value: "select",
            name: "costCenterId",
            type: "select",
            option: costCenterList,
            required: true,
            filter: true,
            props: {
                onChange: ((e) => {
                    // console.log(e.target.value, "e geeter")

                    // setValue("queries",e.target.name)

                }),
            },
            classes: "col-span-1"
        },
    ]
    const { register, handleSubmit, watch, reset, setValue, getValues, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        // dispatch(AuthActions.signIn(data, () => {
        //     navigate('/authenticate')
        // }))
    }

    const onTableViewSubmit = (data) => {
        if (formValue.uniqueId) {
            dispatch(AdminActions.postManageProjectGroup(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageProjectGroup())
            }, formValue.uniqueId))
        } else {
            dispatch(AdminActions.postManageProjectGroup(true, data, () => {
                console.log("CustomQueryActions.postDBConfig")
                setIsOpen(false)
                dispatch(AdminActions.getManageProjectGroup())
            }))
        }
    }

    console.log(Form, "Form 11")
    useEffect(() => {
        dispatch(AdminActions.getManageCustomer())
        dispatch(AdminActions.getManageZone())

        // dispatch(AdminActions.getManageProjectGroup())

        // alert(resetting)
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
                    console.log(key.name, "key.name", formValue[key.name])
                    // console.log(formValue[key.name],"formValue[key.name]")

                    dispatch(AdminActions.getManageCostCenter())
                }
            })
        }
    }, [formValue, resetting])
    return <>


        <Modal size={"xl"} children={<><CommonForm classes={"grid-cols-1 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} /></>} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">

            <CommonForm classes={"grid-cols-1 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            {/* <button></button> */}


            {/* <button onClick={() => { setmodalOpen(true) }} className='flex bg-primaryLine mt-6 w-42 absolute right-1 top-1 justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Add DB Type <Unicons.UilPlus /></button> */}
            {/* <Table headers={["S.No.", "DB Type", "DB Server", "DB Name", "Created By", "Created Date", "Last Modified By", "Last Modified Date", "Actions"]} columns={[["1", "abcd", "ancd", "abcd", "ancd"], ["2", "adsa", "dasdas", "abcd", "ancd"]]} /> */}
            {/* <button onClick={(handleSubmit(onTableViewSubmit))} className='bg-primaryLine mt-6 w-full justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Submit</button> */}
            <Button classes={"mt-2 w-sm text-center flex mx-auto"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
        </div>
    </>


};

export default ManageProjectGroupForm;