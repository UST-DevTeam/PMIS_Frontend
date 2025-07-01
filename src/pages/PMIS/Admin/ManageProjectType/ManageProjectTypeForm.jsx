import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../components/Modal';
import CommonForm from '../../../../components/CommonForm';
import Button from '../../../../components/Button';
import AdminActions from '../../../../store/actions/admin-actions';



const ManageProjectTypeForm = ({ customeruniqueId, isOpen, setIsOpen, resetting, formValue = {} }) => {
    let dispatch = useDispatch()

    console.log(isOpen, setIsOpen, resetting, formValue, "formValueformValue")

    const [modalOpen, setmodalOpen] = useState(false)


    // let dispatch = useDispatch()
    // let roleList = useSelector((state) => {
    //     console.log(state, "state state")
    //     return state?.adminManagement?.roleList
    // })
    // let databaseList = useSelector((state) => {
    //     console.log(state, "state")
    //     let interdata = state?.customQuery?.databaseList

    //     console.log(interdata, "interdatainterdata")
    //     return state?.customQuery?.databaseList
    // })


    let Form = [
        // {
        //     label: "Login Type",
        //     name: "loginType",
        //     value: "Select",
        //     type: "select",
        //     option: [
        //         { "label": "Password Based", "value": "PasswordBased" },
        //         { "label": "Two Way Auth", "value": "TwoWayAuth" }
        //     ],
        //     props: "",
        //     required: true,
        //     classes: "col-span-1"
        // },

        {
            label: "Project Type",
            name: "projectType",
            type: "text",
            props: {
                onChange: ((e) => {

                }),
            },
            required: true,
            value: "",
            classes: "col-span-1"
        },
        {
            label: " Sub Project",
            name: "subProject",
            type: "text",
            value: "",
            props: {
                onChange: ((e) => {

                }),
            },
            required: true,
            classes: "col-span-1"
        },
        {
            label: "Status",
            name: "status",
            type: "select",
            value: "",
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
        console.log(data, "datadatadatadata")
        // dispatch(AuthActions.signIn(data, () => {
        //     navigate('/authenticate')
        // }))
    }
    const onTableViewSubmit = (data) => {

        if (formValue?.uniqueId) {
            dispatch(AdminActions.postManageProjectType(true, customeruniqueId, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageProjectType(customeruniqueId))
            }, formValue?.uniqueId))
        } else {
            dispatch(AdminActions.postManageProjectType(true, customeruniqueId, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageProjectType(customeruniqueId))
            }))
        }
    }
    console.log(Form, "Form 11")
    useEffect(() => {
        // dispatch(AdminActions.getManageProjectType())

        // alert(resetting)
        if (resetting) {
            reset({})
            Form.map((fieldName) => {
                console.log(fieldName, "fieldNamefieldNamefieldName")
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

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4 pb-5">

            <CommonForm classes={"grid-cols-2 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            {/* <button></button> */}


            {/* <button onClick={() => { setmodalOpen(true) }} className='flex bg-primaryLine mt-6 w-42 absolute right-1 top-1 justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Add DB Type <Unicons.UilPlus /></button> */}
            {/* <Table headers={["S.No.", "DB Type", "DB Server", "DB Name", "Created By", "Created Date", "Last Modified By", "Last Modified Date", "Actions"]} columns={[["1", "abcd", "ancd", "abcd", "ancd"], ["2", "adsa", "dasdas", "abcd", "ancd"]]} /> */}
            {/* <button onClick={(handleSubmit(onTableViewSubmit))} className='bg-primaryLine mt-6 w-full justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Submit</button> */}
            <Button classes={"mt-2 w-sm text-center flex mx-auto"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
        </div>
    </>


};

export default ManageProjectTypeForm;