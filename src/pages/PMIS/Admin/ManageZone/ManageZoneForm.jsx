import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../components/Modal';
import CommonForm from '../../../../components/CommonForm';
import Button from '../../../../components/Button';
import AdminActions from '../../../../store/actions/admin-actions';
import { GET_MANAGE_CIRCLE } from '../../../../store/reducers/admin-reducer';

const ManageZoneForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {


    const [modalOpen, setmodalOpen] = useState(false)


    let dispatch = useDispatch()



    let circleList = useSelector((state) => {
        return state?.adminData?.getManageCircle.map((itm) => {
            return {
                name: itm?.circleName,
                id: itm?.uniqueId
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
            name: "customer",
            type: "select",
            required: true,
            option: customerList,
            classes: "col-span-1",
            props: {
                onChange: (e) => {
                    if (e.target.value){
                        dispatch(AdminActions.getManageCircle(true, `customer=${e.target.value}`));
                    }
                    else {
                        dispatch(GET_MANAGE_CIRCLE({ dataAll:[], reset:true }));
                    }
                },
            },
        },
        {
            label: "Zone Name",
            value: "",
            name: "zoneName",
            type: "text",
            required: true,
            filter: true,
            props: {
                onChange: ((e) => {

                }),
            },
            classes: "col-span-1",
        },
        {
            label: "Zone ID",
            value: "",
            name: "shortCode",
            type: "text",
            required: true,
            props: {
                onChange: ((e) => {
                    // console.log(e.target.value, "e geeter")

                    // setValue("queries",e.target.name)

                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Circle",
            value: "",
            name: "circle",
            type: "BigmuitiSelect",
            option: circleList,
            required: true,
            props: {
                onChange: ((e) => {

                }),
            },
            classes: "col-span-1",
            width:"350px"
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
            dispatch(AdminActions.postManageZone(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageZone())
            }, formValue.uniqueId))
        } else {
            dispatch(AdminActions.postManageZone(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageZone())
            }))
        }
    }

    useEffect(() => {
        dispatch(AdminActions.getManageCustomer())
        if (resetting) {
            reset({})
            Form.map((fieldName) => {
                setValue(fieldName["name"], fieldName["value"]);
            });
        } else {
            reset({})
            Form.forEach((key) => {
                    setValue(key.name, formValue[key.name]);
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

export default ManageZoneForm;