import React, { useEffect, useState } from "react";
import "react-querybuilder/dist/query-builder.css";
import moment from "moment";
import QueryBuilder from "react-querybuilder";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CommonForm from "../../../components/CommonForm";
import Button from "../../../components/Button";
import AdminActions from "../../../store/actions/admin-actions";
import HrActions from "../../../store/actions/hr-actions";
import * as Unicons from "@iconscout/react-unicons";
import SweetAlerts from "../../../components/SweetAlerts";
import { GET_EMPLOYEE_DETAILS } from "../../../store/reducers/hr-reduces";
import VendorActions from "../../../store/actions/vendor-actions";
import { GET_VENDOR_DETAILS } from "../../../store/reducers/vendor-reducer";

const ManageVendorForm = (props) => {
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
  console.log(empuid, "formValueformValueformValue");
  const dispatch = useDispatch();
  const [oneLoad, setOneLoad] = useState({});
  const [dataQuery, SetdataQuery] = useState("Select * from values;");
  const [filtering, setFiltering] = useState("Select * from values;");
  const navigate = useNavigate();
  const [showVendorRegistered, setshowVendorRegistered] = useState(false);

  const getManageVendorDetails = useSelector((state) => {

    let data = state.vendorData.getManageVendorDetails || [];

    console.log(data, "datadatadatadatadatadatadata");
    if (data.length > 0 && oneLoad != data[0]) {
      setOneLoad(data[0]);

      Object.entries(data[0])?.map((iewq) => {
        setValue(iewq[0], iewq[1]);
      });
      
      // Object.entries(data[0]).forEach(([key, value]) => {
      //   if (["dateOfRegistration", "validityUpto"].includes(key)) {
      //     const momentObj = moment(value, "DD-MM-yyyy");
      //     setValue(key, momentObj.toDate());
      //   } else {
      //     setValue(key, value);
      //   }
      // });
      Object.entries(data[0]).forEach(([key, value]) => {
        if (["dateOfRegistration", "validityUpto"].includes(key) && value) {
          const momentObj = moment(value, "DD-MM-yyyy");
          setValue(key, momentObj.toDate());
        } else {
          setValue(key, value);
        }
      });
      
      if (empuid) {
        setshowVendorRegistered(data[0].vendorRegistered === "Yes");
      }
    }
    return state.vendorData.getManageVendorDetails || "";
  });

  console.log(getManageVendorDetails, "getManageVendorDetails");

  const today = moment().format("DD-MM-yyyy");

  let roleList = useSelector((state) => {
    return state?.adminData?.getManageProfile.map((itm) => {
      return {
        label: itm?.roleName,
        value: itm?.uniqueId,
      };
    });
  });

  let circleList = useSelector((state) => {
    return state?.adminData?.getManageCircle.map((itm) => {
        return {
            label: itm.circleName,
            value: itm.uniqueId
        }
    })
})

  let PersonalInformation = [
    {
      type: "heading",
      label: "Partner On-boarding Requisition Form",
      classes: "col-span-4 font-extrabold text-pcol text-start ",
    },
    {
      label: "Partner Code",
      name: "vendorCode",
      value: "",
      type: empuid ? "sdisabled" : "text",
      props: {
        disabled: empuid ? true : false, 
      },
      required: true,
      placeholder: "",
    },
    {
      label: "Partner Name",
      name: "vendorName",
      value: "",
      type: "text",
      props: {},
      required: true,
      placeholder: "",
    },
    {
      label: "UST Partner Code",
      name: "ustCode",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Email Address",
      name: "email",
      value: "",
      type: empuid ? "sdisabled" : "text",
      props: "",
      required: true,
      placeholder: "",
    },
    {
      label: "Role",
      name: "userRole",
      value: "",
      type: "select",
      option: roleList,
      required: true,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Contact Person ",
      name: "contactPerson",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Registered Partner Addresss ",
      name: "registeredAddress",
      value: "",  
      type: "textarea",
      placeholder: "",
      props: "",
      required: false,
    },
    {
      label: "Partner's Category",
      name: "vendorCategory",
      type: "text",
      value: "",
      props: "",
      required: false,
    },
    {
      label: "Partner's sub Category",
      name: "vendorSubCategory",
      type: "text",
      value: "",
      props: "",
      required: false,
    },
    {
      label: "Contact Details",
      name: "contactDetails",
      value: "",
      type: "number",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Secondary Contact Details",
      name: "SecContactDetails",
      value: "",
      type: "number",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Date of Registration",
      name: "dateOfRegistration",
      value: "",
      type: "datetime",
      props: {
        maxSelectableDate: today,
      },
      required: false,
      placeholder: "",
    },
    {
      label: "Validity Upto",
      name: "validityUpto",
      value: "",
      type: "datetime",
      props: {
        minSelectableDate: today,
      },
      required: false,
      placeholder: "",
    },
    {
      label: "Company Type",
      name: "companyType",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },   
    {
      label: "Partner Ranking",
      name: "ranking",
      value: "",
      type: "select",
      option: [
        {"label": "L1", "value": "L1"},
        {"label": "L2", "value": "L2"},
        {"label": "L3", "value": "L3"},
      ],
      props: "",
      required: false,
      placeholder: "",
    }, 
    {
      label: "Working Circle's",
      name: "Circle",
      value: "",
      type: "select",
      props: "",
      required: false,
      option: circleList,
      placeholder: "",
    },
    {
      label: "Current Status",
      name: "status",
      value: "",
      type: "select",
      option: [
        {"label": "Active", "value": "Active"},
        {"label": "Inactive", "value": "Inactive"},
      ],
      props: "",
      required: true,
      placeholder: "",
    },
    {
      label: "Password",
      name: "password",
      value: "",
      type: "text",
      props: "",
      required: true,
      placeholder: "",
    },
    {
      label: "Partner's Registered with GST (Y/N)",
      name: "vendorRegistered",
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
          setshowVendorRegistered(e.target.value === "Yes");
        },
      },
    },
  ];
  if (showVendorRegistered) {
    PersonalInformation.push(
      {
        label: "GST No.",
        name: "gstNumber",
        value: "",
        type: "text",
        required: true,
        placeholder: "",
      },
      {
        label: "Upload GST (Attachment)",
        name: "gst",
        value: "",
        type: "file",
        props: "",
        placeholder: "Upload file if GST is mentioned",
      },
  );
  }
  PersonalInformation.push(
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
      label: "Upload Partner PAN",
      name: "pan",
      value: "",
      type: "file",
      props: "",
      placeholder: "",
    },
    {
      label: "TAN Number",
      name: "tanNumber",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Upload Partner TAN",
      name: "tan",
      value: "",
      type: "file",
      props: "",
      placeholder: "",
    },
    {
      label: "ESI Number",
      name: "esiNumber",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Upload Partner ESI",
      name: "esi",
      value: "",
      type: "file",
      props: "",
      placeholder: "",
    },
    {
      label: "EPF Number",
      name: "epfNumber",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Upload Partner EPF",
      name: "epf",
      value: "",
      type: "file",
      props: "",
      placeholder: "",
    },
    {
      label: "STN Number",
      name: "stnNumber",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Upload Partner STN",
      name: "stn",
      value: "",
      type: "file",
      props: "",
      placeholder: "",
    },
    {
      label: "Bank Account No.",
      name: "accounctNumber",
      value: "",
      type: "number",
      props: "",
      required: false,
      placeholder: "",
    },
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
      label: "IFSC Code",
      name: "ifscCode",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Bank Address",
      name: "bankAddress",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Financial Turnover",
      name: "financialTurnover",
      value: "",
      type: "number",
      props: {
        valueAsNumber:true,
        min: 0,
        onChange: (e) => {},
    },
      required: false,
      placeholder: "",
    },
    {
      label: "Approval Mail",
      name: "approvalMail",
      value: "",
      type: "file",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Contact Copy",
      name: "contactCopy",
      value: "",
      type: "file",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Partner Rate Card",
      name: "partnerRateCard",
      value: "",
      type: "file",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Mail Communication Attachment",
      name: "approvalMail",
      value: "",
      type: "file",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Cheque File (Attachment)",
      name: "cheque",
      value: "",
      type: "file",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Other Information",
      name: "otherInfo",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Team Capacity",
      name: "teamCapacity",
      value: "",
      type: "text",
      props: "",
      required: true,
      placeholder: "",
    },
    {
      label: "Tecnology",
      name: "technology",
      value: "",
      type: "text",
      props: "",
      placeholder: "",
    },

    {
      label: "CBTHR Certified (Y/N)",
      name: "cbt",
      value: "",
      type: "select",
      props: "",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      required: false,
      placeholder: "",
    },
    {
      label: "Certificate Attachment",
      name: "cbtCertificate",
      value: "",
      type: "file",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Form Toclii",
      name: "formToci",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Certificate Attachment",
      name: "tociCertificate",
      value: "",
      type: "file",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Payment Terms (Days)",
      name: "paymentTerms",
      value: "",
      type: "number",
      props: {
          valueAsNumber:true,
          min: 0,
          onChange: (e) => {},
      },
      placeholder: "",
    },
  );

  
  const onTableViewGenerateSubmit = (data) => {
    if (empuid) {
      dispatch(
        VendorActions.postManageVendorDetails(
          false,
          data,
          () => {
            alert("Data submitted successfully!");
            navigate("/vendor/managePartner");
          },
          empuid
        )
      );
    } else {
      dispatch(
        VendorActions.postManageVendorDetails(false, data, () => {
          alert("Data submitted successfully!");
          navigate("/vendor/managePartner");
        })
      );
    }
    reset({});
  };
  


  useEffect(() => {
    dispatch(AdminActions.getManageDepartment());
    dispatch(AdminActions.getManageDesignation());
    dispatch(AdminActions.getManageProfile());
    dispatch(AdminActions.getManageCircle());
    dispatch(AdminActions.getState());
    dispatch(AdminActions.getCities());
    dispatch(HrActions.getHRAllEmployee());
    dispatch(HrActions.getHRManagerInEmployee());
    if (empuid) {
      dispatch(GET_VENDOR_DETAILS({ dataAll: [], reset: false }));
      dispatch(VendorActions.getManageVendorDetails(false, empuid));
      setOneLoad(false);
    } else {
      // alert("dsadsadas")

      // if (setOneLoad) {
      // reset({});
      [
        ...PersonalInformation,

      ].map((itss) => {

        setValue(itss.name, itss.value );
      });
      ``;
      // }
    }
  }, [empuid, ]);

  return (
    <>
      <div className=" w-full h-full">
        <button
          onClick={() => {
            navigate("/vendor/managePartner");
            setOneLoad(false);
          }}
           className="mt-2 w-auto flex ml-auto mr-2 rounded-md px-10 py-1 mb-2  bg-pcol hover:bg-violet-100 hover:text-pcol hover:font-extrabold text-white text-sm font-extrabold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton"
        >
          Back
        </button>
        <div className="mb-14">
          {/* <UiTopBar /> */}
          <div className="w-full mt-2 bg-[#3e454d] mb-12">
            <div class="grid grid-cols-12 gap-2 m-2 bg-gray-800 border-[1.5px] rounded-lg">
              <div className="col-span-12">
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full bg-[#3e454d] p-4 rounded-lg"
                    }
                    errors={errors}
                    Form={PersonalInformation}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
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
                      navigate("/vendor/managePartner");
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
export default ManageVendorForm;
