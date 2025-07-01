import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import AdvancedTable from '../../../components/AdvancedTable';
import { objectToQueryString } from '../../../utils/commonFunnction';
import AdminActions from '../../../store/actions/admin-actions';
import { useSearchParams } from 'react-router-dom';
import CstmButton from '../../../components/CstmButton';
import DownloadButton from '../../../components/DownloadButton';
import ActionButton from '../../../components/ActionButton';
import RejectionButton from '../../../components/RejectionButton';
import { UilExclamationTriangle}  from "@iconscout/react-unicons";
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import CommonForm from '../../../components/CommonForm';
import ManageComplianceTemplateApproverForm from '../Admin/ManageCompliance/ManageComplinaceTemplateApproverForm';
import { GET_ONE_COMPLIANCE_DY_FORM } from '../../../store/reducers/admin-reducer';
import projectListActions from '../../../store/actions/projectList-actions';
import { GET_GLOBAL_COMPLAINCE_TYPE_APPROVER_DATA } from '../../../store/reducers/projectList-reducer';
import { Urls } from '../../../utils/url';


const ManageApproverForm = ({formData,setmodalOpen}) => {


    const [URLSearchParams, setURLSearchParams] = useSearchParams()
    const route = URLSearchParams.get("from")
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [modalFullOpen, setmodalFullOpen] = useState(false);
    const [L2ApproverName, setL2ApproverName] = useState(null);


    const {register,handleSubmit,watch,reset,setValue,setValues,getValues,formState: { errors }} = useForm()

    let dispatch = useDispatch()

    const currentDate = new Date();
    const dt = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).replace(/\//g, '-')


    let L2optionList = useSelector((state) => {
        return state?.adminData?.getOneComplianceL2List.map((itm) => {
            return {
            label: itm?.approverName,
            value: itm?.approverId + ":" + itm?.approverName ,
            };
        }); 
    }); 






    const onTableViewSubmit = (data) => {

        data['L2UserId'] = data['L2UserId'].split(":")[0]
        data['currentStatus'] = "Approve"
        data['milestoneuid'] = formData['milestoneuid']
        data['type'] = "L1"
        data['approverName'] = L2ApproverName
        dispatch(
            AdminActions.approverActionPatch(
                formData.uniqueId,
                data,
                () => {
                    setmodalOpen(false);
                    setL2ApproverName(null);
                    dispatch(AdminActions.getComplianceMilestoneL1Approver(route.split("/")))
                },
                true))
    }
    
    






    let Form = [
        {
            label: "Select Your L2 Approver",
            value: "",
            name: "L2UserId",
            type: "select",
            required: true,
            option: L2optionList,
            classes: "col-span-1",
            props:{
                onChange: (e) => { 
                    let approverName = e.target.value
                    approverName = approverName.split(":")[1]
                    setL2ApproverName(approverName)
                },
            }
        },
      
    ]


    return <>
        
        <div className="sm:mx-auto sm:w-full sm:max-w-full pb-2">
            <CommonForm classes={"grid-cols-2 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            <Button classes={"mt-4 w-sm text-center flex mx-auto"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
        </div>

    </>


};

export default ManageApproverForm;