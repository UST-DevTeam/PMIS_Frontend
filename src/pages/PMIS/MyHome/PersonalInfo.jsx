import React, { useEffect, useState } from "react";
import "react-querybuilder/dist/query-builder.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CommonForm from "../../../components/CommonForm";
import AdminActions from "../../../store/actions/admin-actions";
import MyHomeActions from "../../../store/actions/myHome-actions"
import { backendassetUrl } from "../../../utils/url";

const PersonalInfo = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  // const { empuid } = useParams();
  const dispatch = useDispatch();
  const [oneLoad, setOneLoad] = useState({});
  const [dataQuery, SetdataQuery] = useState("Select * from values;");
  const [filtering, setFiltering] = useState("Select * from values;");
  const [countform, setcountform] = useState([1]);
  const navigate = useNavigate();
  const [showPassportNumber, setshowPassportNumber] = useState(false);

  const [photoPreview, setPhotoPreview] = useState(null);
  const [cvPreview, setCvPreview] = useState(null);
  const [docsPreview, setDocsPreview] = useState(null);

  const PersonalInfo = useSelector((state) => {
    let data = state.myHomeData.getPersonalInfo;
    if (data.length > 0 && data[0]!=oneLoad) {
      setOneLoad(data[0]);

      // dispatch(GET_EMPLOYEE_DETAILS({ dataAll: [], reset: true }));

      // dispatch(HrActions.getManageEmpDetails(true, "dsadsa"));

      Object.entries(data[0]).map((iewq) => {
        setValue(iewq[0], iewq[1]);
      });
    }
    return state.myHomeData.getPersonalInfo;
  });


  let departmentList = useSelector((state) => {
    return state?.adminData?.getManageDepartment.map((itm) => {
      return {
        label: itm?.department,
        value: itm?.department,
      };
    });
  });

  let designationList = useSelector((state) => {
    return state?.adminData?.getManageDesignation.map((itm) => {
      return {
        label: itm?.designation,
        value: itm?.designation,
      };
    });
  });

  let roleList = useSelector((state) => {
    return state?.adminData?.getManageProfile.map((itm) => {
      return {
        label: itm?.roleName,
        value: itm?.roleName,
      };
    });
  });

  let costCenterList = useSelector((state) => {
    return state?.adminData?.getManageCostCenter.map((itm) => {
      return {
        label: itm?.costCenter,
        value: itm._id,
      };
    });
  });

  // let employeeList = [reportingManager,L2expManager,financeApproverList,reportingHrManager],

  let employeeList = useSelector((state) => {
    return state?.hrReducer?.getManageEmpDetails.map((itm) => {
      return {
        label: itm?.empName + " " + itm.empCode,
        value: itm?.empName + " " + itm.empCode + " " + itm.uniqueId,
      };
    });
  });

  let stateList = useSelector((state) => {
    return state?.adminData?.getState.map((itm) => {
      return {
        label: itm?.name,
        value: itm?.state_code,
      };
    });
  });

  let cityList = useSelector((state) => {
    return state?.adminData?.getCities.map((itm) => {
      return {
        label: itm?.name,
        value: itm?.name,
        stateCode: itm?.state_code,
      };
    });
  });

  let PersonalInformation = [
    {
      type: "heading",
      label: "Employee Details",
      classes: "col-span-4 font-extrabold text-pcol text-start",
    },
    {
      label: "Title",
      name: "title",
      value: "",
      type:"sdisabled",
      props: {},
      required: false,
      placeholder: "",
      option: [
        { label: "Mr.", value: "Mr" },
        { label: "Mrs.", value: "Mrs" },
        { label: "Ms.", value: "Ms" },
      ],
    },
    {
      label: "Employee Name",
      name: "empName",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Employee Code",
      name: "empCode",
      value: "",
      type:"sdisabled",
      required: true,
      placeholder: "",
    }, 
    {
      label: "UST Emp Code",
      name: "ustCode",
      value: "",
      type: "sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "UST Project ID",
      name: "ustProjectId",
      value: "",
      type: "sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "UST Job Code",
      name: "ustJobCode",
      value: "",
      type: "sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Father's Name",
      name: "fatherName",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Mother's Name",
      name: "motherName",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Marital Status",
      name: "martialStatus",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      option: [
        { label: "Married", value: "married" },
        { label: "Single", value: "single" },
      ],
    },
    {
      label: "Official Email-ID",
      name: "email",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Personal Email-ID",
      name: "personalEmailId",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Date Of Birth(as Per doc)",
      name: "dob",
      type:"sdisabled",
      value: "",
      props: "",
      required: false,
    },
    // { label: "Anniversay Date", name: "anniversaryDate", type: "datetime", required: true },
    {
      label: "Contact Number",
      name: "mobile",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Blood Group",
      name: "blood",
      value: "",
      type:"sdisabled",
      props: {},
      required: false,
      option: [
        { label: "A+", value: "A+" },
        { label: "A-", value: "A-" },
        { label: "B+", value: "B+" },
        { label: "B-", value: "B-" },
        { label: "AB+", value: "AB+" },
        { label: "AB-", value: "AB-" },
        { label: "O+", value: "O+" },
        { label: "O-", value: "O-" },
      ],
    },
  ]

  let ContactInformation = [
    {
      type: "heading",
      label: "Present Address",
      classes: "col-span-4 font-extrabold text-pcol text-start",
    },
    {
      label: "Country",
      id: "country",
      name: "country",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
      option: [{ label: "India", value: "india" }],
    },
    {
      label: "State",
      name: "state",
      id: "state",
      value: "",
      type:"sdisabled",
      placeholder: "",
      required: false,
      option: stateList,
      props: {
        onChange: (e) => {
          setValue("state", e.target.value);
          dispatch(AdminActions.getCities(true, `stateCode=${e.target.value}`));
        },
      },
    },
    {
      label: "city",
      name: "city",
      id: "city",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
      option: cityList,
    },
    {
      label: "PinCode",
      name: "pincode",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Address",
      name: "address",
      id: "address",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
  ];

  let ContactInformation2 = [
    {
      type: "heading",
      label: "Permanent Address",
      classes: "col-span-4 font-extrabold text-pcol text-start",
    },
    {
      label: "Country",
      name: "country",
      id: "country",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
      option: [{ label: "India", value: "india" }],
    },
    {
      label: "State",
      name: "state",
      id: "state",
      value: "",
      type:"sdisabled",
      placeholder: "",
      option: stateList,
      props: {
        onChange: (e) => {
          console.log(e.target.value, "e_geeter");

          setValue("state", e.target.value);

          dispatch(AdminActions.getCities(true, `stateCode=${e.target.value}`));
          // setStateName(e.target.value)
        },
      },
    },

    {
      label: "city",
      name: "city",
      id: "city",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
      option: cityList,
    },

    {
      label: "PinCode",
      name: "pincode",
      id: "pincode",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Address",
      name: "address",
      id: "address",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
  ];

  let EmploymentDetails = [
    {
      type: "heading",
      label: "Employment Details",
      classes: "col-span-4 font-extrabold text-pcol text-start",
    },
    // {
    //   label: "Employee Code",
    //   name: "empCode",
    //   value: "",
    //   type:"sdisabled",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    {
      label: "PAN Number",
      name: "panNumber",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Aadhar Number",
      name: "adharNumber",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Circle",
      name: "circle",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Experience",
      name: "experience",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Salary Currency",
      name: "salaryCurrency",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
      option: [
        { label: "INR", value: "INR" },
        { label: "USD", value: "USD" },
      ],
    },
    {
      label: "Monthly Salary",
      name: "monthlySalary",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Gross CTC",
      name: "grossCtc",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    // {label:"Official Email ID", name:"email", value:'', type:'text', props:'',required:true, placeholder:""},
    // {label:"Mobile No.", name:"mobile", value:'', type:'number', props:'',required:true, placeholder:""},
    {
      label: "Joining Date",
      name: "joiningDate",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Last Working Day",
      name: "lastWorkingDay",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Resign Date",
      name: "resignDate",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Passport",
      name: "passport",
      value: "",
      type:"sdisabled",
      required: false,
      placeholder: "",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      props: {
        onChange: (e) => {
          setshowPassportNumber(e.target.value === "Yes");
        },
      },
    },
  ];

  if (showPassportNumber) {
    EmploymentDetails.push({
      label: "Passport Number",
      name: "passportNumber",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    });
  }
  EmploymentDetails.push(
    {
      label: "Bank Name",
      name: "bankName",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Bank Account Number",
      name: "accountNumber",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "IFSC Code",
      name: "ifscCode",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Benificiary Name",
      name: "benificiaryname",
      value: "",
      type:"sdisabled",
      props: "",
      required: false,
      placeholder: "",
    }
  );

  let EmployeeProfile = [
    {
      type: "heading",
      label: "Employee Profile",
      classes: "col-span-4 font-extrabold text-pcol text-start",
    },
    {
      label: "Organization Level",
      name: "orgLevel",
      value: "",
      type:"sdisabled",
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Allocation Percentage",
      name: "allocationPercentage",
      value: "",
      type: "sdisabled",
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Business Unit",
      name: "businesssUnit",
      value: "",
      type: "sdisabled",
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Customer Name",
      name: "customer",
      value: "",
      type: "sdisabled",
      required: false,
      classes: "col-span-1",
    },
    {
      label: "Grade",
      name: "designation",
      value: "",
      type:"sdisabled",
      required: false,
      option: designationList,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Role",
      name: "role",
      value: "",
      type:"sdisabled",
      option: roleList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "PMIS Profile",
      name: "userRole",
      value: "",
      type:"sdisabled",
      option: roleList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Cost Center",
      name: "costCenter",
      value: "",
      type:"sdisabled",
      option: costCenterList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Designation",
      name: "band",
      value: "",
      type:"sdisabled",
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Department",
      name: "department",
      value: "",
      type:"sdisabled",
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Reporting Manager",
      name: "reportingManager",
      value: "",
      type:"sdisabled",
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L1 Approver ",
      name: "L1Approver",
      value: "",
      type:"sdisabled",
      required: false,
      props: {},
      option: employeeList,
      classes: "col-span-1",
    },
    {
      label: "L2 Aprrover",
      name: "L2Approver",
      value: "",
      type:"sdisabled",
      required: false,
      option: employeeList,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Finance Approver",
      name: "financeApprover",
      value: "",
      type:"sdisabled",
      option: employeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "HR Manager",
      name: "reportingHrManager",
      value: "",
      type:"sdisabled",
      option: employeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Asset Manager",
      name: "assetManager",
      value: "",
      type:"sdisabled",
      option: employeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L1 Vendor",
      name: "L1Vendor",
      value: "",
      type:"sdisabled",
      option: employeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L2 Vendor",
      name: "L2Vendor",
      value: "",
      type:"sdisabled",
      option: employeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L1 Compliance",
      name: "L1Compliance",
      value: "",
      type:"sdisabled",
      option: employeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L2 Compliance",
      name: "L2Compliance",
      value: "",
      type:"sdisabled",
      option: employeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L1 Commercial",
      name: "L1Commercial",
      value: "",
      type:"sdisabled",
      option: employeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L1 Sales",
      name: "L1Sales",
      value: "",
      type:"sdisabled",
      option: employeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L2 Sales",
      name: "L2Sales",
      value: "",
      type:"sdisabled",
      option: employeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Status",
      name: "status",
      value: "",
      type:"sdisabled",
      required: false,
      props: {},
      option: [
        { label: "Active", value: "Active" },
        { label: "Resign", value: "Resign" },
        { label: "Abscond", value: "Abscond" },
        { label: "Exit", value: "Exit" },
      ],
      classes: "col-span-1",
    },
    {
      label: "Password",
      name: "password",
      type:"sdisabled",
      value: "",
      required: false,
      props: {},
      classes: "col-span-1",
    },
  ];

  let SupportingDoc = [
    {
      type: "heading",
      label: "Supporting Document",
      classes: "col-span-4 font-extrabold text-pcol text-start",
    },
    {
      label: "Photo",
      name: "img[]",
      value: "",
      type:"sdisabled",
      required: false,
      props: {
        accept: "image/*",
      },
      classes: "col-span-1",
    },
    {
      label: "CV",
      name: "cv",
      value: "",
      type:"sdisabled",
      required: false,
      props: {
        accept: ".pdf,.doc,.docx",
      },
      classes: "col-span-1",
    },
    {
      label: "All Other Documents",
      name: "zip",
      value: "",
      type:"sdisabled",
      required: false,
      props: {
        accept: ".zip,.rar,.bin",
      },
      classes: "col-span-1",
    },
  ];

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   setValue,
  //   reset,
  //   getValues,
  //   formState: { errors },
  // } = useForm();

  const onTableViewGenerateSubmit = () => {
    dispatch(MyHomeActions.getPersonalInfo())
  };  

  useEffect(() => {
    dispatch(MyHomeActions.getPersonalInfo({ reset: false }))
    reset({});
  }, [])
 
  useEffect(() => {
    if (oneLoad && oneLoad["img[]"]) {
      const imagePath = oneLoad["img[]"].replace(/\\/g, '/');
      setPhotoPreview(`${backendassetUrl}${imagePath}`);
    }
  }, [oneLoad]);

  return (
    <>
      <div className=" w-full h-full">
      
        <div className="">
          {/* <UiTopBar /> */}
          <div className="w-full mt-2 bg-[#3e454d]">
            <div class="grid grid-cols-12 gap-2 m-2 bg-gray-800 border-[1.5px] border-pcol rounded-lg">
              <div className="col-span-12">
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full bg-[#3e454d] border border-[0.5px] border-pcol p-4 rounded-lg overflow-y-hidden"
                    }
                    errors={errors}
                    Form={PersonalInformation}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />

                  <CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full bg-[#3e454d] border border-[0.7px] border-pcol p-4 mt-2 rounded-lg overflow-y-hidden"
                    }
                    errors={errors}
                    Form={ContactInformation}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                  {/* <CommonForm classes={"grid-cols-2 gap-4 w-full"} errors={errors} Form={ContactInformation2}
                  register={register} setValue={setValue} getValues={getValues} /> */}
                  <CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full bg-[#3e454d] border border-[0.7px] border-pcol p-4 mt-2 rounded-lg overflow-y-hidden"
                    }
                    errors={errors}
                    Form={ContactInformation2}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                  <CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full bg-[#3e454d] h-auto border border-[0.7px] border-pcol p-4 mt-2 rounded-lg overflow-y-hidden"
                    }
                    errors={errors}
                    Form={EmploymentDetails}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                  <CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full bg-[#3e454d] h-auto border border-[0.7px] border-pcol p-4 mt-2 rounded-lg overflow-y-hidden"
                    }
                    errors={errors}
                    Form={EmployeeProfile}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                  {/* <CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full bg-[#3e454d] border border-[0.7px] border-pcol p-4 mt-2 rounded-lg overflow-y-hidden"
                    }
                    errors={errors}
                    Form={SupportingDoc}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  /> */}
               <div className="grid grid-cols-3 gap-4 w-full bg-[#3e454d] border-[0.7px] border-pcol p-4 mt-2 rounded-lg overflow-y-hidden">
                <h2 className="col-span-4 font-extrabold text-pcol text-start pl-7">
                  Supporting Documents
                </h2>

                {/* Photo Preview */}
                <div className="col-span-1">
                  <label className="text-white">Photo</label>
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Photo Preview"
                      className="mt-2 h-28 w-28 rounded-md object-cover"
                    />
                  ) : (
                    <p className="text-gray-400">No photo available</p>
                  )}
                </div>

                {/* CV Preview */}
                <div className="col-span-1">
                  <label className="text-white">CV</label>
                  {cvPreview ? (
                    <div className="mt-2">
                      <a
                        href={cvPreview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View CV
                      </a>
                    </div>
                  ) : (
                    <p className="text-gray-400">No CV available</p>
                  )}
                </div>

                {/* Other Documents Preview */}
                <div className="col-span-1">
                  <label className="text-white">All Other Documents</label>
                  {docsPreview ? (
                    <div className="mt-2">
                      <a
                        href={docsPreview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View Documents
                      </a>
                    </div>
                  ) : (
                    <p className="text-gray-400">No documents available</p>
                  )}
                </div>
              </div>
                  {/* <CommonForm classes={"grid-cols-2 gap-4 w-full mt-2"} errors={errors} Form={conDet}
                  register={register} setValue={setValue} getValues={getValues} /> */}
                </div>
                {/* <div class="grid h-96 grid-cols-1 gap-2 bg-white">
                <div className='col-span-1 h-full  pt-0 overflow-scroll relative border-primaryLine border'>


                  <div className='flex flex-col justify-between p-2'>
                    <div class="overflow-scroll">

                      {conditioncountform.map((val, index) => {
                        return <>
                          <CommonForm classes={"grid-cols-1 md:grid-cols-2 lg:gap-8 w-full"} errors={errors} Form={conditionmultiForm.map((itm) => {
                            return {
                              ...itm,
                              type: itm.name == "formovalue" ? nestfilter["wherecondition" + "_" + val + "_form"] == "joins" ? "muitiSelect" : "text" : itm.type,
                              props: itm.label == "Select Column" || (itm.label == "Value" && nestfilter["wherecondition" + "_" + val + "_form"] == "joins") ? {
                                ...itm.props, onSelect: (a, b) => {
                                  console.log("gamecall", a, b, "column" + "_" + val + "_form")
                                  setValue(itm.label == "Select Column" ? "wherecolumn" + "_" + val + "_form" : "formovalue" + "_" + val + "_form", b.category + "smartGame" + b.name)
                                }
                              } : { ...itm.props },
                              option: itm.label == "Expression" ? all_command_type_wise[nestfilter["wherecondition" + "_" + val + "_form"]] : itm.option,
                              name: itm.name + "_" + val + "_form"
                            }
                          })}
                            register={register} setValue={setValue} getValues={getValues} />
                        </>
                      })}
                    </div>
                  </div>

                  <div className='flex w-full top  relative justify-between bg-primaryLine  p-2 pt-0'>
                    <h1 className='text-white'>
                      <p className="mt-2">
                        Upload Document
                      </p>
                    </h1>
                    <button onClick={() => {
                      let finval = 0
                      setconditioncountform((prev) => {
                        let val = [...prev]
                        let sval = val.pop()
                        if (isNaN(sval)) {
                          finval = 1
                        } else {
                          finval = sval + 1
                        }
                        console.log(finval, "finval", val, prev)
                        return [...prev, finval]
                      })
                      setnestfilter(newprev => ({
                        ...newprev,
                        ["wherecondition" + "_" + finval + "_form"]: "blank"
                      }));
                    }}
                      className='bg-pbutton text-white rounded-full mt-2'>
                      <Unicons.UilPlus size="24" />
                    </button>
                  </div>
                </div>
              </div> */}

                {/* {
                UserLyp != "" && <CommonForm classes={"grid-cols-1 lg:grid-cols-2 lg:gap-8 w-full pt-4"} errors={errors} Form={contype}
                  register={register} setValue={setValue} getValues={getValues} />
              } */}
              
                <div className="flex gap-10 mb-3 justify-center">
                  {/* <button
                    onClick={() => {
                      navigate("/empDetailsTable");
                    }}
                    className="mt-6 w-auto justify-center rounded-md border-black border-2 px-10 py-1 bg-violet-50 hover:bg-[#143b64] hover:text-white hover:border-black hover:border-2 text-txt-neavy text-sm font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit(onTableViewGenerateSubmit)}
                    className="mt-6 w-auto justify-center rounded-md bg-[#143b64] hover:bg-violet-50 hover:text-black hover:border-black hover:border-2 px-10 py-1 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton"
                  >
                    Submit
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PersonalInfo;
