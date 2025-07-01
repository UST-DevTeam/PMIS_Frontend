import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import AdminActions from "../../../../store/actions/admin-actions";
import FormssActions from "../../../../store/actions/formss-actions";
 
const ActualWorkdoneForm = ({
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
  year,
  monthss,
  weeks,
  view
}) => {

  let roleName = useSelector((state)=>{
    let role = state?.auth?.user?.roleName
    return role
  })


  const [modalOpen, setmodalOpen] = useState(false);

  let dispatch = useDispatch();


  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getPreviousCurrentAndNextMonth = () => {
      const currentDate = new Date();
      const currentMonthIndex = currentDate.getMonth();
      const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12;
      const nextMonthIndex = (currentMonthIndex + 1) % 12;
      const currentYear = currentDate.getFullYear();
      const previousMonthYear = currentMonthIndex === 0 ? currentYear - 1 : currentYear;
      const nextMonthYear = currentMonthIndex === 11 ? currentYear + 1 : currentYear;

      return [
          { month: months[previousMonthIndex], year: previousMonthYear },
          { month: months[currentMonthIndex], year: currentYear },
          { month: months[nextMonthIndex], year: nextMonthYear }
      ];
  };

  const [previousMonthData, currentMonthData, nextMonthData] = getPreviousCurrentAndNextMonth();
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
    
    
    // let Form = [
    //   ...monthss.map((itm )=>(
    //     if (ValGm && ValGm === "Monthly") {
    //     {
    //       label: `PV Target (${monthsss[itm]} ${year})`,
    //       value: "",
    //       name: `M-${itm}`,
    //       type: "number",
    //       props: {
    //         valueAsNumber:true,
    //         min: 0,
    //         onChange: (e) => {},
    //       },
    //       classes: "col-span-1",
    //     }
    //   } else{
    //     {
    //       label: `PV Target (${itm} ${year})`,
    //       value: "",
    //       name: `${itm}`,
    //       type: "number",
    //       props: {
    //         valueAsNumber:true,
    //         min: 0,
    //         onChange: (e) => {},
    //       },
    //       classes: "col-span-1",
    //     }
    //   }
      
    //   )),
    // ];

    let Form = monthss.map((itm) => {
      return view && view === "Monthly"
        ? {
            label: `PV Target (${monthsss[itm]} ${year})`,
            value: "",
            name: `M-${itm}`,
            type: "number",
            props: {
              valueAsNumber: true,
              onChange: (e) => {},
            },
            classes: "col-span-1",
          }
        : {
            label: `PV Target (${itm} ${year})`,
            value: "",
            name: `${itm}`,
            type: "number",
            props: {
              valueAsNumber: true,
              onChange: (e) => {},
            },
            classes: "col-span-1",
          };
    });

    

    let Form2 = [
      
        {
          label: `PV Target (${currentMonthData.month} ${currentMonthData.year})`,
          value: "",
          type: "number",
          props: {
            valueAsNumber:true,
            min: 0,
            onChange: (e) => {},
          },
          classes: "col-span-1",
        },
        {
          label: `PV Target (${currentMonthData.month} ${currentMonthData.year})`,
          value: "",
          type: "number",
          props: {
            valueAsNumber:true,
            min: 0,
            onChange: (e) => {},
          },
          classes: "col-span-1",
        },
    ];


  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();


  const onSubmit = (data) => {
    console.log(data);
  };
  const onTableViewSubmit = (data) => {
    data['projecttypeuid'] = formValue?.projecttypeuid;
    data['roleName'] = roleName;
    data['projectuid'] = formValue?.projectuid;
    data['year'] = year;
    
      dispatch(
        FormssActions.putEVMDelivery(
          data,
          () => {
            setIsOpen(false);
            dispatch(
              FormssActions.postEVMDelivery(
                {
                  viewBy: monthss.join(","),
                  year: `${year}`,
                  yyear: `${year}`,
                  selectional: view,
                  typeSelectional: view,
                },
                () => {}
              )
            );
          },
        )
      );
  };

  // useEffect(() => {
  //   if (resetting) {
  //     reset({});
  //     Form.map((fieldName) => {
  //       setValue(fieldName["name"], fieldName["value"]);
  //     });
  //   } else {
  //     reset({});
  //     console.log(Object.keys(formValue), "Object.keys(formValue)");
  //     Form.forEach((key) => {
  //       if (["endAt", "startAt"].indexOf(key.name) != -1) {
  //         console.log("date formValuekey", key.name, formValue[key.name]);
  //         const momentObj = moment(formValue[key.name]);
  //         setValue(key.name, momentObj.toDate());
  //       } else {
  //         setValue(key.name, formValue[key.name]);
  //       }
  //     });
  //   }
  // }, [formValue, resetting]);

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
      <Modal
        size={"xl"}
        children={
          <>
            <CommonForm
              classes={"grid-cols-1 gap-1"}
              Form={Form}
              errors={errors}
              register={register}
              setValue={setValue}
              getValues={getValues}
            />
          </>
        }
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
        
      <>
        <CommonForm
          classes={"grid-cols-2 gap-1"}
          Form={(roleName==='Admin')?Form:Form2}
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

export default ActualWorkdoneForm;
