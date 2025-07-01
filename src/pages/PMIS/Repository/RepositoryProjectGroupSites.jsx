import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal";
import {objectToQueryString} from "../../../utils/commonFunnction";
import { useNavigate, useParams } from "react-router-dom";
import AdvancedTableExpandable from "../../../components/AdvancedTableExpandable";
import RepositoryActions from "../../../store/actions/repository-actions";
import CstmButton from "../../../components/CstmButton";
import Button from "../../../components/Button";
import CommonActions from "../../../store/actions/common-actions";


const RepositoryProjectGroupSites = () => {

  let permission = JSON.parse(localStorage.getItem("permission")) || {};
  let user = JSON.parse(localStorage.getItem("user"));
  let rolename = user?.roleName;

  const { id } = useParams();

  const [modalOpen, setmodalOpen] = useState(false);
  const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [parentsite, setparentsite] = useState([]);
  const [childsite, setchildsite] = useState([]);
  const [modalBody, setmodalBody] = useState(<></>);
  const [getmultiSelect, setmultiSelect] = useState([]);
  const [modalHead, setmodalHead] = useState(<></>);

  const {
    register,
    handleSubmit,
    SubmitTask,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();

  let dispatch = useDispatch();



  function downloadAttachment(type, id) {
    dispatch(
      CommonActions.commondownload(
        `${id}/${id}?type=${type}`,
        `site-${id}.${type === "Excel" ? "xlsx" : "pdf"}`
      )
    );
  }

  let dbConfigList = useSelector((state) => {
    let interdata = state.repository.getSitesIds || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
        
        milestoneArray: itm?.milestoneArray?.map((iewq) => {
          return {
            ...iewq,
            attachmentDownload: (
              <CstmButton
                className={"p-2"}
                child={
                  <div className="flex space-x-2 items-center">
                    <Button
                      onClick={() => {
                        downloadAttachment("PDF", iewq?.uniqueId);
                      }}
                      classes="!py-[2px] bg-red-600"
                      title="Download Pdf"
                    >
                      <svg
                        className="w-4 h-4 fill-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M5 4H15V8H19V20H5V4ZM3.9985 2C3.44749 2 3 2.44405 3 2.9918V21.0082C3 21.5447 3.44476 22 3.9934 22H20.0066C20.5551 22 21 21.5489 21 20.9925L20.9997 7L16 2H3.9985ZM10.4999 7.5C10.4999 9.07749 10.0442 10.9373 9.27493 12.6534C8.50287 14.3757 7.46143 15.8502 6.37524 16.7191L7.55464 18.3321C10.4821 16.3804 13.7233 15.0421 16.8585 15.49L17.3162 13.5513C14.6435 12.6604 12.4999 9.98994 12.4999 7.5H10.4999ZM11.0999 13.4716C11.3673 12.8752 11.6042 12.2563 11.8037 11.6285C12.2753 12.3531 12.8553 13.0182 13.5101 13.5953C12.5283 13.7711 11.5665 14.0596 10.6352 14.4276C10.7999 14.1143 10.9551 13.7948 11.0999 13.4716Z"></path>
                      </svg>{" "}
                    </Button>
                  </div>
                }
              />
            ),
          };
        }),
      };
      return updateditm;
    });
  });


  let dbConfigTotalCount =
    useSelector((state) => {
      let interdata = state?.projectList?.getprojectalllist;
      if (interdata.length > 0) {
        return interdata[0]["overall_table_count"];
      }
    }) || [];

  let table = {
    columns: [
      {
        name: "Site ID",
        value: "siteIdName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "SSID",
        value: "systemId",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Unique ID",
        value: "Unique ID",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Project Type",
        value: "projectType",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Sub Project",
        value: "subProjectType",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Attachments",
        value: "",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
    ],
    childList: [""],
    childs: {
      milestoneArray: [
        {
          name: "",
          value: "Name",
          style: "min-w-[40px] max-w-[40px] text-center",
        },
        {
          name: "",
          value: "",
          style:"min-w-[140px] max-w-[200px] text-center" ,
        },
        {
          name: "",
          value: "",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "",
          value: "",
          style: "min-w-[180px] max-w-[180px] text-center",
        },
        {
          name: "",
          value: "",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "Attachments",
          value: "attachmentDownload",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        
      ],
    },
    properties: {
      rpp: [10, 20, 50, 100],
    },

    filter: [
      // {
      //     label: "Site ID",
      //     type: "text",
      //     name: "siteId",
      //     props: {}
      // },
      // {
      //   label: "Sub Project",
      //   type: "select",
      //   name: "subProject",
      //   option:subProjectList,
      //   props: {}
      // },
      // {
      //     label: "Site Status",
      //     type: "select",
      //     name: "siteStatus",
      //     option: [
      //       { label: "Open", value: "Open" },
      //       { label: "Close", value: "Close" },
      //       { label: "Drop", value: "Drop" },
      //     ],
      //     props: {}
      // },
      // {
      //     label: "Billing Status",
      //     type: "select",
      //     name: "siteBillingStatus",
      //     option:[
      //       {label:'Unbilled', value:'Unbilled'},
      //       {label:'Billed', value:'Billed'},
      //     ],
      //     props: {}
      // }
    ],
  };

  const onSubmit = (data) => {
    let shouldReset = data.reseter;
    delete data.reseter;
    let strVal=objectToQueryString(data)
    setstrVal(strVal)
    dispatch();
  };

  useEffect(() => {
    dispatch(RepositoryActions.getSiteIds(id))
  }, []);

  return (
    <>
      <AdvancedTableExpandable
        parentsite={parentsite}
        childsite={childsite}
        headerButton={
          <div className="flex">
            
          </div>
        }
        table={table}
        filterAfter={onSubmit}
        tableName={""}
        handleSubmit={handleSubmit}
        data={dbConfigList[0]?.uniqueId ? dbConfigList : []}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        multiSelect={false}
        getmultiSelect={getmultiSelect}
        setmultiSelect={setmultiSelect}
        totalCount={dbConfigTotalCount}
        // heading = {'Total Sites:-'}
      />

      <Modal
        size={"sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />
      <Modal
        size={"full"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalFullOpen}
        setIsOpen={setmodalFullOpen}
      />
    </>
  );
};

export default RepositoryProjectGroupSites;