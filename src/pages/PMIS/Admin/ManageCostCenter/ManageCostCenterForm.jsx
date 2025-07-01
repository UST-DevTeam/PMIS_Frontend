import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../components/Modal';
import CommonForm from '../../../../components/CommonForm';
import Button from '../../../../components/Button';
import AdminActions from '../../../../store/actions/admin-actions';
import { GET_MANAGE_ZONE } from '../../../../store/reducers/admin-reducer';

const ManageCostCenterForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {

    console.log(isOpen, setIsOpen, resetting, formValue, "formValueformValue")

    const [modalOpen, setmodalOpen] = useState(false)


    let dispatch = useDispatch()


    let zoneList = useSelector((state) => {

        return state?.adminData?.getManageZone.map((itm) => {
            return {
                label: itm.shortCode,
                value: itm.uniqueId
            }
        })
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
            name: Object.entries(formValue).length > 0 ? "customerName" : "customer",
            type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
            required: true,
            option: customerList,
            props: {
                onChange: (e) => {
                    dispatch(AdminActions.getManageZone(true, `customer=${e.target.value}`))
                }
            },
            classes: "col-span-1"
        },
        {
            label: "Zone",
            value: "",
            name: Object.entries(formValue).length > 0 ? "zoneName" : "zone",
            type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
            required: true,
            filter: true,
            option: zoneList,
            classes: "col-span-1"
        },
        {
            label: "Cost Center",
            value: "",
            name: "costCenter",
            type: Object.entries(formValue).length > 0 ? "sdisabled" : "text",
            required: true,
            classes: "col-span-1"
        },
        {
            label: "Description",
            value: "",
            name: "description",
            type: "text",
            required: true,
            classes: "col-span-1"
        },
        {
            label: "Business Unit",
            value: "",
            name: "businessUnit",
            type: "text",
            required: true,
            classes: "col-span-1"
        },
        {
            label: "UST Project ID",
            value: "",
            name: "ustProjectId",
            type: "text",
            required: true,
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
        console.log(data)
        // dispatch(AuthActions.signIn(data, () => {
        //     navigate('/authenticate')
        // }))
    }
    const onTableViewSubmit = (data) => {
        if (formValue.uniqueId) {
            dispatch(AdminActions.postManageCostCenter(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageCostCenter())
            }, formValue.uniqueId))
        } else {
            dispatch(AdminActions.postManageCostCenter(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageCostCenter())
            }))
        }
    }
    useEffect(() => {
        dispatch(AdminActions.getManageCostCenter())
        dispatch(AdminActions.getManageCustomer())
        dispatch(GET_MANAGE_ZONE({dataAll:[],reset:true}))
        if (!isOpen) {
            reset({});
            Form.forEach(key => setValue(key.name, formValue[key.name] || ""));
          } else {
            reset({});
          }
    }, [isOpen, formValue,resetting]);
    return <>
        <Modal size={"xl"} children={<><CommonForm classes={"grid-cols-1 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} /></>} isOpen={modalOpen} setIsOpen={setmodalOpen} />
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
            <CommonForm classes={"grid-cols-2 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            <Button classes={"mt-2 w-sm text-center flex mx-auto"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
        </div>
    </>
};

export default ManageCostCenterForm;