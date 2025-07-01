import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../components/Modal';
import CommonForm from '../../../../components/CommonForm';
import Button from '../../../../components/Button';
import AdminActions from '../../../../store/actions/admin-actions';

const ManageCompletionCriteriaForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {

    const [modalOpen, setmodalOpen] = useState(false)
    const [dropdown, setdropdown] = useState(false)

    let dispatch = useDispatch()

    let Form = [
        {
            label: "Completion Criteria",
            value: "",
            name: "completion",
            type: "text",
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
        {
            label: "Type",
            value: "",
            name: "type",
            type: "select",
            required: true,
            filter: true,
            option: [
                { label: "Number", value: "Number" },
                { label: "File", value: "File" },
                { label: "Date", value: "Date" },
                { label: "Text", value: "Text" },
                { label: "Dropdown", value: "Dropdown" },
                { label: "Form", value: "Form" },
            ],
            props: {
                onChange: (e) => {
                  setdropdown(e.target.value === "Dropdown");
                },
              },

            classes: "col-span-1"
        },
    ]
    if (dropdown) {
        Form.push(
          {
            label: "Dropdown",
            name: "dropdown",
            value: "",
            type: "text",
            required: true,
            placeholder: "",
          },
      );
    }

    useEffect(() => {
        if (isOpen) {
            setdropdown(false); 
            reset(""); 
        }
    }, [isOpen]);

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
            dispatch(AdminActions.postManageCompletionCriteria(data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageCompletionCriteria())
            }, formValue.uniqueId))
        } else {
            dispatch(AdminActions.postManageCompletionCriteria(data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageCompletionCriteria())
            }))
        }
    }

    useEffect(() => {
        
        dispatch(AdminActions.getManageCompletionCriteria())
        if (resetting) {
            reset({})
            setdropdown(false)
            Form.map((fieldName) => {
                setValue(fieldName["name"], fieldName["value"]);
            });
        }         
        else {
            reset({})
            Form.forEach((key) => {
                if (["endAt", "startAt"].indexOf(key.name) != -1) {
                    console.log("date formValuekey", key.name, formValue[key.name])
                    const momentObj = moment(formValue[key.name]);
                    setValue(key.name, momentObj.toDate());

                } else {
                    setValue(key.name, formValue[key.name]);
                }
            })
            setdropdown(formValue.type === "Dropdown");
            if (formValue.type === "Dropdown" && formValue.dropdown) {
                setValue("dropdown", formValue.dropdown);
            }
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

export default ManageCompletionCriteriaForm;