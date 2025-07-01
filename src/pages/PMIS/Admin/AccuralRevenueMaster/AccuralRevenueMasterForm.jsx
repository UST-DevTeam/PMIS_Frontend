import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CommonForm from '../../../../components/CommonForm';
import Button from '../../../../components/Button';
import AdminActions from '../../../../store/actions/admin-actions';
import Modal from '../../../../components/Modal';
import FilterActions from '../../../../store/actions/filter-actions';
import { GET_ACCURAL_REVENUE_MASTER_PROJECTID, GET_ACCURAL_REVENUE_MASTER_PROJECTTYPE, GET_ACCURAL_REVENUE_MASTER_SUBPROJECTTYPE } from '../../../../store/reducers/admin-reducer';


const AccuralRevenueMasterForm = ({ isOpen, setIsOpen, resetting, formValue = {}, filtervalue }) => {




    let subProjectTypelist = useSelector((state) => {
        return state?.adminData?.getAccuralRevenueMasterSubProject?.map((itm) => {
          return {
            label: itm?.subProjectName,
            value: itm?.subProject,
            
          };
        });
    });
    
    let ProjectTypelist = useSelector((state) => {
        return state?.adminData?.getAccuralRevenueMasterProjectType?.map((itm) => {
          return {
            label: itm?.projectTypeName,
            value: itm?.projectType,
            
          };
        });
      });

      let Projectlist = useSelector((state) => {
        return state?.adminData?.getAccuralRevenueMasterProjectId?.map((itm) => {
          return {
            label: itm?.projectId,
            value: itm?.project,
          };
        });
      });

    let customerList = useSelector((state) => {
        return state?.adminData?.getManageCustomer.map((itm) => {
            return {
                label: itm?.customerName,
                value: itm?.uniqueId
            }
        })
    })


    const [modalOpen, setmodalOpen] = useState(false)

    let dispatch = useDispatch()

    let Form = [
        {
            label: "Customer",
            value: "",
            name:Object.entries(formValue).length > 0 ? "customerName" : "customer",
            type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
            option: customerList,
            props: {
              onChange: (e)=>{
                if (e.target.value){
                    dispatch(AdminActions.getAccuralRevenueMasterProjectType(true,"",e.target.value));
                }
                else{
                    dispatch(GET_ACCURAL_REVENUE_MASTER_PROJECTTYPE({ dataAll:[], reset:true}));
                    dispatch(GET_ACCURAL_REVENUE_MASTER_PROJECTID({ dataAll:[], reset:true }));
                    dispatch(GET_ACCURAL_REVENUE_MASTER_SUBPROJECTTYPE({ dataAll:[], reset:true }));
                }
              },
            },
            required: true,
            classes: "col-span-1",
        },
        {
            label: "Project Type",
            value: "",
            name:Object.entries(formValue).length > 0 ? "projectTypeName" : "projectType",
            type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
            option: ProjectTypelist,
            props: {
              onChange: (e)=>{
                if (e.target.value){
                    dispatch(AdminActions.getAccuralRevenueMasterProjectID(true,"",e.target.value));
                    dispatch(AdminActions.getAccuralRevenueMasterSubProjectType(true,"",e.target.value));
                }
                else{
                    dispatch(GET_ACCURAL_REVENUE_MASTER_PROJECTID({ dataAll:[], reset:true }));
                    dispatch(GET_ACCURAL_REVENUE_MASTER_SUBPROJECTTYPE({ dataAll:[], reset:true }));
                }
                
              },
              
            },
            required: true,
            classes: "col-span-1",
        },
        {
            label: "Project",
            value: "",
            name:Object.entries(formValue).length > 0 ? "projectId" : "project",
            type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
            option: Projectlist,
            props: {
                onChange: (e)=>{
                
                },
                
            },
            required: true,
            classes: "col-span-1",
        },
        {
            label: "Sub Project",
            value: "",
            name:Object.entries(formValue).length > 0 ? "subProjectName" : "subProject",
            type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
            option: subProjectTypelist,
            props: {
              onChange: (e)=>{
              },
            },
            required: true,
            classes: "col-span-1",
        },
        {
            label: "Band",
            value: "",
            name: "band",
            type: "text",
            filter: true,
            props: {
                onChange: ((e) => {
                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Activity",
            value: "",
            name: "activity",
            type: "text",
            filter: true,
            props: {
                onChange: ((e) => {
                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Rate",
            value: "",
            name: "rate",
            type: "number",
            required: true,
            filter: true,
            props: {
                onChange: ((e) => {
                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Item Code-01",
            value: "",
            name: "itemCode01",
            type: "text",
            filter: true,
            props: {
                onChange: ((e) => {
                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Item Code-02",
            value: "",
            name: "itemCode02",
            type: "text",
            filter: true,
            props: {
                onChange: ((e) => {
                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Item Code-03",
            value: "",
            name: "itemCode03",
            type: "text",
            filter: true,
            props: {
                onChange: ((e) => {
                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Item Code-04",
            value: "",
            name: "itemCode04",
            type: "text",
            filter: true,
            props: {
                onChange: ((e) => {
                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Item Code-05",
            value: "",
            name: "itemCode05",
            type: "text",
            filter: true,
            props: {
                onChange: ((e) => {
                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Item Code-06",
            value: "",
            name: "itemCode06",
            type: "text",
            filter: true,
            props: {
                onChange: ((e) => {
                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Item Code-07",
            value: "",
            name: "itemCode07",
            type: "text",
            filter: true,
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

    const onTableViewSubmit = (data) => {
        if (formValue.uniqueId) {
            dispatch(AdminActions.postAccuralRevenueMasterProject(data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getAccuralRevenueMasterProject(true,filtervalue))
            }, formValue.uniqueId))
        } else {
            dispatch(AdminActions.postAccuralRevenueMasterProject(data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getAccuralRevenueMasterProject())
            }))
        }
    }

    useEffect(() => {
        dispatch(GET_ACCURAL_REVENUE_MASTER_PROJECTTYPE({ dataAll:[], reset:true}));
        dispatch(GET_ACCURAL_REVENUE_MASTER_PROJECTID({ dataAll:[], reset:true }));
        dispatch(GET_ACCURAL_REVENUE_MASTER_SUBPROJECTTYPE({ dataAll:[], reset:true }));
      if (!isOpen) {
        reset({});
        Form.forEach(key => setValue(key.name, formValue[key.name] || ""));
      } else {
        reset({});
      }
    }, [isOpen,formValue,resetting]);




    return <>
        <Modal size={"xl"} children={<><CommonForm classes={"grid-cols-1 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} /></>} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">

            <CommonForm classes={"grid-cols-2 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            <Button classes={"mt-2 w-sm text-center flex mx-auto"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
        </div>
    </>


};

export default AccuralRevenueMasterForm;