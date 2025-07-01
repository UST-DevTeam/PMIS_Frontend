import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../components/Modal';
import CommonForm from '../../../../components/CommonForm';
import Button from '../../../../components/Button';
import AdminActions from '../../../../store/actions/admin-actions';
import { GET_ACTIVITY_AND_OEM_COMPLIANCE, GET_PARTNER_WORK_DESCRIPTION, GET_PROJECT_TYPE_COMPLIANCE, GET_SUB_PROJECT_TYPE_COMPLIANCE } from '../../../../store/reducers/admin-reducer';

const VendorActivityForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {

    const [modalOpen, setmodalOpen] = useState(false)
    let dispatch = useDispatch()

    const complainceRef = useRef({
        cid: "",
        projectType: "",
    });

    const { customerList, projectTypes, subProjectTypes, milestone,workDescriptionList } =
    useSelector((state) => {
      const customerList = state?.adminData?.getManageCustomer.map((itm) => {
        return {
          label: itm?.customerName,
          value: itm?.uniqueId,
        };
      });
      const projectTypes = state?.adminData?.getProjectTypeCompliance.map(
        (itm) => {
          return {
            label: itm?.projectType,
            value: itm?.projectType,
          };
        }
      );
      const subProjectTypes = state?.adminData?.getSubProjectTypeCompliance.map(
        (itm) => {
          return {
            label: itm?.subProject,
            value: itm?.uniqueId,
          };
        }
      );

      const milestone= state?.adminData?.getActivityAndOemCompliance.map(
        (itm) => {
          return {
            id: itm.fieldName,
            name: itm.fieldName,
          };
        }
      ) || []

      const workDescriptionList= state?.adminData?.getPartnerWorkDescription.map(
        (itm) => {
          return {
            label: itm.workDescription,
            value: itm.uniqueId,
          };
        }
      ) || []

      return { customerList, projectTypes, subProjectTypes, milestone,workDescriptionList};
    });


    let Form = [
        {
            label: "Customer",
            value: "",
            name: Object.entries(formValue).length > 0 ? "customerName" : "customer",
            type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
            required: true,
            option: customerList,
            props: {
                onChange: (e) => {
                    dispatch(GET_PROJECT_TYPE_COMPLIANCE({ dataAll: [], reset: true }))
                    dispatch(GET_SUB_PROJECT_TYPE_COMPLIANCE({ dataAll: [], reset: true }))
                    dispatch(GET_PARTNER_WORK_DESCRIPTION({ dataAll:[], reset:true }))
                    dispatch(GET_ACTIVITY_AND_OEM_COMPLIANCE({ dataAll: [], reset: true }))
                    const cid = e.target.value;
                    complainceRef.current.cid = cid;
                    dispatch(AdminActions.getProjectTypeCompiliance(true, `customerId=${cid}&partnerActivity=${"Yes"}`));
                    dispatch(AdminActions.getPartnerWorkDescription(true,`customerId=${cid}`));
                },
            },
            classes: "col-span-1",
        },
        {
            label: "Project Type",
            name: "projectType",
            type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
            props: {
                onChange: (e) => {
                    dispatch(GET_SUB_PROJECT_TYPE_COMPLIANCE({ dataAll: [], reset: true }))
                    dispatch(GET_ACTIVITY_AND_OEM_COMPLIANCE({ dataAll: [], reset: true }))
                    const projectType = e.target.value;
                    complainceRef.current.projectType = projectType;
                    dispatch(
                        AdminActions.getSubProjectTypeCompiliance(true, "", complainceRef.current.cid, projectType)
                    );
                },
            },
            option: projectTypes,
            required: true,
            value: "",
            classes: "col-span-1",
        },
        {
            label: "Sub Project",
            name: "subProject",
            name: Object.entries(formValue).length > 0 ? "subProjectTypeName" : "subProject",
            type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
            value: "",
            props: {
            onChange: (e) => {
                dispatch(GET_ACTIVITY_AND_OEM_COMPLIANCE({ dataAll: [], reset: true }))
                const subProjectType = e.target.value;
                dispatch(AdminActions.getActivityAndOemCompiliance(true, `subProjectType=${subProjectType}&partnerActivity=${"Yes"}`));
            },
            },
            option: subProjectTypes,
            required: true,
            classes: "col-span-1",
        },
        {
            label: "Work Description",
            // name: "workDescription",
            name: Object.entries(formValue).length > 0 ? "workDescriptionName" : "workDescription",
            type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
            required: true,
            classes: "col-span-1",
            option:workDescriptionList
        },
        {
            label: "Milestone",
            name: "milestone",
            type: "BigmuitiSelect",
            value: "",
            props: {
              onChange: (e) => {},
            },
            required: true,
            classes: "col-span-1",
            option:milestone
        },
    ];

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
            dispatch(AdminActions.postPartnerActivity(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getPartnerActivity())
            }, formValue.uniqueId))
        } else {
            dispatch(AdminActions.postPartnerActivity(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getPartnerActivity())
            }))
        }
    }

    useEffect(() => {
        dispatch(AdminActions.getManageCustomer());
        dispatch(GET_PROJECT_TYPE_COMPLIANCE({ dataAll: [], reset: true }))
        dispatch(GET_SUB_PROJECT_TYPE_COMPLIANCE({ dataAll: [], reset: true }))
        dispatch(GET_PARTNER_WORK_DESCRIPTION({ dataAll:[], reset:true }))
        dispatch(GET_ACTIVITY_AND_OEM_COMPLIANCE({ dataAll: [], reset: true }))
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
    return <>


        <Modal size={"xl"} children={<><CommonForm classes={"grid-cols-1 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} /></>} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
            <CommonForm classes={"grid-cols-2 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            <Button classes={"mt-2 w-sm text-center flex mx-auto"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
        </div>
    </>
};



export default VendorActivityForm;