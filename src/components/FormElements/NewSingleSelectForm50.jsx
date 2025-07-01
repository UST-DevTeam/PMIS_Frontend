import React, { useEffect, useState } from "react";
import Select from "react-select";

const NewSingleSelectForm50 = ({ itm, errors, setValue, getValues }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    if (getValues()[itm.name] && itm.id.length > 0) {
      const oldValue = itm.id.find((idItem) => idItem.value === getValues()[itm.name]);
      setSelectedValue(oldValue);
    }
  }, [getValues, itm.name, itm.id]);
  

  const handleSelectChange = (selectedOption) => {
    setSelectedValue(selectedOption);
    setValue(itm.name, selectedOption ? selectedOption.value : "");

    // Execute dynamic onChange if provided
    if (itm.props?.onChange) {
      itm.props.onChange({ target: { value: selectedOption?.value || "" } });
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      // backgroundColor: "white",
      // border: "1px solid gray",
      // borderRadius: "0.375rem",
      height: "50px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "black",
      },
    }),
    input: (provided) => ({
      ...provided,
      color: "black",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "black",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "white",
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 1050,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f0f0f0" : "white",
      color: state.isSelected ? "black" : "black",
      
    }),
  };

  return (
    <div className={`${itm.classes}`}>
      <Select
        value={selectedValue}
        onChange={handleSelectChange}
        options={itm.option} 
        placeholder="Select"
        isClearable={true} 
        styles={customStyles} 
        menuPosition="fixed"
        // className="pt-1 bg-white block h-max rounded-md py-1.5 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      className="rounded-md text-white-900 shadow-lg focus:shadow-indigo-500/30 ring-1 ring-inset ring-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      {errors[itm.name] && <span className="text-red-500">{errors[itm.name].message}</span>}
    </div>
  );
};

export default NewSingleSelectForm50;