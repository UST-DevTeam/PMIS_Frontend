import React, { useState } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import CommonForm from "./CommonForm";
import Modal from "./Modal";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  // const [sortBy, setSortBy] = useState([]);
  // const [filterBy, setFilterBy] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalBody, setModalBody] = useState(<></>);
  const [modalHead, setModalHead] = useState(<></>);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    watch: watch2,
    reset: reset2,
    setValue: setValue2,
    getValues: getValues2,
    formState: { errors: errors2 },
  } = useForm();

  // useEffect(() => {
  // setFilterBy(() => watch("filterActivities"));
  // setSortBy(() => watch("sortActivities"));
  // // }, []);

  const sortOptions = ["Newest Due", "Oldest Due"].map((role) => {
    return {
      label: `${role}`,
      value: role,
    };
  });

  const assignedToOptions = ["mabojaw685@gmail.com"].map((item) => {
    return {
      label: item,
      value: item,
    };
  });

  const temp = [
    "Upcoming",
    "Completed",
    "Overdue",
    "Email",
    "Call",
    "Meeting",
    "Task",
    "Other",
    "Assigned to You",
  ];
  const checkBoxOptions = temp.map((item) => {
    return { label: item, value: item };
  });

  const activityTypeOptions = [
    "Task",
    "Send Email",
    "Call",
    "Meeting",
    "Choose Investors",
  ].map((item) => {
    return { label: item, value: item };
  });

  const chooseInvestorsOptions = ["Wavemaker Partnerst"].map((item) => {
    return { label: item, value: item };
  });

  const durationOptions = [
    "All day activity",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
  ].map((item) => {
    return { label: item, value: item };
  });

  const exportToCalenderOptions = ["None", "Apple", "Google", "Outlook"].map(
    (item) => {
      return { label: item, value: item };
    }
  );

  const addActivitiesForm = [
    {
      label: "Title",
      value: "",
      name: "activityTitle",
      required: true,
      type: "text",
    },
    {
      label: "Assigned To",
      value: "",
      name: "assignedTo",
      required: true,
      type: "select",
      option: assignedToOptions,
    },
    {
      label: "Type of Activity",
      value: "",
      name: "typeOfActivity",
      required: true,
      type: "select",
      option: activityTypeOptions,
    },
    {
      label: "Choose Investors",
      value: "",
      name: "chooseInvestors",
      required: true,
      type: "select",
      option: chooseInvestorsOptions,
    },
    {
      label: "Date",
      value: "",
      name: "date",
      required: true,
      type: "datetime",
    },
    {
      label: "Time",
      value: "",
      name: "time",
      required: true,
      type: "datetime",
    },
    {
      label: "Duration",
      value: "",
      name: "duration",
      required: true,
      type: "select",
      option: durationOptions,
    },
    {
      label: "Export To Calendar",
      value: "",
      name: "exportToCalender",
      required: true,
      type: "select",
      option: exportToCalenderOptions,
    },
    {
      label: "Notes",
      value: "",
      name: "notes",
      required: true,
      type: "text",
    },
  ];

  const filterActivitiesForm = [
    {
      label: "Sort Activities",
      value: "",
      name: "sortActivities",
      required: true,
      type: "select",
      option: sortOptions,
    },
    {
      label: "Filter activities",
      value: "",
      name: "filterActivities",
      required: true,
      type: "checkbox",
      option: checkBoxOptions,
      props: "flex flex-col",
    },
  ];

  const sortBy = watch2("filterActivities");
  const filterBy = watch2("sortActivities");

  // console.log("--------------------------");
  // console.log(filterBy);
  // console.log(sortBy);
  // console.log("--------------------------");

  const handleAddActivity = (res) => {
    console.log(res);
  };

  return (
    <div className="flex text-sm font-poppins">
      <Modal
        size={"sm"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalHead={modalHead}
      >
        {modalBody}
      </Modal>
      <div className={activities.length == 0 ? `m-auto` : ""}>
        {activities.length == 0 ? (
          <div className="text-center">
            There are no activities related to this investor yet.
          </div>
        ) : (
          activities.map((activity, index) => (
            <div key={index}>{JSON.stringify(activity)}</div>
          ))
        )}
      </div>
      <div className={`border border-gray-300 rounded-lg dark:bg-secLine ${activities.length > 0 && "ml-auto"}`}>
        <div>
          <Button
            name="Add activity"
            onClick={() => {
              setIsOpen(true);
              setModalHead(<h1>Upload File</h1>);
              setModalBody(
                <div>
                  <CommonForm
                    classes={"grid-cols-1 gap-1"}
                    Form={addActivitiesForm}
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                  <Button
                    name="Upload"
                    onClick={handleSubmit(handleAddActivity)}
                  />
                </div>
              );
            }}
          />
        </div>
        <CommonForm
          classes={"grid-cols-1 gap-1"}
          Form={filterActivitiesForm}
          errors={errors2}
          register={register2}
          setValue={setValue2}
          getValues={getValues2}
        />
      </div>
    </div>
  );
};

export default Activities;
