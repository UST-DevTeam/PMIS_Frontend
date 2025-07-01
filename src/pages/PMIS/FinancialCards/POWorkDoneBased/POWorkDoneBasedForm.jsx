import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../../../../components/Modal';
import CommonForm from '../../../../components/CommonForm';
import Button from '../../../../components/Button';
import { useParams } from "react-router-dom";
import AdminActions from '../../../../store/actions/admin-actions';
import FinanceActions from '../../../../store/actions/finance-actions';

const POWorkDoneBasedForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {

    const { customeruniqueId } = useParams();

    console.log(isOpen, setIsOpen, resetting, formValue, "formValueformValue")

    const [modalOpen, setmodalOpen] = useState(false);
    const [pType, setpType] = useState("");
    const [qType, setqType] = useState("");
    const [rType, setrType] = useState("");


    let dispatch = useDispatch()

    let customerList = useSelector((state) => {
        return state?.adminData?.getManageCustomer.map((itm) => {
            return {
                label: itm?.customerName,
                value: itm?.uniqueId
            }
        })
    })
    let circleList = useSelector((state) => {
        return state?.adminData?.getManageCircle
            .filter((itm) => {
                console.log(itm.customerName == pType, "dasdsadsadas");
                return itm.customerName == pType;
            })
            .map((itm) => {
                return {
                    label: itm.circleName,
                    value: itm.uniqueId,
                };
            });
    });

    let projectTypeList = useSelector((state) => {
        return state?.adminData?.getCardProjectType.map((itm) => {
            return {
                label: itm.projectType,
                value: itm.uniqueId,
            };
        });
    });


    let projectGroupList = useSelector((state) => {
        return state?.adminData?.getManageProjectGroup.map((itm) => {
            return {
                label: itm?.projectGroupId,
                value: itm?.uniqueId
            }
        })
    })

    // let projectGroupList = useSelector((state) => {
    //     return state?.adminData?.getManageProjectGroup
    //       .filter((itm) => {
    //         console.log(itm.circleName == qType, "sadsadasdasdsadsadas");
    //         return itm.circleName == qType;
    //       })
    //       .map((itm) => {
    //         return {
    //           label: itm.projectGroupId,
    //           value: itm.uniqueId,
    //         };
    //       });
    //   });

    let projectIdList = useSelector((state) => {
        return state?.adminData?.getProject.map((itm) => {
            return {
                label: itm?.projectId,
                value: itm?.uniqueId
            }
        })
    })

    // let projectIdList = useSelector((state) => {
    //     return state?.adminData?.getProject
    //       .filter((itm) => {
    //         console.log(itm.projectId == rType, "dasdsadsadasdaadsadas");
    //         return itm.projectId == rType;
    //       })
    //       .map((itm) => {
    //         return {
    //           label: itm.projectId,
    //           value: itm.uniqueId,
    //         };
    //       });
    //   });



    let Form = [
        {
            label: "Customer",
            value: "",
            name: "customer",
            type: "select",
            required: true,
            option: customerList,
            classes: "col-span-1",
            props: {
                onChange: (e) => {
                    setpType(
                        customerList.filter((iteq) => iteq.value == e.target.value)[0][
                        "label"
                        ]
                    );
                    setValue("customer", e.target.value);
                },
            },
        },
        {
            label: "Circle",
            value: "",
            name: "circle",
            type: "select",
            option: circleList,
            // required: true,
            props: {
                onChange: (e) => {
                    setqType(
                        circleList.filter((iteq) => iteq.value == e.target.value)[0][
                        "label"
                        ]
                    );
                    setValue("circle", e.target.value);
                },
            },
            classes: "col-span-1"
        },
        {
            label: "Project Type",
            value: "",
            name: "projectTypeId",
            type: "select",
            required: true,
            option: projectTypeList,
            props: {
                onChange: (e) => {
                    // setpType(
                    //   projectTypeList.filter((iteq) => iteq.value == e.target.value)[0][
                    //     "label"
                    //   ]
                    // );
                    // console.log(e.target.value, "e geeter");
                    // setValue("projectType", e.target.value);
                },
            },
            classes: "col-span-1",
        },
        {
            label: "Project Group",
            value: "",
            name: "projectGroup",
            type: "select",
            option: projectGroupList,
            required: true,
            props: {
                onChange: (e) => {
                    setrType(
                        projectGroupList.filter((iteq) => iteq.value == e.target.value)[0][
                        "label"
                        ]
                    );
                    setValue("projectGroup", e.target.value);
                },
            },
            classes: "col-span-1"
        },
        {
            label: "Project ID",
            value: "",
            name: "project",
            type: "select",
            option: projectIdList,
            // required: true,
            props: {
                onChange: ((e) => {

                }),
            },
            classes: "col-span-1"
        },
        {
            label: "PO Number",
            value: "",
            name: "poNumber",
            type: "text",
            required: true,
            props: {
                onChange: ((e) => {

                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Item Code",
            value: "",
            name: "itemCode",
            type: "text",
            required: true,
            props: {
                onChange: ((e) => {

                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Description",
            value: "",
            name: "description",
            type: "text",
            required: true,
            props: {
                onChange: ((e) => {

                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Unit Rate",
            value: "",
            name: "uniteRate",
            type: "text",
            required: true,
            props: {
                onChange: ((e) => {

                }),
            },
            classes: "col-span-1"
        },
        {
            label: "PO Value",
            value: "",
            name: "poValue",
            type: "text",
            required: true,
            props: {
                onChange: ((e) => {

                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Initial Qty",
            value: "",
            name: "initialQty",
            type: "text",
            required: true,
            props: {
                onChange: ((e) => {

                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Qty",
            value: "",
            name: "qty",
            type: "text",
            required: true,
            props: {
                onChange: ((e) => {

                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Used Qty",
            value: "",
            name: "usedQty",
            type: "text",
            required: true,
            props: {
                onChange: ((e) => {

                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Open Qty",
            value: "",
            name: "OpenQty",
            type: "text",
            required: true,
            props: {
                onChange: ((e) => {

                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Status",
            value: "",
            name: "status",
            type: "text",
            required: true,
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
        console.log(data)
        // dispatch(AuthActions.signIn(data, () => {
        //     navigate('/authenticate')
        // }))
    }
    const onTableViewSubmit = (data) => {
        console.log(data, "datadata")
        if (formValue.uniqueId) {
            dispatch(FinanceActions.postPOWorkDoneBased(true, data, () => {
                console.log("CustomQueryActions.postDBConfig")
                setIsOpen(false)
                dispatch(FinanceActions.getPOWorkDoneBased())
            }, formValue.uniqueId))
        } else {
            dispatch(FinanceActions.postPOWorkDoneBased(true, data, () => {
                console.log("CustomQueryActions.postDBConfig")
                setIsOpen(false)
                dispatch(FinanceActions.getPOWorkDoneBased())
            }))
        }
    }
    useEffect(() => {
        dispatch(AdminActions.getManageCustomer())
        dispatch(AdminActions.getManageCircle())
        dispatch(AdminActions.getCardProjectType());
        dispatch(AdminActions.getManageProjectGroup())
        dispatch(AdminActions.getProject())
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
            {/* <button></button> */}


            {/* <button onClick={() => { setmodalOpen(true) }} className='flex bg-primaryLine mt-6 w-42 absolute right-1 top-1 justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Add DB Type <Unicons.UilPlus /></button> */}
            {/* <Table headers={["S.No.", "DB Type", "DB Server", "DB Name", "Created By", "Created Date", "Last Modified By", "Last Modified Date", "Actions"]} columns={[["1", "abcd", "ancd", "abcd", "ancd"], ["2", "adsa", "dasdas", "abcd", "ancd"]]} /> */}
            {/* <button onClick={(handleSubmit(onTableViewSubmit))} className='bg-primaryLine mt-6 w-full justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Submit</button> */}
            <Button classes={"mt-2 w-sm text-center flex mx-auto"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
        </div>
    </>
};

export default POWorkDoneBasedForm;