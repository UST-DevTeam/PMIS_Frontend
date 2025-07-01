import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import FormssActions from "../../../../store/actions/formss-actions";
 
const SOBForms = ({isOpen,setIsOpen,resetting,year,monthss,formValue = {} }) => {

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const currentMonth = new Date().getMonth() + 1;
  const currrentYear = new Date().getFullYear();
  const [modalOpen, setmodalOpen] = useState(false);
  const [extraColumns, setExtraColumnss] = useState([currentMonth]);
  let user = JSON.parse(localStorage.getItem("user"));
  let rolename = user?.uniqueId;
  
  let dispatch = useDispatch();

  let SOBHeaders = useSelector((state) => {
    let interdata = state?.formssData?.getSobdataDynamic?.[0]?.projectType || [""];
    return interdata;
  });
  
  let hh = SOBHeaders?.map((item) => {
    const names = item?._id;
    return {
      label: item._id,
      value: formValue[item.projectTypeuid] || "", 
      name: names,
      // required: true,
      type: "number",
      classes: "col-span-1",
    };
  });

  let SoBCircleList = useSelector((state) => {
    return state?.formssData?.getSobdataDynamic?.[0]?.circle?.map((itm) => {
      return {
        label: itm?._id,
        value: itm?.circleuid,
      };
    });
  });

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
        // label: `${monthsss[itm.month]} ${[itm.year]}`,
        // value: "",
        // name: `M-${itm.month}Y-${itm.year}`,
        // type: "number",
        // props: {
        //   valueAsNumber:true,
        //   min: 1,
        //   onChange: (e) => {},
        // },
        // classes: "col-span-1",
      },
      {
        label: "Circle",
        value: "",
        name: "circle",
        type: "select",
        // name: Object.entries(formValue).length > 0 ? "circleName" : "_id",
        // type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
        option: SoBCircleList,
        props: { 
        //   valueAsNumber:true,
        //   min: 1,
          onChange: (e) => {},
        },
        classes: "col-span-1",
      }
    )),
    
  ];

  const onSubmit = (data) => {
    // console.log(data);
  };

  if (Form !== null) {
    Form.push(...hh);
  }

  const onTableViewSubmit = (data) => {  
    data['uniqueId'] = formValue['uniqueId']
    data['year'] = year;
    data['viewBy'] = monthss.join(",");
    data["roleId"] = rolename;

    if (formValue.uniqueId) {
      dispatch(
        FormssActions.putFormsSob(
          data,
          () => {
            setIsOpen(false);
            dispatch(
                FormssActions.postFormsSob(
                    data,
                  () => {}
                )
              );
            // dispatch(FormssActions.postFormsSob(res, () => {}));
          },
        )
      );
    }
  };
 
  useEffect(() => { 
    if (resetting) {
        reset();
        Form.map((fieldName) => {
          setValue(fieldName["name"], fieldName["value"]);
        });
        
      } else { 
        reset();
        Object.keys(formValue).forEach((key) => {
          if (["endAt", "startAt"].indexOf(key.name) != -1) {
            const momentObj = moment(formValue[key.name]);
            setValue(key.name, momentObj.toDate());
          } else {
            setValue(key, formValue[key]);
          }
        }); 
         
        hh?.map((itm)=>{
          setValue(itm._id,itm.value);
        })
      }
    }, [formValue, resetting,]);



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

export default SOBForms;
