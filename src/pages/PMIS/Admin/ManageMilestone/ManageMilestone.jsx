import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import TableJson from '../../../../components/TableJson';

const ManageMilestone = ({ setGlobalData,projectuniqueId, setmodalFullOpen, setSiteId }) => {



    const { register, handleSubmit, watch, setValue, setValues, getValues, reset, formState: { errors } } = useForm()

    const { register: registerForm1, setValue: setValueForm1, getValues: getValuesForm1, handleSubmit: handleSubmitForm1, formState: { errors: errorsForm1 } } = useForm();


    const [check, setCheck] = useState([]);
    const dispatch = useDispatch()


    let dataOfProject = useSelector((state) => {
        let dataOlder = state.adminData.getProjectTypeDyform[0]
        return dataOlder
    })


    let Mlength = dataOfProject["MileStone"]?.length
    let Clength = check?.length

    console.log(Mlength,Clength,"Clength")



    const handleMileStoneSubmit = (data) => {

        let lstindex = 0

        let lstindextkn = false

        let dataD = []

        dataOfProject["MileStone"].map((ireq, index) => {
            if (check.indexOf(ireq.index) != -1) {
                let Predecessor = "";
                if (Mlength === Clength){
                    Predecessor = dataOfProject["MileStone"][index]['Predecessor']
                } else {
                    Predecessor = index != 0 ? dataOfProject["MileStone"][lstindex]["fieldName"] : ""
                }
                let sqw = {
                    "Name": dataOfProject["MileStone"][index]["fieldName"],
                    "Estimated Time (Days)": dataOfProject["MileStone"][index]["Estimated Time (Days)"],
                    "WCC Sign off": dataOfProject["MileStone"][index]["WCC Sign off"],
                    "Predecessor": Predecessor,
                    "Completion Criteria": dataOfProject["MileStone"][index]["Completion Criteria"],
                }
                dataD.push(sqw)
                lstindex = index
            } else {}

        })




        let final_data = {
            "SubProjectId": dataOfProject["uniqueId"],
            "projectuniqueId": projectuniqueId,
            "new_u_id": dataOfProject["new_u_id"],
            "data":dataD
        }


        setGlobalData(prev=>{
            return {
                ...prev,
                "mileStone":final_data
            }
        })
        setmodalFullOpen(false)
    }


    useEffect(() => {
        reset({})
    }, [])


    return <>
        <div className='p-4'>

            <>
                <div className='flex justify-end'>
                    <Button
                        classes='w-30 mb-1'
                        name="Save Milestone"
                        onClick={handleSubmitForm1(handleMileStoneSubmit)}
                    />
                </div>

                <TableJson check={check} setCheck={setCheck} columns={dataOfProject ? dataOfProject["MileStone"] ? dataOfProject["MileStone"].map((onewq) => {
                    return {
                        "C": <><input type="checkbox" checked={check.indexOf(onewq["index"])!=-1?true:false} onChange={(e) => {

                            // console.log("Dasdasdasdas",check,onewq["index"].toString(),e.target.value,check.indexOf(onewq["index"]), e.target.value, e.target.checked)
                            if (e.target.checked) {
                                setCheck(prev => [...prev, +e.target.value])
                            } else {
                                setCheck(prev => {
                                    let lst = prev.indexOf(+e.target.value)
                                    
                                    prev.splice(lst, 1)
                                    return [...prev]
                                })
                            }
                        }} value={onewq["index"]} /></>,
                        "Name": onewq["fieldName"],
                        "WCC Sign off": onewq["WCC Sign off"],
                        "Estimated Time (Days)": onewq["Estimated Time (Days)"],
                        "Completion Criteria": onewq["Completion Criteria"],
                        "Predecessor": onewq["Predecessor"]
                    }
                }) : [] : []} headers={["C", "Name", "WCC Sign off", "Estimated Time (Days)", "Completion Criteria", "Predecessor",]} />

            </>
        </div>
    </>
}


export default ManageMilestone;
