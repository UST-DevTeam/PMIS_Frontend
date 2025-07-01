import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from './Table';
import { useForm } from 'react-hook-form';
import nokiaPrePostActions from '../store/actions/nokiaPrePost-actions';
import DPAOneRow from './DPAOneRow';
import WebsocketActions from '../store/actions/websocket-actions';
import { WebSocketUrls } from '../utils/url';

const SiteAnalyticsCard = ({ AllDataShowing, innerkey, ckey, fetchBackend = false,headers }) => {


    console.log(ckey, "AllDataShowing, innerkey, key")

    const dispatch = useDispatch()

    let idSelector = [
        { label: "Select Site ID", name: "frequency", value: "Select", type: "text", option: [{ "label": "Hourly", "value": "Hourly" }, { "label": "Daily", "value": "Daily" }], props: "", required: true, },
        { label: "Pre Date", name: "startAt", type: "datetime", formattype: "date", format: "yyyy-MM-dd", formatop: "yyyy-MM-DD", required: true },
        { label: "Post Date", name: "startAt", type: "datetime", formattype: "date", format: "yyyy-MM-dd", formatop: "yyyy-MM-DD", required: true }
    ]
    return <>



            <div className='w-full bg-secLine text-white rounded-t-xl text-center shadow-md shadow-slate-400'>NR/{ckey}</div>

            {/* [["Voice Accessibility Succcess Rate", 10, 10, 10], ["Voice Accessibility Succcess Rate", 10, 10, 10]]} */}
            <div className='border-[0.5px] border-t-0 rounded-b-xl border-black'>
                <Table classes={"m-0.1"} commonCols={true} headers={headers} columns={
                    // Object.keys(AllDataShowing[ckey][innerkey]).map((lowerinnerkey, index) => {
                    Object.keys(AllDataShowing[ckey]).map((lowerinnerkey, index) => {

                        console.log("common_socketcommon_socket")
                        if (fetchBackend) {
                            // dispatch(WebsocketActions.send_to_socket(WebSocketUrls.siteAnalytics, AllDataShowing[ckey][innerkey][lowerinnerkey]))


                        }
                        return <DPAOneRow name={AllDataShowing[ckey][lowerinnerkey]["KPI_Name"]} id={AllDataShowing[ckey][lowerinnerkey]["Code"] + "_" + AllDataShowing[ckey][lowerinnerkey]["id"]} />
                        // return <DPAOneRow name={AllDataShowing[ckey][innerkey][lowerinnerkey]["KPI_Name"]} id={AllDataShowing[ckey][innerkey][lowerinnerkey]["Code"] + "_" + AllDataShowing[ckey][innerkey][lowerinnerkey]["id"]} />
                    })
                } />
            </div>



    </>
};

export default SiteAnalyticsCard;
