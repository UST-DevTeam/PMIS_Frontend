import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import FormssActions from "../../../../store/actions/formss-actions";
import { GET_ACCRUAL_REVENUE_TREND } from "../../../../store/reducers/formss-reducer";
 
const AccrualRevenueTrendForm = ({isOpen,setIsOpen,resetting,year,monthss,formValue = {} }) => {


  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();



  const [modalOpen, setmodalOpen] = useState(false);

  
  let dispatch = useDispatch();

  let roleName = useSelector((state)=>{
    let role = state?.auth?.user?.roleName
    return role
  })


  

  const monthsss = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
    
    
  let Form = [
    ...monthss.map((itm)=>(
      {
        label: `${monthsss[itm.month]} ${[itm.year]}`,
        value: "",
        name: `M-${itm.month}Y-${itm.year}`,
        type: "number",
        props: {
          valueAsNumber:true,
          min: 1,
          onChange: (e) => {},
        },
        classes: "col-span-1",
      }
    )),
    
  ];

  const onSubmit = (data) => {
    // console.log(data);
  };


  const onTableViewSubmit = (data) => {
    data['costCenteruid'] = formValue['uniqueId']
    if (formValue.uniqueId) {
      dispatch(
        FormssActions.putAccrualRevenueTrend(
          data,
          () => {
            setIsOpen(false);
            let setData = [];
            monthss.forEach((itm) => {
              setData.push([
                'M-'+itm.month+"Y-"+itm.year
              ]);
          
            });
            dispatch(
              FormssActions.postAccrualRevenueTrend(
                {
                  Monthly: setData.join(",")
                },
                () => {}
              )
            );
          },
        )
      );
    }
  };

  useEffect(() => {
    if (!isOpen) {
      reset({});
      Form.forEach(key => setValue(key.name, formValue[key.name] || ""));
    } else {
      reset({});
    }
  }, [isOpen,formValue,resetting]);



  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
        
      <>
        <CommonForm
          classes={"grid-cols-2 gap-1"}
          Form={Form}
          errors={errors}
          register={register}
          setValue={setValue}
          getValues={getValues}
        />
      </>
        <Button
          classes={"mt-2 w-sm text-center flex mx-auto"}
          onClick={handleSubmit(onTableViewSubmit)}
          name="Submit"
        />
      </div>
    </>
  );


};

export default AccrualRevenueTrendForm;
