import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../../../../components/Modal';
import CommonForm from '../../../../components/CommonForm';
import Button from '../../../../components/Button';
import AdminActions from '../../../../store/actions/admin-actions';
import { useDispatch } from 'react-redux';

const ExchangeForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {

    const [modalOpen, setmodalOpen] = useState(false)
    let dispatch = useDispatch()

    let Form = [
        {
            label: "Year",
            value: "",
            name: "year",
            type: Object.entries(formValue).length>0 ? "sdisabled":"number",
            required: true,
            props: {
              valueAsNumber: true,
              min: 2000,
            },
            classes: "col-span-1"
        },
        {
          label: "Rate",
          value: "",
          name: "rate",
          type: "number",
          classes: "col-span-1",
          required: true,
          props: {
            valueAsNumber: true,
            min: 0,
          },
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
            dispatch(AdminActions.postExchnageRate(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getExchnageRate())
            }, formValue.uniqueId))
        } else {
            dispatch(AdminActions.postExchnageRate(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getExchnageRate())
            }))
        }
    }

    useEffect(() => {
        if (resetting) {
            reset({})
            Form.map((fieldName) => {
                setValue(fieldName["name"], fieldName["value"]);
            });
        } else {
            reset({})
            Object.keys(formValue).forEach((key) => {
              setValue(key, formValue[key]);
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
export default ExchangeForm;