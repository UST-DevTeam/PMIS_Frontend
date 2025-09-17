import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import AdvancedTable from '../../../components/AdvancedTable';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import CstmButton from '../../../components/CstmButton';
import { objectToQueryString } from '../../../utils/commonFunnction';
import CommonActions from '../../../store/actions/common-actions';
import { Urls } from '../../../utils/url';
import FileUploader from '../../../components/FIleUploader';
import AirtelActions from '../../../store/actions/airtel-actions';
import EditButton from '../../../components/EditButton';
import SurveyAllocationForm from './SurveyAllocationForm';
import { GET_AIRTEL_ONE_PLANNINGDATA, GET_AIRTEL_USER_ALLLOCATED_PROJECT } from '../../../store/reducers/airtel-reducer';
import RFAIPlanningDataForm from './RFAIPlanningDataForm';
import SearchBarView from '../../../components/SearchBarView';

const RFAIOffered = () => {

    const [modalOpen, setmodalOpen] = useState(false)
    const [fileOpen, setFileOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    const [modalFullOpen, setmodalFullOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const debounceTimeout = useRef(null);

    let dispatch = useDispatch()

    let onehundcolor = [
        "bg-[#ff66cc]",
        "bg-[#7e5ebf]",
        "bg-[#2dbd77]",
        "bg-[#fd9239]",
        "bg-[#6db26a]",
        "bg-[#cc537c]",
        "bg-[#4aa6e0]",
        "bg-[#e54a4a]",
        "bg-[#9f88c5]",
        "bg-[#ffb93d]",
        "bg-[#3e8d8a]",
        "bg-[#e64c4c]",
        "bg-[#5ea89c]",
        "bg-[#f9a53e]",
        "bg-[#4989d3]",
        "bg-[#ba6494]",
        "bg-[#76b75f]",
        "bg-[#c55d2d]",
        "bg-[#3f7bbb]",
        "bg-[#d8577b]",
        "bg-[#559a72]",
        "bg-[#f3a53d]",
        "bg-[#7e4e97]",
        "bg-[#4a9ad2]",
        "bg-[#cf573f]",
        "bg-[#3f7eab]",
        "bg-[#e34545]",
        "bg-[#5c8d8a]",
        "bg-[#bb654e]",
        "bg-[#2db68d]",
        "bg-[#e34a67]",
        "bg-[#639b6f]",
        "bg-[#edac3f]",
        "bg-[#4576a7]",
        "bg-[#a65e8f]",
        "bg-[#6fa769]",
        "bg-[#cc643d]",
        "bg-[#3c81ae]",
        "bg-[#ec4747]",
        "bg-[#589788]",
        "bg-[#e39449]",
        "bg-[#4f8ed5]",
        "bg-[#c3626e]",
        "bg-[#78b86d]",
        "bg-[#d75d3b]",
        "bg-[#4e7ca3]",
        "bg-[#ea5a5a]",
        "bg-[#53967c]",
        "bg-[#f3a346]",
        "bg-[#5b7aa4]",
        "bg-[#da5b66]",
        "bg-[#3a8b72]",
        "bg-[#f3ad4c]",
        "bg-[#7c5887]",
        "bg-[#53967c]",
        "bg-[#e45251]",
        "bg-[#598b76]",
        "bg-[#ef8944]",
        "bg-[#4476a6]",
        "bg-[#c15a8c]",
        "bg-[#78b86d]",
        "bg-[#f5964c]",
        "bg-[#4a87ce]",
        "bg-[#bd6142]",
        "bg-[#3e849e]",
        "bg-[#ea5b64]",
        "bg-[#5f926d]",
        "bg-[#ef8644]",
        "bg-[#4278a5]",
        "bg-[#c45b78]",
        "bg-[#77b56f]",
        "bg-[#f49044]",
        "bg-[#5877a3]",
        "bg-[#e65156]",
        "bg-[#5c9177]",
        "bg-[#f5964c]",
        "bg-[#4d82be]",
        "bg-[#c45d55]",
        "bg-[#78b86d]",
        "bg-[#ed9845]",
        "bg-[#4278a5]",
        "bg-[#d35768]",
        "bg-[#3f8da2]",
        "bg-[#ea6265]",
        "bg-[#628e6d]",
        "bg-[#f18a44]",
        "bg-[#5476a2]",
        "bg-[#eb5f5f]",
        "bg-[#5c8e77]",
        "bg-[#f39c4e]",
        "bg-[#4c84bc]",
        "bg-[#d75863]",
        "bg-[#4279a2]",
        "bg-[#e65e61]",
        "bg-[#5e8f76]",
        "bg-[#f18c47]",
        "bg-[#5376a1]",
        "bg-[#ec6367]",
        "bg-[#618e6d]",
        "bg-[#f29148]",
        "bg-[#4f85bf]"
    ];

    function downloadAttachment(type,id,srNumber,circle,siteId) {
        dispatch(
            CommonActions.commondownload(`/compliance/export/${type}/${id}`,`${srNumber}_${circle}_${siteId}_RFAISurveyData_report.${type === "Excel" ? "xlsx" : "pdf"}`)
        );
    }
    
    let dbConfigList = useSelector((state) => {
        let interdata = state?.airtelData?.getAirtelRFAIOffered || [""]
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,

                "Sr Number": (
                    <p
                        className="text-[#13b497] font-extrabold cursor-pointer"
                        onClick={() => {
                            setmodalFullOpen((prev) => !prev);
                            setmodalHead("SR Number --> "+itm["Sr Number"]);
                            setmodalBody(<RFAIPlanningDataForm uid={itm["uniqueId"]} completeData = {itm}/>);
                        }}
                    >
                        {itm["Sr Number"]}
                    </p>
                ),

                "attachmentDownload": (
                    ['Submitted',"Accepted"].includes(itm.status) ?(
                        <CstmButton
                      className={"p-2"}
                      child={
                        <div className="flex space-x-2 items-center">
                          <Button
                            onClick={() => {
                                downloadAttachment("Excel", itm?.uniqueId,itm?.['Sr Number'],itm?.['Circle'] || "",itm?.['Site ID'] || "");
                            }}
                            classes="!py-[2px] bg-green-600"
                            title="Download Excel"
                          >
                            <svg
                              className="w-4 h-4 fill-white"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              fill="rgba(29,29,29,1)"
                            >
                              <path d="M2.85858 2.87732L15.4293 1.0815C15.7027 1.04245 15.9559 1.2324 15.995 1.50577C15.9983 1.52919 16 1.55282 16 1.57648V22.4235C16 22.6996 15.7761 22.9235 15.5 22.9235C15.4763 22.9235 15.4527 22.9218 15.4293 22.9184L2.85858 21.1226C2.36593 21.0522 2 20.6303 2 20.1327V3.86727C2 3.36962 2.36593 2.9477 2.85858 2.87732ZM4 4.73457V19.2654L14 20.694V3.30599L4 4.73457ZM17 19H20V4.99997H17V2.99997H21C21.5523 2.99997 22 3.44769 22 3.99997V20C22 20.5523 21.5523 21 21 21H17V19ZM10.2 12L13 16H10.6L9 13.7143L7.39999 16H5L7.8 12L5 7.99997H7.39999L9 10.2857L10.6 7.99997H13L10.2 12Z"></path>
                            </svg>
                          </Button>
                        </div>
                      }
                    />
                    ):""
                ),

                "survey": (
                    itm.status === "Open" || itm.status === "Rejected" ? (
                        <CstmButton 
                            className={"p-2"} 
                            child={
                                <EditButton 
                                    name={""} 
                                    onClick={() => {
                                        setmodalOpen(true)
                                        dispatch(GET_AIRTEL_USER_ALLLOCATED_PROJECT({ dataAll:[], reset:true }))
                                        dispatch(AirtelActions.getAirtelUserAllocatedProject(true,itm.circleId));
                                        setmodalHead("Allocation of RFAI Survey")
                                        setmodalBody(<>
                                            <SurveyAllocationForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                                        </>)
                                    }}>
                                </EditButton>
                            } 
                        />
                    ):""
                ),

                "MileDevName": (
                    <div className="flex">
                        <p>
                        {itm.assignerResult ? (
                            <>
                            <div class="">
                                <div class="group flex flex-row relative items-center w-full">
                                {itm.assignerResult
                                    .slice(0, 2)
                                    .map((itwsw, index) => (
                                    <p
                                        key={index}
                                        // className={`flex justify-center items-center mx-0.5 rounded-full text-white w-8 h-8 ${onehundcolor[index]}`}
                                        className={`flex justify-center items-center rounded-full text-white w-6 h-6 ${onehundcolor[index]}`}
                                    >
                                        {" "}
                                        {itwsw.assignerName &&
                                        itwsw.assignerName.trim().split(" ").length > 1
                                        ? `${itwsw.assignerName
                                            .split(" ")[0]
                                            .substr(0, 1)}${itwsw.assignerName
                                            .split(" ")[1]
                                            .substr(0, 1)}`
                                        : itwsw.assignerName
                                        ? itwsw.assignerName
                                            .split(" ")[0]
                                            .substr(0, 1)
                                        : ""}
                                    </p>
                                    ))}
                                <span class="pointer-events-none w-max   bg-gray-500 z-[100px] rounded-lg p-2 opacity-0 transition-opacity group-hover:opacity-100">
                                    {itm.assignerResult.map((itws) => itws.assignerName).join(", ")}
                                </span>
                                </div>
                            </div>
                            </>
                        ) : (
                            "Unassigned"
                        )}
                        </p>
                    </div>
                    ),
            }
            return updateditm
        });
    })

    let dbConfigTotalCount = useSelector((state) => {
        let interdata = state?.airtelData?.getAirtelRFAIOffered
        if (interdata.length > 0) {
            return interdata[0]["overall_table_count"]
        } else {
            return 0
        }
    })


    const {register,handleSubmit,watch,setValue,setValues,getValues,formState: { errors }} = useForm()

    let table = {
        columns: [
            {
                name: "SR No",
                value: "Sr Number",
                style: "min-w-[80px] max-w-[200px] text-center"
            },
            {
                name: "Circle",
                value: "Circle",
                style: "min-w-[60px] max-w-[200px] text-center"
            },
            {
                name: "Site ID",
                value: "Site ID",
                style: "min-w-[100px] max-w-[200px] text-center"
            },          
            {
                name: "TOCO Site ID",
                value: "TOCO Site ID",
                style: "min-w-[100px] max-w-[200px] text-center"
            },          
            {
                name: "TOCO Name",
                value: "TOCO Name",
                style: "min-w-[100px] max-w-[200px] text-center"
            },          
            {
                name: "SR Type",
                value: "SR Type",
                style: "min-w-[100px] max-w-[200px] text-center"
            },
            {
                name: "Assign Date",
                value: "assignDate",
                style: "min-w-[100px] max-w-[200px] text-center"
            },  
            {
                name: "Assign to",
                value: "MileDevName",
                style: "min-w-[100px] max-w-[200px] text-center"
            },
            {
                name: "Assign Type",
                value: "typeAssigned",
                style: "min-w-[100px] max-w-[200px] text-center"
            }, 
            {
                name: "Survey Date",
                value: "RFAI Survey Date",
                style: "min-w-[100px] max-w-[200px] text-center"
            },
                   
                   
            // {
            //     name: "Product Name",
            //     value: "Product Name",
            //     style: "min-w-[140px] max-w-[200px] text-center"
            // },          
            // {
            //     name: "Upgrade Type",
            //     value: "Upgrade Type",
            //     style: "min-w-[140px] max-w-[200px] text-center"
            // },          
                      
            // {
            //     name: "SR Current Status",
            //     value: "SR Current Status",
            //     style: "min-w-[140px] max-w-[200px] text-center"
            // },          
            // {
            //     name: "SR Submission Date",
            //     value: "SR Submission Date",
            //     style: "min-w-[140px] max-w-[200px] text-center"
            // },          
            // {
            //     name: "SR Current Status Date",
            //     value: "SR Current Status Date",
            //     style: "min-w-[180px] max-w-[200px] text-center"
            // },          
            // {
            //     name: "SR Created by",
            //     value: "SR Created by",
            //     style: "min-w-[140px] max-w-[200px] text-center"
            // },          
            // {
            //     name: "SR Entry Type",
            //     value: "SR Entry Type",
            //     style: "min-w-[140px] max-w-[200px] text-center"
            // },          
            // {
            //     name: "SP DATE",
            //     value: "SP DATE",
            //     style: "min-w-[140px] max-w-[200px] text-center"
            // },          
            // {
            //     name: "SO DATE",
            //     value: "SO DATE",
            //     style: "min-w-[140px] max-w-[200px] text-center"
            // },          
            // {
            //     name: "RFAI Date",
            //     value: "RFAI Date",
            //     style: "min-w-[140px] max-w-[200px] text-center"
            // },          
            // {
            //     name: "RFAI Status",
            //     value: "RFAI Status",
            //     style: "min-w-[140px] max-w-[200px] text-center"
            // },          
            {
                name: "Acceptance Date",
                value: "RFAI Acceptance Date",
                style: "min-w-[100px] max-w-[200px] text-center"
            },          
            {
                name: "Rejection Date",
                value: "RFAI Rejection Date",
                style: "min-w-[100px] max-w-[200px] text-center"
            },          
                      
            {
                name: "Status",
                value: "status",
                style: "min-w-[100px] max-w-[200px] text-center"
            },
            {
                name: "Allocation",
                value: "survey",
                style: "min-w-[100px] max-w-[200px] text-center"
            },          
            {
                name: "Survey Data Attachment",
                value: "attachmentDownload",
                style: "min-w-[100px] max-w-[200px] text-center"
            },
            {
                name: "History",
                value: "RFAI History",
                style: "min-w-[500px] max-w-[500px] text-center"
            },         
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
        properties: {
            rpp: [10, 20, 50, 100]
        },
        filter: []
    }

    const onSubmit = (data) => {
        let value = data.reseter
        delete data.reseter
        dispatch(AirtelActions.getAirtelRFAIOffered(value, objectToQueryString(data)))
    }

    useEffect(() => {
        dispatch(AirtelActions.getAirtelRFAIOffered())
    }, [])

    const onTableViewSubmit = (data) => { 
        data["fileType"]="RFAI_offered"
        dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr_airtel, data, () => {
            dispatch(AirtelActions.getAirtelRFAIOffered())
            setFileOpen(false)
        }))
    }

    const handleSearch = (value) => {
        dispatch(AirtelActions.getAirtelRFAIOffered(true,value !== "" ? "searvhView=" + value : ""))
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Clear the previous timeout
        if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
        }

        // Set a new timeout
        debounceTimeout.current = setTimeout(() => {
        handleSearch(value);
        }, 500); // Adjust the delay (in milliseconds) as needed
    };



    return <>
        <AdvancedTable
            searchView={
                <>
                    <SearchBarView
                    onblur={(e) => {}}
                    onchange={handleChange}
                    placeHolder={"Search...."}
                    />
                </>
            }
            headerButton={
                <div className='flex gap-1'>
                    {/* <Button name={"Upload File"} classes='w-auto' onClick={(e) => {setFileOpen(prev=>!prev)}}></Button> */}

                    <Button name={"Export"} classes='w-auto mr-2' onClick={(e) => {
                        dispatch(CommonActions.commondownload("/export/airtelPlannedData","Export_PlannedData.xlsx"))
                        }}>
                    </Button>

                </div>
            }
            table={table}
            filterAfter={onSubmit}
            tableName={"RFAIOffered"}
            handleSubmit={handleSubmit}
            data={dbConfigList}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
            totalCount={dbConfigTotalCount}
            heading = {"Total Records : "}
            actions = {['Edit']}
        />

        <Modal 
            size={"sm"} 
            modalHead={modalHead} 
            children={modalBody} 
            isOpen={modalOpen} 
            actionOnClose={() => {
                setmodalBody(null);
            }}
            setIsOpen={setmodalOpen} 
        />

        <Modal 
            size={"full"} 
            modalHead={modalHead} 
            children={modalBody} 
            isOpen={modalFullOpen} 
            actionOnClose={() => {
                setmodalBody(null);
            }}
            setIsOpen={setmodalFullOpen} 
        />
        {/* <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen} tempbtn={true} tempbtnlink = {["/template/RFAI_Offered_template.csv","RFAI_Offered_template.csv"]} /> */}
    </>


};

export default RFAIOffered;