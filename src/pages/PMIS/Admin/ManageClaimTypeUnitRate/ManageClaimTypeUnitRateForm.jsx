import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../components/Modal';
import CommonForm from '../../../../components/CommonForm';
import Button from '../../../../components/Button';
import AdminActions from '../../../../store/actions/admin-actions';
import ExpenseAdvanceActions from '../../../../store/actions/expenseAdvance-actions';

const ManageClaimTypeUnitRateForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {

    const [modalOpen, setmodalOpen] = useState(false)

    const [category,setCategory] = useState()
    let dispatch = useDispatch()

    let UnitRateClaimTypeList = useSelector((state) => {
        return state?.expenseAdvanceData?.getUnitRateClaimType.map((itm) => {
          return {
            label: itm?.claimType,
            value: itm?.claimTypeId,
            categories : itm?.categories?.split(",")?.map(item => {
                return {
                    label : item,
                    value : item
                }
            })
          };
        });
      });

      console.log("UnitRateClaimTypeList",UnitRateClaimTypeList)

    let Form = [
        {
            label: "Claim Type",
            value: "",
            name: "claimType",
            type: "select",
            option: UnitRateClaimTypeList,
            props: {
                onChange: (e) => {
                    setCategory(UnitRateClaimTypeList.find(item => item.value === e.target.value)?.categories || [])
                },
              },
            required: true,
            classes: "col-span-1"
        },
        {
            label: "Category",
            value: "",
            name: "categories",
            option: category,
            type: "select",
            required: true,
            classes: "col-span-1"
        },
        {
            label: "Unit Rate",
            value: "",
            name: "unitRate",
            type: "number",
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
            dispatch(AdminActions.postManageClaimTypeUnitRate(data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageClaimTypeUnitRate())
            }, formValue.uniqueId))
        } else {
            dispatch(AdminActions.postManageClaimTypeUnitRate(data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageClaimTypeUnitRate())
            }))
        }
    }
    console.log(Form, "Form 11")
    useEffect(() => {
        dispatch(ExpenseAdvanceActions.getUnitRateClaimType())
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

    useEffect(() => {
        dispatch(AdminActions.getManageClaimTypeUnitRate())
    }, [])
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



export default ManageClaimTypeUnitRateForm;