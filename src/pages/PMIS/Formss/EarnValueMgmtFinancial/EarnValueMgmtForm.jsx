import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import FormssActions from "../../../../store/actions/formss-actions";
 
const EarnValueMgmtForm = ({
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
  columnHeader
}) => {


  console.log(formValue,"formValueformValue")

  const [modalOpen, setmodalOpen] = useState(false);
  let dispatch = useDispatch();
  const monthMap = {1: "Jan",2: "Feb",3: "Mar",4: "Apr",5: "May",6: "Jun",7: "Jul",8: "Aug",9: "Sep",10: "Oct",11: "Nov", 12: "Dec"};

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
    
    
    let Form = [
        ...columnHeader.map((itm)=>(
          {
            label: `PV Target (${monthMap[itm.month]} ${itm.year})`,
            value: "",
            name: `pv-${itm.month}-${itm.year}`,
            type: "number",
            props: {
              valueAsNumber:true,
              min: 0,
              onChange: (e) => {},
            },
            classes: "col-span-1",
          })),
    ];

  const onTableViewSubmit = (data) => {

    data['projectgroupuid'] = formValue?.projectgroupuid
    data['roleName'] = roleName;
    data['uniqueId'] = formValue?.uniqueId;
    data['year'] = year;
    dispatch(
      FormssActions.putEarnValueMgmtFinancial(
        data,
        () => {
          setIsOpen(false);
          dispatch(
            FormssActions.postEarnValueMgmtFinancial(
              {
                viewBy: monthss.join(","),
                year: `${year}`,
                yyear: `${year}`
              },
              () => {}
            )
          );
        },
      )
    );
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
      <Modal
        size={"xl"}
        children={
          <>
            {/* <CommonForm
              classes={"grid-cols-1 gap-1"}
              Form={Form}
              errors={errors}
              register={register}
              setValue={setValue}
              getValues={getValues}
            /> */}
          </>
        }
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />

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

export default EarnValueMgmtForm;

	