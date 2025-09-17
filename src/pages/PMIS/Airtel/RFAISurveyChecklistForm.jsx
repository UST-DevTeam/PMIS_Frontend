import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import CommonForm from '../../../components/CommonForm';
import Button from '../../../components/Button';
import AirtelActions from '../../../store/actions/airtel-actions';

const RFAISurveyCheckListForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {


    const [dropdown, setdropdown] = useState(false)

    let dispatch = useDispatch()

    // let airtelCircleList = useSelector((state) => {
    //     return state?.airtelData?.getAirtelCircleList.map((itm) => {
    //         return {
    //             label: itm?.circleCode,
    //             value: itm?.uniqueId
    //         }
    //     })
    // })

    let fieldTypelist = [
        {label:'Site Details',value:"Site Details"},
        {label:'BTS',value:"BTS"},
        {label:'Antenna',value:"Antenna"},
        {label:'RRU',value:"RRU"},
        {label:'BBU',value:"BBU"},
        {label:'Space',value:"Space"},
        {label:'Electrical',value:"Electrical"},
        {label:'Other',value:"Other"},
    ]

    let dataTypeList = [
        {label:"Text",value:"Text"},
        {label:"Number",value:"Number"},
        {label:"Date",value:"Date"},
        {label:"Dropdown",value:"Dropdown"},
    ]



    let Form = [
        {
            label: "Field Name",
            value: "",
            name: "fieldName",
            type: "text",
            required: true,
            props: {
                onChange: ((e) => {}),
            },
            classes: "col-span-1"
        },
        {
            label: "Field Type",
            value: "",
            type:"select",
            name: "fieldType",
            required: true,
            props: {
                onChange: ((e) => {
                    
                }),
            },
            option:fieldTypelist,
            classes: "col-span-1"
        },
        {
            label: "Mandatory",
            value: "",
            type:"select",
            name: "required",
            required: true,
            props: {
                onChange: ((e) => {
                    
                }),
            },
            option:[
                {label:"Yes",value:"Yes"},
                {label:"No",value:"No"},
            ],
            classes: "col-span-1"
        },
        {
            label: "Data Type",
            value: "",
            type:"select",
            name: "dataType",
            required: true,
            props: {
                onChange: ((e) => {
                    setdropdown(e.target.value === "Dropdown");
                }),
            },
            option:dataTypeList,
            classes: "col-span-1"
        },
    ]
    if (dropdown){
        Form.push(
            {
            label: "DropDown Values",
            value: "",
            type:"text",
            name: "dropdownValues",
            required: true,
            props: {
                onChange: ((e) => {

                }),
            },
            classes: "col-span-1"
        },
        )
    }

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
            dispatch(AirtelActions.postAirtelSurveyChecklist(true, data, () => {
                setIsOpen(false)
                dispatch(AirtelActions.getAirtelSurveyChecklist())
            }, formValue.uniqueId))
        } else {
            dispatch(AirtelActions.postAirtelSurveyChecklist(true, data, () => {
                setIsOpen(false)
                dispatch(AirtelActions.getAirtelSurveyChecklist())
            }))
        }
    }

    useEffect(() => {
        if (resetting) {
            setdropdown(false)
            reset({})
            Form.map((fieldName) => {
                setValue(fieldName["name"], fieldName["value"]);
            });
        } else {
            reset({})
            Object.keys(formValue).forEach((key) => {
                if (["endAt", "startAt"].indexOf(key.name) != -1) {
                    const momentObj = moment(formValue[key.name]);
                    setValue(key.name, momentObj.toDate());
                } else {
                    setValue(key, formValue[key]);
                }
            })
        }
    }, [formValue, resetting])

    return <>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
            <CommonForm classes={"grid-cols-2 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            <Button classes={"mt-2 w-sm text-center flex mx-auto"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
        </div>
    </>
};



export default RFAISurveyCheckListForm;