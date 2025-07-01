import React, { useEffect, useState } from "react";
import "react-querybuilder/dist/query-builder.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CommonForm from "../../../components/CommonForm";
import AdminActions from "../../../store/actions/admin-actions";
import HrActions from "../../../store/actions/hr-actions";
import { GET_EMPLOYEE_DETAILS } from "../../../store/reducers/hr-reduces";
import { GET_CITIES, GET_MANAGE_COST_CENTER, GET_MANAGE_DEPARTMENT, GET_MANAGE_DESIGNATION } from "../../../store/reducers/admin-reducer";

const EmpDetails = (props) => {
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

  const { empuid } = useParams();
  const dispatch = useDispatch();
  const [oneLoad, setOneLoad] = useState({});
  const [dataQuery, SetdataQuery] = useState("Select * from values;");
  const [filtering, setFiltering] = useState("Select * from values;");
  const navigate = useNavigate();
  const [showPassportNumber, setshowPassportNumber] = useState(false);

  const getManageEmpDetails = useSelector((state) => {
    let data = state.hrReducer.getManageEmpDetails;

    if (data.length > 0 && oneLoad != data[0]) {
      setOneLoad(data[0]);

      Object.entries(data[0]).map((iewq) => {
        setValue(iewq[0], iewq[1]);
      });
    }
    return state.hrReducer.getManageEmpDetails;
  });


  const [isSame, setisSame] = useState(false);
  const [presentAddress, setPresentAddress] = useState({
    country: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
  });

  const [permanentAddress, setPermanentAddress] = useState({
    country: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
  });

  const handleCheckboxChange = (e) => {
    setisSame(e.target.checked);
    if (e.target.checked === true) {
      // Autofill permanent address from present address
      setPermanentAddress({ ...presentAddress });
    } else {
      // Clear permanent address fields
      setPermanentAddress({
        country: "",
        state: "",
        city: "",
        pincode: "",
        address: "",
      });
    }
  };
  const handlePresentAddressChange = (e) => {
    const { name, value } = e.target.value;
    setPresentAddress({
      ...presentAddress,
      [name]: value,
    });
  };

  let customerList = useSelector((state) => {
    return state?.adminData?.getManageCustomer?.map((itm) => {
        return {
            label: itm?.customerName,
            value: itm?.uniqueId
        }
    })
  });

  let departmentList = useSelector((state) => {
    return state?.adminData?.getManageDepartment.map((itm) => {
      return {
        label: itm?.department,
        value: itm?.uniqueId,
      };
    });
  });

  let designationList = useSelector((state) => {
    return state?.adminData?.getManageDesignation.map((itm) => {
      return {
        label: itm?.designation,
        value: itm?.uniqueId,
      };
    });
  });

  let roleList = useSelector((state) => {
    return state?.adminData?.getManageProfile.map((itm) => {
      return {
        label: itm?.roleName,
        value: itm?.uniqueId,
      };
    });
  });

  // let employeeList = [reportingManager,L2expManager,financeApproverList,reportingHrManager],

  let employeeList = useSelector((state) => {
    return state?.hrReducer?.getManageEmpDetails.map((itm) => {
      return {
        label: itm?.empName + " " + itm.empCode,
        value: itm.uniqueId,
      };
    });
  });

  let allEmployeeList = useSelector((state) => {
    return state?.hrReducer?.getHRAllEmployee.map((itm) => {
      return {
        label: itm?.empName,
        value: itm.uniqueId,
      };
    });
  });

  let allHrList = useSelector((state) => {
    return state?.hrReducer?.getHRManagerInEmployee.map((itm) => {
      return {
        label: itm?.empName,
        value: itm.uniqueId,
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


  let circleList = useSelector((state) => {
    return state?.adminData?.getManageCircle.map((itm) => {
      return {
        label: itm?.circleName,
        value: itm.uniqueId,
      };
    });
  });

  let stateList = useSelector((state) => {
    return state?.adminData?.getState?.map((itm) => {
      return {
        label: itm?.name,
        value: itm?.state_code,
      };
    });
  });

  let cityList = useSelector((state) => {
    return state?.adminData?.getCities?.map((itm) => {
      return {
        label: itm?.city,
        value: itm?.city,
      };
    });
  });

  let PersonalInformation = [
    {
      type: "heading",
      label: "Employee Details",
      classes: "col-span-4 font-extrabold text-pcol text-start mb-[-50px]",
    },
    {
      label: "Title",
      name: "title",
      value: "",
      type: "select",
      props: {},
      required: true,
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
      type: "text",
      props: "",
      required: true,
      placeholder: "",
    },
    {
      label: "Employee Code",
      name: "empCode",
      value: "",
      type: empuid ? "sdisabled" : "text",
      props: {
        disabled: empuid ? true : false, 
      },
      required: true,
      placeholder: "",
    },    
    {
      label: "UST Emp Code",
      name: "ustCode",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "UST Project ID",
      name: "ustProjectId",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "UST Job Code",
      name: "ustJobCode",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Father's Name",
      name: "fatherName",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Mother's Name",
      name: "motherName",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Marital Status",
      name: "martialStatus",
      value: "",
      type: "select",
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
      type: empuid ? "sdisabled" : "text",
      props: "",
      required: true,
      placeholder: "",
    },
    {
      label: "Personal Email-ID",
      name: "personalEmailId",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Date Of Birth(as Per doc)",
      name: "dob",
      type: "datetime2",
      value: "",
      props: "",
      required: false,
    },
    {
      label: "Contact Number",
      name: "mobile",
      value: "",
      type: "number",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Blood Group",
      name: "blood",
      value: "",
      type: "select",
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
  ];

  let ContactInformation = [
    {
      type: "heading",
      label: "Present Address",
      classes: "col-span-4 font-extrabold text-pcol text-start",
    },
    {
      label: "Country",
      name: "country",
      value: presentAddress.country,
      type: "select",
      props: "",
      required: false,
      placeholder: "",
      option: [{ label: "India", value: "India" }],
      onChange: handlePresentAddressChange,
    },
    {
      label: "State",
      name: "state",
      value: presentAddress.state,
      type: "select",
      placeholder: "",
      option: stateList,
      props: {
        onChange: (e) => {
          setValue("state", e.target.value);
          dispatch(GET_CITIES({dataAll:[],reset:true}))
          dispatch(AdminActions.getCities(true, `stateCode=${e.target.value}`));
        },
      },
    },
    {
      label: "City",
      name: "city",
      value: presentAddress.city,
      type: "select",
      props: "",
      placeholder: "",
      option: cityList,
      onChange: handlePresentAddressChange,
    },
    {
      label: "PinCode",
      name: "pincode",
      value: presentAddress.pincode,
      type: "text",
      props: "",
      required: false,
      placeholder: "",
      onChange: handlePresentAddressChange,
    },
    {
      label: "Address",
      name: "address",
      value: presentAddress.address,
      type: "textarea",
      props: "",
      required: false,
      placeholder: "",
      onChange: handlePresentAddressChange,
    },

    // {
    //   label: "Social Media",
    //   name: "socialMedia",
    //   value: "",
    //   type: "select",
    //   props: {
    //     onChange: (e) => {
    //       setshowSocialMediaOther(e.target.value === "Other");
    //     },
    //   },
    //   required: false,
    //   option: [
    //     { label: "Facebook", value: "Facebook" },
    //     { label: "Instagram", value: "Instagram" },
    //     { label: "Pinterest", value: "Pinterest" },
    //     { label: "X", value: "X" },
    //     { label: "Other", value: "Other" },
    //   ],
    // },
  ];
  // if (showSocialMediaOther) {
  //   ContactInformation.push({
  //     label: "Please Specify Social Media Type",
  //     name: "otherSocialMediaType",
  //     value: "",
  //     type: "text",
  //     required: false,
  //     props: {},
  //     classes: "col-span-1",
  //   });
  // }

  let ContactInformation2 = [
    {
      type: "checkbox",
      name: "fillAddress",

      props: {
        onChange: (e) => {
          handleCheckboxChange(e);
        },
      },
      option: [
        {
          type: "checkbox",
          name: "fillAddress",
          label: "Same As Present Address",
          checked: presentAddress === permanentAddress,
          onChange: (e) => {
            handleCheckboxChange(e);
          },
        },
      ],
      classes: "col-span-4 font-bold text-pcol text-start mb-[-25px]",
    },
  ];

  let datew = [
    {
      type: "heading",
      label: "Permanent Address",
      classes: "col-span-4 font-extrabold text-pcol text-start",
    },
    {
      label: "Country",
      name: "pcountry",
      value: permanentAddress.country,
      type: "select",
      props: "",
      required: false,
      placeholder: "",
      option: [{ label: "India", value: "India" }],
    },
    {
      label: "State",
      name: "pstate",
      value: permanentAddress.state,
      type: "select",
      placeholder: "",
      option: stateList,
      props: {
        onChange: (e) => {
          console.log(e.target.value, "e_geeter");

          setValue("state1", e.target.value);

          dispatch(
            AdminActions.getCities(false, `stateCode=${e.target.value}`)
          );
          // setStateName(e.target.value)
        },
      },
    },

    {
      label: "city",
      name: "pcity",
      value: permanentAddress.city,
      type: "select",
      props: "",
      placeholder: "",
      option: cityList,
    },

    {
      label: "PinCode",
      name: "ppincode",
      value: permanentAddress.pincode,
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Address",
      name: "paddress",
      value: permanentAddress.address,
      type: "textarea",
      props: "",
      required: false,
      placeholder: "",
    },
  ]
 

  let EmploymentDetails = [
    {
      type: "heading",
      label: "Employment Details",
      classes: "col-span-4 font-extrabold text-pcol text-start",
    },
    {
      label: "PAN Number",
      name: "panNumber",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Aadhar Number",
      name: "adharNumber",
      value: "",
      type: "number",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Circle",
      name: "circle",
      value: "",
      type: "select",
      option: circleList,
      props: "",
      placeholder: "",
    },
    {
      label: "Experience",
      name: "experience",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Salary Currency",
      name: "salaryCurrency",
      value: "",
      type: "select",
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
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Gross CTC",
      name: "grossCtc",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Joining Date",
      name: "joiningDate",
      value: "",
      type: "datetime2",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Last Working Day",
      name: "lastWorkingDay",
      value: "",
      type: "datetime2",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Resign Date",
      name: "resignDate",
      value: "",
      type: "datetime2",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Passport",
      name: "passport",
      value: "",
      type: "select",
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
      type: "text",
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
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Bank Account Number",
      name: "accountNumber",
      value: "",
      type: "number",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "IFSC Code",
      name: "ifscCode",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Benificiary Name",
      name: "benificiaryname",
      value: "",
      type: "text",
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
      type: "text",
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Allocation Percentage",
      name: "allocationPercentage",
      value: "",
      type: "text",
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Business Unit",
      name: "businesssUnit",
      value: "",
      type: "text",
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Customer Name",
      name: "customer",
      value: "",
      type: "select",
      required: false,
      option: customerList,
      props: {
        onChange: ((e) => {
          if (e.target.value){
            dispatch(AdminActions.getManageDepartment(true,"",e.target.value));
            dispatch(AdminActions.getManageDesignation(true,"",e.target.value));
            dispatch(AdminActions.getManageCostCenter(true,"",e.target.value));
          }
          else{
            dispatch(GET_MANAGE_DEPARTMENT({ dataAll:[], reset:true}));
            dispatch(GET_MANAGE_DESIGNATION({ dataAll:[], reset:true}));
            dispatch(GET_MANAGE_COST_CENTER({ dataAll:[], reset:true}));
          }
          
        }),
      },
      classes: "col-span-1",
    },
    {
      label: "Grade",
      name: "designation",
      value: "",
      type: "select",
      required: false,
      option: designationList,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Role",
      name: "role",
      value: "",
      type: "select",
      option: roleList,
      // required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "PMIS Profile",
      name: "userRole",
      value: "",
      type: "select",
      option: roleList,
      required: true,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Cost Center",
      name: "costCenter",
      value: "",
      type: "select",
      option: costCenterList,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Designation",
      name: "band",
      value: "",
      type: "text",
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Department",
      name: "department",
      value: "",
      type: "select",
      required: false,
      props: {},
      option: departmentList,
      classes: "col-span-1",
    },
    {
      label: "Reporting Manager",
      name: "reportingManager",
      value: "",
      type: "select",
      required: false,
      props: {},
      option: allEmployeeList,
      classes: "col-span-1",
    },
    {
      label: "L1 Approver",
      name: "L1Approver",
      value: "",
      type: "select",
      required: false,
      props: {},
      option: allEmployeeList,
      classes: "col-span-1",
    },
    {
      label: "L2 Aprrover",
      name: "L2Approver",
      value: "",
      type: "select",
      required: false,
      option: allEmployeeList,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Finance Approver",
      name: "financeApprover",
      value: "",
      type: "select",
      option: allEmployeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "HR Manager",
      name: "reportingHrManager",
      value: "",
      type: "select",
      option: allHrList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Asset Manager",
      name: "assetManager",
      value: "",
      type: "select",
      option: allEmployeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L1 Vendor",
      name: "L1Vendor",
      value: "",
      type: "select",
      option: allEmployeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L2 Vendor",
      name: "L2Vendor",
      value: "",
      type: "select",
      option: allEmployeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    // {
    //   label: "Compliance",
    //   name: "compliance",
    //   value: "",
    //   type: "select",
    //   option: allEmployeeList,
    //   required: false,
    //   props: {},
    //   classes: "col-span-1",
    // },
    {
      label: "L1 Compliance",
      name: "L1Compliance",
      value: "",
      type: "select",
      option: allEmployeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L2 Compliance",
      name: "L2Compliance",
      value: "",
      type: "select",
      option: allEmployeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L1 Commercial",
      name: "L1Commercial",
      value: "",
      type: "select",
      option: allEmployeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L1 Sales",
      name: "L1Sales",
      value: "",
      type: "select",
      option: allEmployeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L2 Sales",
      name: "L2Sales",
      value: "",
      type: "select",
      option: allEmployeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Status",
      name: "status",
      value: "",
      type: "select",
      required: true,
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
      value: "",
      type: "text",
      required: true,
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
      name: "img",
      value: "",
      type: "file",
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
      type: "file",
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
      type: "file",
      required: false,
      props: {
        accept: ".zip,.rar,.bin",
      },
      classes: "col-span-1",
    },
  ];

  const onTableViewGenerateSubmit = (data) => {
    data["samePerAdd"] = isSame;
    if (isSame) {
      data["paddress"] = data["address"];
      data["pstate"] = data["state"];
      data["ppincode"] = data["pincode"];
      data["pcountry"] = data["country"];
      data["pcity"] = data["city"];
    }
    if (empuid) {
      dispatch(
        HrActions.postManageEmpDetails(
          false,
          data,
          () => {
            alert("Data submitted successfully!");
            navigate("/hr/empDetailsTable");
          },
          empuid
        )
      );
    } else {
      dispatch(
        HrActions.postManageEmpDetails(false, data, () => {
          alert("Data submitted successfully!");
          navigate("/hr/empDetailsTable");
        })
      );
    }
    reset({});
  };

  useEffect(() => {
    dispatch(AdminActions.getManageCustomer())
    dispatch(AdminActions.getManageProfile());
    dispatch(AdminActions.getManageCircle());
    dispatch(AdminActions.getState());
    dispatch(HrActions.getHRAllEmployee());
    dispatch(HrActions.getHRManagerInEmployee());
    if (empuid) {
      dispatch(GET_EMPLOYEE_DETAILS({ dataAll: [], reset: false }));
      dispatch(HrActions.getManageEmpDetails(false, empuid));
      setOneLoad(false);
    } else {
      [
        ...PersonalInformation,
        ...ContactInformation,
        ...ContactInformation2,
        ...EmploymentDetails,
        ...EmployeeProfile,
        ...SupportingDoc,
      ].map((itss) => {

        setValue(itss.name, itss.value);
      });
      ``;
    }
  }, [empuid, ]);

  return (
    <>
      <div className=" w-full h-full">
        {/* <button
          onClick={() => {
            navigate("/hr/empDetailsTable");
            setOneLoad(false);
          }}
          className="mt-2 w-auto flex ml-auto mr-2 rounded-md px-10 py-1 bg-pcol  hover:text-white hover:border-white hover:border-[1.5px] text-txt-neavy text-sm font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton"
        >
          Back
        </button> */}
        <div className="mb-14">
          {/* <UiTopBar /> */}
          <div className="w-full mt-2 bg-[#3e454d] mb-10">
            <div class="grid grid-cols-12 gap-2 m-2 bg-gray-800 border-[1.5px] rounded-lg">
              <div className="col-span-12">
                <div className="grid grid-cols-1 md:grid-cols-1 mb-14">
                  <CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full h-auto bg-[#3e454d] p-4 rounded-lg"
                    }
                    errors={errors}
                    Form={PersonalInformation}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />

                  <CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full h-auto bg-[#3e454d] p-4 mt-2 rounded-lg"
                    }
                    errors={errors}
                    Form={ContactInformation}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                  <CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full h-auto bg-[#3e454d] p-2 mt-2 rounded-lg"
                    }
                    errors={errors}
                    Form={
                      isSame
                        ? ContactInformation2
                        : [...ContactInformation2, ...datew]
                    }
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                  <CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full h-auto bg-[#3e454d] p-4 mt-2 rounded-lg"
                    }
                    errors={errors}
                    Form={EmploymentDetails}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                  <CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full h-auto bg-[#3e454d] p-4 mt-2 rounded-lg"
                    }
                    errors={errors}
                    Form={EmployeeProfile}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                  <CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full h-auto bg-[#3e454d] p-4 mt-2 rounded-lg"
                    }
                    errors={errors}
                    Form={SupportingDoc}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
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

                <div className="flex space-x-2 absolute bottom-0 inset-x-0 mx-auto z-10 justify-center items-center bg-[#24292d]">
                  <button
                    onClick={() => {
                      navigate("/hr/empDetailsTable");
                    }}
                    className="mt-2 w-auto justify-center rounded-md px-10 py-1 mb-2  bg-pcol hover:bg-violet-100 hover:text-pcol hover:font-extrabold text-white text-sm font-extrabold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit(onTableViewGenerateSubmit)}
                    className="mt-2 w-auto justify-center rounded-md bg-pcol mb-2 hover:bg-violet-100 hover:text-pcol hover:font-extrabold px-10 py-1 text-sm font-extrabold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EmpDetails;
