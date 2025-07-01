import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../components/Modal';
import CommonForm from '../../../../components/CommonForm';
import Button from '../../../../components/Button';
import AdminActions from '../../../../store/actions/admin-actions';



const ManageCustomerForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {

    console.log(isOpen, setIsOpen, resetting, formValue, "formValueformValue")

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

    let Form = [
        {
            label: "Logo",
            value: "",
            name: "img",
            type: "file",
            props: {
                onChange: ((e) => {
                    setValue("companyimg",e.target.files[0])
                }),
            },
            classes: "col-span-1",
            multiple:false,
        },
         {
            label: "Customer Name",
            value: "",
            name: "customerName",
            type: Object.entries(formValue).length > 0 ? "sdisabled" : "text",
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
            label: "ShortName",
            value: "",
            name: "shortName",
            type: Object.entries(formValue).length > 0 ? "sdisabled" : "text",
            required: true,
            props: {
                onChange: ((e) => {
                }),
            },
            classes: "col-span-1"
        }, 
        {
            label: "Contact Person Name",
            value: "",
            name: "personName",
            type: "text",
            // required: true,
            props: {
                onChange: ((e) => {
                
                }),
            },
            classes: "col-span-1"
        }, 
        {
            label: "Email",
            value: "",
            name: "email",
            type: "text",
            required: true,
            props: {
                onChange: ((e) => {
                

                }),
            },
            classes: "col-span-1"
        }, 
        {
            label: "Mobile No.",
            value: "",
            name: "mobile",
            type: "number",
            required: true,
            props: {
                onChange: ((e) => {
                 

                }),
            },
            classes: "col-span-1"
        }, 
        {
            label: "Address",
            name: "address",
            type: "text",
            props: {
                onChange: ((e) => {
                
                }),
            },
            required: true,
            classes: "col-span-1"
        }, 
        {
            label: "Index",
            name: "index",
            type: "number",
            required: true,
            props: {
                valueAsNumber:true,
                min: 1,
            },
            classes: "col-span-1"
        }, 
        {
            label: "Attachment",

            value: "",
            name: "attachment",
            type: "file",
            // required: true,
            props: {
                onChange: ((e) => {
                    console.log(e.target.files, "e geeter")

                    setValue("attachment",e.target.files[0])

                }),
            },
            classes: "col-span-1",
            multiple:false,
        },
        {
            label: "Status",
            name: "status",
            type: "select",
            option: [
                { "label": "Active", "value": "Active" },
                { "label": "Inactive", "value": "Inactive" }
            ],
            props: {
                onChange: ((e) => {
                  
                }),
            },
            required: true,
            classes: "col-span-1"
        }, 
        // { label: "User", value: "", option: ["User Name"], type: "select" }
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
        if (formValue?.uniqueId) {
            dispatch(AdminActions.postManageCustomer(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageCustomer())
            }, formValue?.uniqueId))
        } else {
            dispatch(AdminActions.postManageCustomer(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageCustomer())
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
            console.log(Object.keys(formValue), "Object.keys(formValue)")
            Form.forEach((key) => {
                if (["endAt", "startAt"].indexOf(key.name) != -1) {
                    console.log("date formValuekey", key.name, formValue[key.name])
                    const momentObj = moment(formValue[key.name]);
                    setValue(key.name, momentObj.toDate());


                } else {
                    setValue(key.name, formValue[key.name]);
                }
            })
        }
    }, [formValue, resetting])
    return <>


        <Modal size={"xl"} children={<><CommonForm classes={"grid-cols-1 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} /></>} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        <div className="mx-auto w-full">

            <CommonForm classes={"grid-cols-2 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            <Button classes={"w-sm text-center flex mx-auto"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
        </div>
    </>


};

export default ManageCustomerForm;