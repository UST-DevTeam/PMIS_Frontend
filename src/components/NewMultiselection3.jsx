import { MultiSelect } from "react-multi-select-component";
import React, { useEffect, useState } from "react";

const NewMultiselection3 = ({
  itm,
  errors,
  handleSubmit,
  setValue,
  getValues,
  register,
  classes,

}) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const SelectAllOption = { name: "Select All", id: "select-all" };
  let datew = [];
  if (getValues()[itm.name]) {
    let oldData = getValues()[itm.name].split(",");

    datew = itm.option.filter((itm) => {
      if (oldData.indexOf(itm.id) != -1) {
        return itm;
      }
    });
  }

  useEffect(() => {
    if (itm.props.selectType) {
      setSelectedValues([]);
      setValue(itm.name, '');
    }
  }, [itm.props.selectType]);

  // const handleSelect = (e) => {
  //   let finalselection = e.map((itm) => itm.value);
  //   setSelectedValues(e);
  //   setValue(itm.label, finalselection.join());
  // };

  const handleSelect = (e) => {
    setSelectedValues(e);
    setValue(itm.name, e.map(option => option.value).join());

    if (itm.props.onChange) {
      itm.props.onChange(e);
    }
  };


  const handleRemove = (e) => {
    let finalselection = e.map((itm) => itm.value);
    setSelectedValues(e);
    setValue(itm.label, finalselection.join());
  };

  return (
    <>
      <MultiSelect
        // isOpen={true}
        keepSearchTerm={true}
        groupBy="category"
        options={itm.option}
        hasSelectAll={itm.hasSelectAll ? itm.hasSelectAll : false}
        showCheckbox
        singleSelect={itm.singleSelect ? itm.singleSelect : false}
       // Preselected value to persist in dropdown
        onChange={handleSelect} // Function will trigger on select event
        onRemove={handleSelect} // Function will trigger on remove event
        {...itm.props}
        value={itm?.props?.value || []}
        displayValue={itm.displayValue ? itm.displayValue : "name"}
        style={{
          searchBox: {
            border: "none",
            "border-radius": "0px",
            padding: "0px",
            color: "white !important",
            height: "38px",          
          },
        }}
        className="max-w-[150px] min-w-[150px] absolute  bg-white rounded-md  text-white-900 shadow-sm  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </>
  );
};

export default NewMultiselection3;