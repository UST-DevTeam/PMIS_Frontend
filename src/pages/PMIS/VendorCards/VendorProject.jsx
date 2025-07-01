import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../components/EditButton';
// import ManageProjectGroupForm from '../ManageProjectGroup/ManageProjectGroupForm';
import AdvancedTable from '../../../components/AdvancedTable';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import DeleteButton from '../../../components/DeleteButton';
import CstmButton from '../../../components/CstmButton';
import ToggleButton from '../../../components/ToggleButton';
import { objectToQueryString, parseTwoDigit } from '../../../utils/commonFunnction';
import { ALERTS } from '../../../store/reducers/component-reducer';
import CommonActions from '../../../store/actions/common-actions';
import { Urls } from '../../../utils/url';
import OperationManagementActions from '../../../store/actions/admin-actions';
import AdminActions from '../../../store/actions/admin-actions';
import VendorActions from '../../../store/actions/vendor-actions';
import { useNavigate, useParams } from 'react-router-dom';
// import ManageProjectSiteIdForm from './ManageProjectSiteIdForm';
import projectListActions from '../../../store/actions/projectList-actions';
import AdvancedTableExpandable from '../../../components/AdvancedTableExpandable';
// import AllocateProjectForm from './AllocateProjectForm';
// import AllocateProjectDateForm from './AllocateProjectDateForm';
import SearchBarView from '../../../components/SearchBarView';
// import ManageSite from '../ManageSite/ManageSite';
// import EditingManageSite from '../ManageSite/EditingManageSite';

import ProgressBar from '../../../components/ProgressBar';
import { onehundcolor } from '../../../utils/queryBuilder';
import Tooltip from '../../../components/Tooltip';
import ManageMilestoneSite from '../Admin/ManageSite/ManageMilestoneSite';

const vendorProject = () => {


    const { projectuniqueId } = useParams()


    const [modalOpen, setmodalOpen] = useState(false)
    const [modalFullOpen, setmodalFullOpen] = useState(false)

    const [globalData, setGlobalData] = useState({});
    const [SiteId, setSiteId] = useState("Add");
    const [parentsite, setparentsite] = useState([])
    const [childsite, setchildsite] = useState([])
    const [modalBody, setmodalBody] = useState(<></>)
    const [getmultiSelect, setmultiSelect] = useState([])

    const [modalHead, setmodalHead] = useState(<></>)

    const [old, setOld] = useState(<></>)
    const navigate = useNavigate();



    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setValues,
        getValues,
        formState: { errors },
    } = useForm()


    let dispatch = useDispatch()

    const dataGetterOld = useSelector((state) => {
        let oldata = state.projectList.getProjectTypeSub
        if (old["_id"] != oldata["_id"]) {
            setOld(oldata)
            setValue("ptype", oldata["projectType"])
        }
        console.log(oldata, "olddataolddataolddata")
        return state.projectList.getProjectTypeSub
    })


    let dbConfigL = useSelector((state) => {
        let interdata = state?.vendorData?.getVendorProjectList
        return interdata
    })
    console.log(childsite, "childsitechildsite", parentsite, "parentsiteparentsite")
    let dbConfigList = useSelector((state) => {
        let interdata = state?.vendorData?.getVendorProjectList
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,
                siteIdLink: <p className='' onClick={() => {
                    setmodalFullOpen(prev => !prev)
                    // dispatch(AdminActions.getProject())
                    setmodalHead("Update Site")
                    dispatch(AdminActions.getProjectTypeDyform(dataGetterOld?.custId + "/" + projectuniqueId))
                    setmodalBody(<EditingManageSite setGlobalData={setGlobalData} setSiteId={setSiteId} setmodalFullOpen={setmodalFullOpen} projectuniqueId={projectuniqueId} />)

                    // setmodalBody(<ManageProjectSiteIdForm projectuniqueId={projectuniqueId} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
                }}>{itm.siteId}</p>,

                // CompletionBar: <ProgressBar notifyType={"success"} text={`${100 - ((itm.milestoneArray.length - itm.milestoneArray.filter(iewq => iewq.mileStoneStatus == "Close").length) / itm.milestoneArray.length * 100)}`} />,
                CompletionBar: <ProgressBar notifyType={"success"} percent={`${100 - ((itm.milestoneArray.length - itm.milestoneArray.filter(iewq => iewq.mileStoneStatus == "Close").length) / itm.milestoneArray.length * 100)}`} text={`${itm.milestoneArray.filter(iewq => iewq.mileStoneStatus == "Close").length} / ${itm.milestoneArray.length}`} />,
                checkboxProject: <>
                    <input type={"checkbox"} checked={parentsite.indexOf(itm.uniqueId) != -1} value={itm.uniqueId} onChange={(e) => {
                        if (e.target.checked) {
                            setparentsite(prev => [...prev, e.target.value])
                            let dlisting = itm.milestoneArray.map((iewq) => {
                                return iewq.uniqueId
                            })
                            setchildsite(prev => [...prev, ...dlisting])
                        } else {
                            setparentsite(prev => {
                                let lst = prev.indexOf(e.target.value)
                                prev.splice(lst, 1)
                                return [...prev]
                            })



                            setchildsite(prev => {
                                itm.milestoneArray.map((iewq) => {
                                    let lst = prev.indexOf(iewq.uniqueId)
                                    prev.splice(lst, 1)
                                })
                                return [...prev]
                            }
                            )

                        }
                    }} />
                </>,

                siteage: itm.siteageing ? itm.siteageing >= 0 ? <p className='text-green-600'>{itm.siteageing + " Days"}</p> : <p className='text-red-600'>{itm.siteageing + " Days"}</p> : "",
                // siteStartDate: <div className='flex content-center w-full justify-center'>
                //     <CstmButton className={"p-2 w-full"} child={<Button name={itm.plannedStartDate ? itm.plannedStartDate : "Assign Date"} onClick={() => {
                //         setmodalOpen(true)

                //         dispatch(projectListActions.getUserAllocatedProject(true, projectuniqueId))
                //         setmodalHead("Add Planned Start Date")
                //         setmodalBody(<>
                //             <AllocateProjectDateForm projectuniqueId={projectuniqueId} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                //             {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                //         </>)
                //         console.log('ahshshhs', itm)
                //         //setmodalOpen(false)
                //     }} classes='w-full'></Button>} />
                // </div>,


                milestoneArray: itm.milestoneArray.map((iewq) => {

                    // console.log(iewq, "iewqiewqiewqiewq")
                    return {
                        ...iewq,
                        SubProject: "",

                        MileDevName: <div className='flex'>
                            {/* <CstmButton className={"p-2 w-full"} icon child={<Button name={iewq.assignerName ? iewq.assignerName : "Unassigned"} onClick={() => {
                                setmodalOpen(true)

                                dispatch(projectListActions.getUserAllocatedProject(true, projectuniqueId))
                                setmodalHead("Allocate Milestone")
                                setmodalBody(<>
                                    <AllocateProjectForm projectuniqueId={projectuniqueId} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={iewq} />
                                    {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                            {/* </>) */}
                            {/* //     console.log('ahshshhs', itm)
                                
                            // }} classes='w-full bg-white text-black'></Button>} /> */}

                            <p className='cursor' onClick={() => {
                                setmodalOpen(true)

                                dispatch(projectListActions.getUserAllocatedProject(true, projectuniqueId))
                                setmodalHead("Allocate User")
                                setmodalBody(<>
                                    <AllocateProjectForm from={"mileStone"} listsite={[]} projectuniqueId={projectuniqueId} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={iewq} />
                                    {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={()=>{
                                        handleSubmit(onTableViewSubmit)
                                    }} /></div> */}
                                </>)
                                console.log('ahshshhs', itm)
                            }
                            }>{iewq.assignerResult ? <div className='flex flex-row justify-center'> {
                                iewq.assignerResult.slice(0, 2).map((itwsw, index) => (<p className={`flex justify-center items-center mx-0.5 rounded-full text-white w-8 h-8 ${onehundcolor[index]}`}> {itwsw.assignerName.split(" ").length > 1 ? itwsw.assignerName.split(" ")[0].substr(0, 1) + itwsw.assignerName.split(" ")[1].substr(0, 1) : itwsw.assignerName.split(" ")[0].substr(0, 1)}</p>))
                            }</div> : "Unassigned"}</p>

                        </div>,

                        SiteNaming: <p className='' onClick={() => {
                            setmodalFullOpen(prev => !prev)
                            // dispatch(AdminActions.getProject())
                            setmodalHead("Update Milestone")
                            dispatch(AdminActions.getOneProjectTypeDyform(itm.uniqueId))
                            setmodalBody(<ManageMilestoneSite siteCompleteData={itm} uid={itm["uniqueId"]} mileStone={iewq} setGlobalData={setGlobalData} setSiteId={setSiteId} setmodalFullOpen={setmodalFullOpen} projectuniqueId={projectuniqueId} />)

                            // setmodalBody(<ManageProjectSiteIdForm projectuniqueId={projectuniqueId} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
                        }}>{iewq.Name}</p>,
                        taskmageing: iewq.taskageing >= 0 ? <p className='text-green-600'>{iewq.taskageing + " Days"}</p> : <p className='text-red-600'>{iewq.taskageing + " Days"}</p>,
                        Predecessor: iewq.Predecessor,
                        CompletionBar: <ProgressBar notifyType={iewq.taskageing >= 0 ? "success" : "alert"} percent={iewq.mileStoneStatus == "Open" ? "0" : "100"} text={parseTwoDigit(iewq.mileStoneStatus == "Open" ? "0" : "100") + " %"} />,
                        checkboxProject: <>
                            <input type={"checkbox"} checked={childsite.indexOf(iewq.uniqueId) != -1} value={iewq.uniqueId} onChange={(e) => {
                                if (e.target.checked) {


                                    setchildsite(prev => {

                                        let finalinzingdata = [...prev, e.target.value]

                                        let tkChaeck = true
                                        itm.milestoneArray.map((iefr) => {
                                            if (finalinzingdata.indexOf(iefr.uniqueId) == -1) {
                                                tkChaeck = false
                                            }
                                        })


                                        console.log(tkChaeck, "tkChaecktkChaecktkChaeck")

                                        if (tkChaeck && itm.totalCount == itm.milestoneCount) {
                                            setparentsite(prev => [...prev, itm.uniqueId])
                                        }

                                        return finalinzingdata
                                    })

                                    console.log(childsite, "childsitechildsitechildsitechildsite")
                                } else {

                                    setchildsite(prev => {
                                        let lst = prev.indexOf(e.target.value)
                                        prev.splice(lst, 1)
                                        setparentsite(preving => {
                                            let lst = preving.indexOf(itm.uniqueId)
                                            preving.splice(lst, 1)
                                            return [...preving]
                                        })
                                        return [...prev]
                                    })


                                }
                            }} />
                        </>
                        // MileStartDate: <div className='flex content-center w-full justify-center'>
                        //     <CstmButton className={"p-2 w-full"} child={<Button name={iewq.plannedStartDate ? iewq.plannedStartDate : "Assign Date"} onClick={() => {
                        //         setmodalOpen(true)

                        //         dispatch(projectListActions.getUserAllocatedProject(true, projectuniqueId))
                        //         setmodalHead("Add Planned Start Date")
                        //         setmodalBody(<>
                        //             <AllocateProjectDateForm projectuniqueId={projectuniqueId} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={iewq} />
                        //             {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                        //         </>)
                        //         console.log('ahshshhs', itm)
                        //         //setmodalOpen(false)
                        //     }} classes='w-full'></Button>} />
                        // </div>
                    }
                }),
                // "status": <CstmButton child=
                // {<ToggleButton onChange={(e) => {
                //     console.log(e.target.checked, "e.target.checked")
                //     let data = {
                //         "enabled": e.target.checked ? 1 : 0
                //     }
                //     dispatch(AlertConfigurationActions.patchAlertConfig(true, data, () => {
                //         // alert(e.target.checked)
                //         e.target.checked = e.target.checked
                //     }, itm.id))
                //     // if(itm.enabled==0){ 
                //     //     itm.enabled=1
                //     // }else{
                //     //     itm.enabled=0
                //     // }
                //     // itm.enabled=itm.enabled==0?1:0
                //     console.log(itm.enabled, "itm.enabled")
                // }} defaultChecked={itm.enabled == 1 ? true : false}></ToggleButton>} />,

                // projectId: (
                //     <p
                //         // onClick={() => handleFullName(item)}
                //         onClick={() => navigate(`/projectSiteId/${itm.customeruniqueId}`)}
                //         className="text-pcol font-extrabold hover:underline focus:outline-none hover:font-semibold"
                //     >
                //         {itm.projectId}
                //     </p>
                // ),


                "edit": <div className='flex '><CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    dispatch(VendorActions.getManageVendorDetails())
                    setmodalHead("Edit Site ID")
                    setmodalBody(<>
                        <ManageProjectSiteIdForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                        {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>)
                    console.log('ahshshhs', itm)
                    //setmodalOpen(false)
                }}></EditButton>} /></div>,

                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-rose-400' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.vendor_project_list}/${itm.uniqueId}`, () => {
                                    dispatch(VendorActions.getVendorProjectList())
                                    dispatch(ALERTS({ show: false }))
                                }))
                            }} name={"OK"} />,
                            <Button classes='w-auto' onClick={() => {
                                console.log('snnsnsnsns')
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
        let interdata = state?.vendorData?.getVendorProjectList
        if (interdata.length > 0) {
            return interdata[0]["overall_table_count"]
        } else {
            return 0
        }
    })



    let table = {
        columns: [
            // {
            //     name: <input type={"checkbox"} checked={dbConfigL.length != 0 && parentsite.length == dbConfigL.length ? true : false} onClick={(e) => {
            //         if (e.target.checked) {
            //             dbConfigL.map((itm) => {
            //                 if (childsite.indexOf(itm.uniqueId) == -1) {
            //                     setparentsite(prev => [...prev, itm.uniqueId])
            //                 }
            //                 itm.milestoneArray.map((iewq) => {
            //                     if (childsite.indexOf(iewq.uniqueId) == -1) {
            //                         setchildsite(prev => [...prev, iewq.uniqueId])
            //                     }
            //                 })
            //             })
            //         } else {
            //             setchildsite(prev => [])
            //             setparentsite(prev => [])
            //         }
            //     }} />,
            //     value: "checkboxProject",
            //     style: "min-w-[40px] max-w-[40px] text-center"
            // },
            {
                name: "Site ID",
                value: "siteIdLink",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Customer",
                value: "customer",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Project Group",
                value: "projectGroup",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Project ID",
                value: "projectId",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Project Type",
                value: "projectType",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Sub Project",
                value: "subProject",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Vendor Name",
                value: "vendorName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Vendor ID",
                value: "vendorId",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Task Allocation Date",
                value: "taskAllocationDate",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "MS Completition Date",
                value: "msCompletitionDate",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Ageing",
                value: "ageing",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Predecessor",
                value: "predecessor",
                style: "min-w-[240px] max-w-[240px] text-center"

            },
            {
                name: "MS1 Completition Date",
                value: "predecessor",
                style: "min-w-[240px] max-w-[240px] text-center"

            },
            {
                name: "MS2 Completition Date",
                value: "",
                style: "min-w-[240px] max-w-[240px] text-center"

            },
            {
                name: "MS Status",
                value: "msStatus",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Vendor Item code",
                value: "vendorItemCode",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Vendor Rate",
                value: "vendorRate",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "PO eligibility (Yes/No)",
                value: "poEliibility",
                style: "min-w-[140px] max-w-[200px] text-center"
            },

            // {
            //     name: "Completion (%)",
            //     value: "CompletionBar",
            //     style: "min-w-[140px] max-w-[200px] text-center"
            // },
            
            // {
            //     name: "Status",
            //     value: "siteStatus",
            //     style: "min-w-[140px] max-w-[200px] text-center"

            // },
            // {
            //     name: "Billing Status",
            //     value: "siteBillingStatus",
            //     style: "min-w-[140px] max-w-[200px] text-center"
            // },
            // {
            //     name: "Edit",
            //     value: "edit",
            //     style: "min-w-[100px] max-w-[200px] text-center"
            // },
            // {
            //     name: "Delete",
            //     value: "delete",
            //     style: "min-w-[100px] max-w-[200px] text-center"
            // }
        ],
        childList: [""],
        childs: {
            "milestoneArray": [
                {
                    name: "",
                    value: "checkboxProject",
                    style: "min-w-[40px] max-w-[40px] text-center"
                },
                {
                    name: "Site ID",
                    value: "SiteNaming",
                    style: "min-w-[140px] max-w-[200px] text-center"
                },
                {
                    name: "Sub Project",
                    value: "SubProject",
                    style: "min-w-[140px] max-w-[200px] text-center"
                },
                {
                    name: "Owner",
                    value: "MileDevName",
                    style: "min-w-[180px] max-w-[180px] text-center"
                },
                {
                    name: "Planned Start Date",
                    value: "mileStoneStartDate",
                    style: "min-w-[140px] max-w-[200px] text-center"
                },
                {
                    name: "Planned End Date",
                    value: "mileStoneEndDate",
                    style: "min-w-[140px] max-w-[200px] text-center"
                },
                {
                    name: "Completition Date",
                    value: "CC_Completion Date",
                    style: "min-w-[140px] max-w-[200px] text-center"
                },
                {
                    name: "Ageing",
                    value: "taskmageing",
                    style: "min-w-[140px] max-w-[200px] text-center"

                },
                {
                    name: "Completion (%)",
                    value: "CompletionBar",
                    style: "min-w-[140px] max-w-[200px] text-center"
                },

                {
                    name: "Predecessor",
                    value: "Predecessor",
                    style: "min-w-[240px] max-w-[240px] text-center"

                },
                {
                    name: "Status",
                    value: "mileStoneStatus",
                    style: "min-w-[140px] max-w-[200px] text-center"
                },

                {
                    name: "Billing Status",
                    value: "",
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
                }
            ]
        },
        properties: {
            rpp: [10, 20, 50, 100]
        },
        filter: [
            // {
            //     label: "Role",
            //     type: "select",
            //     name: "rolename",
            //     option: roleList,
            //     props: {
            //     }
            // }
        ]
    }
    const onSubmit = (data) => {
        // console.log("jsjsjsjss", data)
        let value = data.reseter
        delete data.reseter
        dispatch(VendorActions.getVendorProjectList(value, objectToQueryString(data)))
    }
    useEffect(() => {
        dispatch(VendorActions.getVendorProjectList())
        // dispatch(projectListActions.getProjectType(projectuniqueId))

        // dispatch(projectListActions.getProjectTypeAll(projectuniqueId))





        // dispatch(AdminActions.getProject(`${projectuniqueId}${projecttypeuniqueId?"/"+projecttypeuniqueId:""}`))
        // dispatch(OperationManagementActions.getRoleList())
    }, [])
    return <>
        <AdvancedTableExpandable
            // searchView={
            // <SearchBarView onblur={(e) => {
            //     console.log("SearchBarView onblur", e.target.value)
            //     dispatch(projectListActions.getProjectTypeAll(projectuniqueId, e.target.value != "" ? "mileStoneName=" + e.target.value : ""))
            // }} onchange={(e) => {

            //     dispatch(projectListActions.getProjectTypeAll(projectuniqueId, e.target.value != "" ? "mileStoneName=" + e.target.value : ""))
            //     console.log("SearchBarView onchange", e.target.value)
            // }} 
            // placeHolder={"Enter Milestone Name"} />}

            headerButton={<div className='flex gap-1'>


                {/* <Button classes='w-auto ' onClick={(e) => {
                    setmodalOpen(prev => !prev)
                    // dispatch(AdminActions.getProject())
                    setmodalHead("Add Site ID")
                    setmodalBody(<ManageProjectSiteIdForm projectuniqueId={projectuniqueId} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
                }}
                    name={"Add Site ID"}></Button> */}



                {/* <Button classes='w-auto ' onClick={(e) => {

                    if (childsite.length > 0) {
                        setmodalOpen(prev => !prev)
                        // dispatch(AdminActions.getProject())

                        dispatch(projectListActions.getUserAllocatedProject(true, projectuniqueId))
                        setmodalHead("Allocate Task")
                        setmodalBody(<AllocateProjectForm from={"bulktask"} listsite={childsite} projectuniqueId={projectuniqueId} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={{}} />)
                    } else {
                        let msgdata = {
                            show: true,
                            icon: "error",
                            buttons: [],
                            type: 1,
                            text: "Please Select at least one site for bulk allocate",
                        };
                        dispatch(ALERTS(msgdata));
                    }
                }}
                    name={"Task Allocate"}></Button> */}




                {/* <Button classes='w-auto ' onClick={(e) => {
                    if (parentsite.length > 0) {
                        setmodalOpen(prev => !prev)
                        // dispatch(AdminActions.getProject())
                        dispatch(projectListActions.getUserAllocatedProject(true, projectuniqueId))
                        setmodalHead("Allocate Site")
                        setmodalBody(<AllocateProjectForm from={"bulksite"} listsite={parentsite} projectuniqueId={projectuniqueId} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={{}} />)
                    } else {
                        let msgdata = {
                            show: true,
                            icon: "error",
                            buttons: [],
                            type: 1,
                            text: "Please Select at least one site for bulk allocate",
                        };
                        dispatch(ALERTS(msgdata));
                    }
                }}
                    name={"Site Allocate"}></Button> */}



                {/* <Button name={"Upload File"} classes='w-auto ' onClick={(e) => {
                    setFileOpen(prev=>!prev)
                }}></Button> */}
            </div>}
            table={table}
            filterAfter={onSubmit}
            tableName={"UserListTable"}
            handleSubmit={handleSubmit}
            data={(dbConfigList[0]?.uniqueId) ?
                dbConfigList : []}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
            multiSelect={false}
            getmultiSelect={getmultiSelect}
            setmultiSelect={setmultiSelect}
            totalCount={dbConfigTotalCount}
        />

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />
        <Modal size={"full"} modalHead={modalHead} children={modalBody} isOpen={modalFullOpen} setIsOpen={setmodalFullOpen} />


        {/* <CommonForm/> */}
    </>


};

export default vendorProject;