import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewMultiSelects from "../../../components/NewMultiSelect";
import GraphActions from "../../../store/actions/graph-actions";
import FilterActions from "../../../store/actions/filter-actions";
import Button from "../../../components/Button";
import DountChart from "../../../components/DountChart";
import PieChart from "../../../components/PieChart";
import { UilImport,UilSearch } from '@iconscout/react-unicons'
import PolarChart from "../../../components/FormElements/PolarChart";


const ClaimAndAdvanceChart = (id) => {
    const [type, settype] = useState(false);
    const [selectedOptions1, setSelectedOptions1] = useState([]);
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    const [selectedOptions3, setSelectedOptions3] = useState([]);
    let dispatch = useDispatch();
    const [ data ,setData] = useState([])

    let customeruniqueId = id['customeruniqueId']

    let projectGroupList = useSelector((state) => {
        return state?.filterData?.getProjectProjectGroup.map((itm) => {
          return {
            label: itm.ProjectGroup,
            value: itm.ProjectGroup,
          };
        });
      });

      let projectTypeList = useSelector((state) => {
        return state?.filterData?.getProjectProjectType.map((itm) => {
          return {
            label: itm.projectType,
            value: itm.projectType,
          };
        });
      });

      let projectManagerList = useSelector((state) => {
        return state?.filterData?.getProjectProjectManager.map((itm) => {
          return {
            label: itm.projectManager,
            value: itm.projectManager,
          };
        });
      });

    // let pieGraphData = useSelector((state) => {
    //     return state?.GraphData?.getGraphProjectStatus || [""]
    // });


    let pieGraphData = [

      {"status":"Approved Claims","count":20},
      {"status":"L1 Approved","count":30},
      {"status":"L2 Approved","count":50},
      {"status":"Rejected claims","count":60},
      {"status":"Submitted Claims","count":30},
    ]


    useEffect(() => {
        dispatch(GraphActions.getGraphProjectStatus());
        dispatch(FilterActions.getProjectProjectGroup(`${customeruniqueId}`));
        dispatch(FilterActions.getProjectProjectType(`${customeruniqueId}`));
        dispatch(FilterActions.getProjectProjectManager(`${customeruniqueId}`));
    }, []);

    return (
      <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex space-x-4 justify-between w-full">
            <NewMultiSelects label='Project Group' option={projectGroupList} value={selectedOptions1} cb={( data ) => setSelectedOptions1(data)} />
      
            <NewMultiSelects label='Project Type' option={projectTypeList} value={selectedOptions2} cb={( data ) => setSelectedOptions2(data)} />
      
            <NewMultiSelects label='Project Manager' option={projectManagerList} value={selectedOptions3} cb={( data ) => setSelectedOptions3(data)} />
                     
            <div className="flex space-x-4">
                        {/* <Button classes = "text-white !py-2 mt-6 flex justify-center text-[15px]" name={"Search"}></Button> */}
                        <Button classes = "w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2"  icon={<UilSearch size="18" className={"hello"} />}></Button>
                        </div>
                    </div>
        </div>

                <PolarChart data={pieGraphData} />

            </div>

    );
};
export default ClaimAndAdvanceChart;