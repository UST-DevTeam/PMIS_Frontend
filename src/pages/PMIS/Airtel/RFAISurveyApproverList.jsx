import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../components/EditButton';
import AdvancedTable from '../../../components/AdvancedTable';
import Modal from '../../../components/Modal';
import CstmButton from '../../../components/CstmButton';
import { objectToQueryString } from '../../../utils/commonFunnction';
import RFAISurveyApproverListForm from './RFAISurveyApproverListForm';
import AirtelActions from '../../../store/actions/airtel-actions';
import AdminActions from '../../../store/actions/admin-actions';
import { GET_MANAGE_CUSTOMER } from '../../../store/reducers/admin-reducer';
import { GET_CURRENTUSER_CIRCLE_LIST } from '../../../store/reducers/airtel-reducer';

const RFAISurveyApproverList = () => {

    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    const [fileOpen, setFileOpen] = useState(false)

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
  
    let dbConfigList = useSelector((state) => {
        let interdata = state?.airtelData?.getAirtelRFAISurveyApproverList
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,
                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    setmodalHead("RFAI Survey Approver")
                    dispatch(GET_MANAGE_CUSTOMER({ dataAll:[], reset:true }));
                    dispatch(GET_CURRENTUSER_CIRCLE_LIST({ dataAll:[], reset:true }));
                    dispatch(AdminActions.getManageCustomer(true,`empId=${itm.uniqueId}`))
                    dispatch(AirtelActions.getAirtelCurrentUserCircleList(itm.customer,itm.uniqueId))
                    setmodalBody(<RFAISurveyApproverListForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />)
                }}></EditButton>} />,
            
            }
            return updateditm
        });
    })

    let dbConfigTotalCount = useSelector((state) => {
        let interdata = state?.airtelData?.getAirtelRFAISurveyApproverList
        if (interdata.length > 0) {
            return interdata[0]["overall_table_count"]
        } else {
            return 0
        }
    })

    

    let table = {
        columns: [
            {
                name: "Emp Name",
                value: "emp",
                style: "min-w-[150px] max-w-[200px] text-center",
            }, 
            {
                name: "Profile",
                value: "roleName",
                style: "min-w-[100px] max-w-[200px] text-center",
            }, 
            {
                name: "Customer",
                value: "customerName",
                style: "min-w-[100px] max-w-[200px] text-center"
            },
            {
                name: "Circle",
                value: "circleName",
                style: "min-w-[100px] max-w-[200px] text-center"
            },               
            {
                name: "Action",
                value: "edit",
                style: "min-w-[80px] max-w-[200px] text-center"
            },
        ],
        properties: {
            rpp: [10, 20, 50, 100]
        },
        filter: []
    }

    const onSubmit = (data) => {
        let shouldReset = data.reseter
        delete data.reseter
        data['approverType'] = "L1Approver"
        let strVal = objectToQueryString(data)
        dispatch(AirtelActions.getAirtelRFAISurveyApproverList(shouldReset,strVal))
    }

    useEffect(() => {
        dispatch(AirtelActions.getAirtelRFAISurveyApproverList(true))
    }, [])


    return <>
        <AdvancedTable
            headerButton={
                <></>
            }
            table={table}
            filterAfter={onSubmit}
            tableName={"RFAISurveyApproverList"}
            handleSubmit={handleSubmit}
            data={dbConfigList}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
            totalCount={dbConfigTotalCount}
            heading = {"Total Records :"}
        />

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />
    </>


};

export default RFAISurveyApproverList;