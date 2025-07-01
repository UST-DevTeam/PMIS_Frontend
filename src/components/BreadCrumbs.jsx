import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isValidObjectId } from "../utils/commonFunnction";

function changeCase(str) {
  
  const words = str.split(/(?=[A-Z]+)|(?=[a-z])(?=[A-Z])/);
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  let strdata = capitalizedWords.join("");
  return strdata.replace("%20", " ");
}

const BreadCrumbs = () => {

  const consoleUrl = window.location.pathname;
  let data = consoleUrl.split("/");

  const { cname, customeruniqueId, projecttypeuniqueId,customer,customerId } = useParams();
  let itm = "";

  let Dtheader = {
    manageCustomer: {
      name: "Project Management",
      url: "/manageCustomer",
    },
    projectManagement: {
      name: "Project Management",
      url: "/manageCustomer",
    },
    projectManagement_1: {
      name: "Project Management",
      url: `${"/projectManagement_1"}/${cname}/projectType/${customeruniqueId}/${projecttypeuniqueId}`,
    },

    projectManagement_1: {
      name: "Project Management",
      url: "/manageCustomer",
    },

    projectManagement_2: {
      name: "Project Management",
      url: "/manageCustomer",
    },
    home: {
      name: "My Home",
      url: "/",
    },
    hr: {
      name: "Human Resource",
      url: "/hr",
    },
    empDetailsTable: {
      name: "All Employee Details",
      url: "/hr/empDetailsTable",
    },

    Claim: {
      name: "Expense",
      url: "/hr/Claim",
    },
    attendance: {
      name: "Attendance",
      url: "/hr/attendance",
    },
    superAdmin: {
      name: "Super Admin",
      url: "/hr/superAdmin",
    },
    claimType: {
      name: "Claim Type",
      url: "/hr/superAdmin/claimType",
    },
    financial: {
      name: "Financial",
      url: "/financial",
    },
    poManagement: {
      name: "PO Management",
      url: `/financial/${customer}/${customerId}/poManagement`,
    },
    invoiceMgmt: {
      name: "Invoice Management",
      url: `/financial/${customer}/${customerId}/invoiceMgmt`,
    },
    poWorkDone: {
      name: "Work done",
      url: "/financial/poWorkDone",
    },
    unbilled: {
      name: "Unbilled",
      url: "/financial/Unbilled",
    },
    forms: {
      name: "Forms",
      url: "/forms",
    },
    gapAnalysis: {
      name: "Gap Analysis",
      url: "/forms/gapAnalysis",
    },
    EVMDelivery: {
      name: "EVM Delivery",
      url: "/forms/EVMDelivery",
    },
    claimAndAdvance: {
      name: "Claim And Advance",
      url: "/home/claimAndAdvance",
    },
    parentApproverCards: {
      name: "Parent Approval",
      url: "/home/parentApproverCards",
    },
    approverCards: {
      name: "Approval",
      url: "/home/parentApproverCards/approverCards",
    },
    vendor: {
      name: "Partner",
      url: "/vendor",
    },
    dashboard: {
      name: "Dashboard",
      url: "/",
    },
    personalInfo: {
      name: "Personal Information",
      url: "/home/personalInfo",
    },
    ActivityLogs: {
      name: "Activity Logs",
      url: "/hr/superAdmin/ActivityLogs",
    },
    repository: {
      name: "Repository",
      url: "/repository",
    },
    PVADeliveryCustomer: {
      name: "PVA Delivery Customer",
      url: "/forms/PVADeliveryCustomer",
    },
    "MS-PVA": {
      name: "MS-PVA",
      url: "/forms/PVADeliveryCustomer/MS-PVA",
    },
  };

  let breadcrumblist = useSelector((state) => {
    return state.component.breadcrumb;
  });

  let globalValuelist = useSelector((state) => {
    return state.component.globalValue;
  });

  const dispatch = useDispatch();

  const fallbackData = useSelector(state=> state?.adminData?.getCardCustomer);
  const markets = {};

  fallbackData.forEach(customer => {
    const encodedName = encodeURIComponent(customer.customerName);
    markets[encodedName] = {
      name: customer.customerName,
      url: `/projectManagement/${encodedName}/${customer._id}`,
    };
  });
  const navigate = useNavigate();

  const checkInGlobalValue = (data) => {
    data = data.replace("%20", " ");

    let dwqata = globalValuelist.filter((item) => item.name == data);


    if (dwqata.length > 0) {
      return dwqata[0]["value"];
    } else {
      return "";
    }
  };

  const addSpacesToWords = (text) => {
    return text.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  return (
    <div>
      <nav className="bg-[#3e454d] pl-3 p-[12px] text-[16px] font-poppins font-extrabold text-md">
        <ol className="list-reset flex text-white">
          {consoleUrl
            .split("/")
            .filter((item) => item !== "" && !isValidObjectId(item))
            .map((item, index) => {
              return (
                <>
                  {index != consoleUrl.split("/").filter((item) => item !== "" && !isValidObjectId(item)).length - 1 ? (
                    <>
                      <li>
                        <a
                          className="text-pcol hover:text-pcolhover cursor-pointer"
                          // onClick={() => {
                          //   console.log(item, '________fallback__________')
                          //   navigate(
                          //     item in Dtheader
                          //       ? Dtheader[item]["url"]
                          //       : checkInGlobalValue(item) != ""
                          //         ? checkInGlobalValue(item)
                          //         : ""
                          //   );
                          // }}

                          onClick={() => {           
                            console.log(item, '________fallback__________')      
                            if (item in Dtheader) {
                              console.log(item, '________fallback__________')
                              navigate(
                                item in Dtheader
                                  ? Dtheader[item]["url"]
                                  : checkInGlobalValue(item) != ""
                                    ? checkInGlobalValue(item)
                                    : ""
                              );
                            } else if (window.location.href.includes("projectManagement") && item in markets) {
                              console.log(item, '________fallback__________')
                              navigate(`/projectManagement/${item}/${customeruniqueId}`);
                            } else if (window.location.href.includes("repository")) {
                              console.log(item, '________fallback__________')
                              navigate(`/repository`);
                            } else {
                              console.log(item, '________fallback__________')
                              navigate(
                                item in Dtheader
                                  ? Dtheader[item]["url"]
                                  : checkInGlobalValue(item) != ""
                                    ? checkInGlobalValue(item)
                                    : ""
                              );
                            }
                          }}
                        >
                          {item in Dtheader
                            ? Dtheader[item]["name"]
                            : isValidObjectId(item)
                              ? ""
                              : changeCase(item)}
                        </a>
                      </li>
                      <li className="mx-2">/</li>
                    </>
                  ) : (
                    <>
                      {item in Dtheader ? Dtheader[item]["name"] : isValidObjectId(item) ? " " : addSpacesToWords(changeCase(item))}
                    </>
                  )}
                </>
              );
            })}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumbs;
