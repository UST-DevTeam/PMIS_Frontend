import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import AdvancedTable from '../../../../components/AdvancedTable';
import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import DeleteButton from '../../../../components/DeleteButton';
import CstmButton from '../../../../components/CstmButton';
import { objectToQueryString } from '../../../../utils/commonFunnction';
import FileUploader from '../../../../components/FIleUploader';
import { ALERTS } from '../../../../store/reducers/component-reducer';
import CommonActions from '../../../../store/actions/common-actions';
import { Urls } from '../../../../utils/url';
import AdminActions from '../../../../store/actions/admin-actions';
import FilterActions from '../../../../store/actions/filter-actions';
import EditButton from '../../../../components/EditButton';
import AccuralRevenueMasterForm from './AccuralRevenueMasterForm';
import { GET_FINANCIAL_WORKDONE_PROJECT_TYPE } from '../../../../store/reducers/filter-reducer';
const AccuralRevenueMaster = () => {

    const [modalOpen, setmodalOpen] = useState(false)
    const [fileOpen, setFileOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    const [strValFil, setstrVal] = useState(false);
    let dispatch = useDispatch()
    let dbConfigList = useSelector((state) => {
        let interdata = state?.adminData?.getAccuralRevenueMasterProject
        return interdata?.map((itm) => {
            
            let updateditm = {
                ...itm,
                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    setmodalHead("Edit Master Rate")
                    setmodalBody(<>
                        <AccuralRevenueMasterForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} filtervalue = {strValFil} />
                    </>)
                }}></EditButton>} />,
                
                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-rose-400' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.get_accural_revenue_master_project}/${itm.uniqueId}`, () => {
                                    dispatch(AdminActions.getAccuralRevenueMasterProject())
                                    dispatch(ALERTS({ show: false }))
                                }))
                            }} name={"OK"} />,
                            <Button classes='w-auto' onClick={() => {
                                dispatch(ALERTS({ show: false }))
                            }} name={"Cancel"} />
                        ],
                        text: "Are you sure you want to Delete?"
                    }
                    dispatch(ALERTS(msgdata))
                }}></DeleteButton>} />
            }
            return updateditm
        });
    })

    let dbConfigTotalCount = useSelector((state) => {
        let interdata = state?.adminData?.getAccuralRevenueMasterProject
        if (interdata.length > 0) {
            return interdata[0]["overall_table_count"]
        } else {
            return 0
        }
    })

    let customerList = useSelector((state) => {
        return state?.adminData?.getManageCustomer.map((itm) => {
            return {
                label: itm?.customerName,
                value: itm?.uniqueId
            }
        })
    })

    let projectTypeList = useSelector((state) => {
        return state?.filterData?.getfinancialworkdoneprojecttype.map((itm) => {
          return {
            label: itm.projectType,
            value: itm.uid,
          };
        });
    });

    const {register,handleSubmit,watch,setValue,setValues,getValues,formState: { errors },} = useForm()

    let table = {
        columns: [
            {
                name: "Customer",
                value: "customerName",
                style: "min-w-[120px] max-w-[200px] text-center sticky"
            },
            {
                name: "Project Type",
                value: "projectTypeName",
                style: "min-w-[100px] max-w-[200px] text-center sticky"
            },
            {
                name: "Project ID",
                value: "projectId",
                style: "min-w-[140px] max-w-[200px] text-center sticky"
            },
            {
                name: "Sub Project",
                value: "subProjectName",
                style: "min-w-[140px] max-w-[200px] text-center sticky"
            },
            {
                name: "Band",
                value: "band",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Activity",
                value: "activity",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Rate",
                value: "rate",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Item Code-01",
                value: "itemCode01",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Item Code-02",
                value: "itemCode02",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Item Code-03",
                value: "itemCode03",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Item Code-04",
                value: "itemCode04",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Item Code-05",
                value: "itemCode05",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Item Code-06",
                value: "itemCode06",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Item Code-07",
                value: "itemCode07",
                style: "min-w-[140px] max-w-[200px] text-center"
            },        
            {
                name: "Edit",
                value: "edit",
                style: "min-w-[100px] max-w-[200px] text-center"
            },
            {
                name: "Delete",
                value: "delete",
                style: "min-w-[100px] max-w-[200px] text-center"
            },
        ],
        properties: {
            rpp: [10, 20, 50, 100]
        },
        filter: [
            {
                label: "Customer",
                type: "select",
                name: "customer",
                option:customerList,
                props: {
                    onChange: (e)=>{
                        if (e.target.value){
                            dispatch(FilterActions.getfinancialWorkDoneProjectType(true,"",1,e.target.value));
                        }
                        else{
                            dispatch(GET_FINANCIAL_WORKDONE_PROJECT_TYPE({dataAll:[],reset:true}))
                        }
                    }
                }
            },
            {
                label: "Project Type",
                type: "select",
                name: "projectType",
                option:projectTypeList,
                props: {
                }
            },
            {
                label: "Project ID",
                type: "text",
                name: "projectId",
                props: {}
            },
        ]
    }

    const onSubmit = (data) => {
        let shouldReset = data.reseter;
        delete data.reseter
        let strVal = objectToQueryString(data);
        setstrVal(strVal);
        dispatch(AdminActions.getAccuralRevenueMasterProject(true,strVal))
    }

    
    useEffect(() => {
        dispatch(AdminActions.getAccuralRevenueMasterProject());
        dispatch(AdminActions.getManageCustomer())
        dispatch(GET_FINANCIAL_WORKDONE_PROJECT_TYPE({dataAll:[],reset:true}))
    }, []);

    const onTableViewSubmit3 = (data) => {
        data["fileType"] = "UploadAccuralRevenueMaster";
        dispatch(
          CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
            setFileOpen(false);
            dispatch(AdminActions.getAccuralRevenueMasterProject());
            resetting("");
          })
        );
    };

    return <>
        <AdvancedTable
            headerButton={
                <div className='flex gap-1'>
                    <Button
                        name={"Add New"}
                        classes="w-auto"
                        onClick={(e) => {setmodalOpen((prev) => !prev)
                        setmodalHead("Add Master Rate") 
                        setmodalBody(<AccuralRevenueMasterForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />) 
                        }}>
                    </Button>
                    <Button
                        name={"Upload"}
                        classes="w-auto"
                        onClick={(e) => {setFileOpen((prev) => !prev);}}>
                    </Button>
                    <Button
                        name={"Export"}
                        classes="w-auto"
                        onClick={() => {
                            dispatch(CommonActions.commondownload("/export/MasterUnitRate?"+strValFil,"Export_MasterUnitRate.xlsx"))
                          }}>
                    </Button>
                </div>
            }
            table={table}
            filterAfter={onSubmit}
            tableName={"UserListTable"}
            handleSubmit={handleSubmit}
            data={dbConfigList}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
            totalCount={dbConfigTotalCount}
            heading = {'Total Count :-  '}
        />
        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />
        <FileUploader
        isOpen={fileOpen}
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit3}
        setIsOpen={setFileOpen}
        tempbtn={true} tempbtnlink = {["/template/AccuralRevenueMaster.xlsx","AccuralRevenueMaster.xlsx"]}
        head = {"Upload File"}
      />

    </>

};

export default AccuralRevenueMaster;