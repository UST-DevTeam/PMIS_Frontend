import React, { useEffect, useState } from "react";
import Select from "react-select";

const NewSingleSelectCommon = ({ itm, errors, setValue, getValues }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    if (getValues()[itm.name]) {
      const oldValue = itm.option.find(
        (option) => option.value === getValues()[itm.name]
      );
      setSelectedValue(oldValue);
    }
  }, [getValues, itm.name, itm.option]);

  const handleSelectChange = (selectedOption) => {
    setSelectedValue(selectedOption);
    setValue(itm.name, selectedOption ? selectedOption.value : "");

    if (itm.props?.onChange) {
      itm.props.onChange({ target: { value: selectedOption?.value || "" } });
    }
  };
  
  const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: '#3e454d',
        borderColor: '#64676d',  
            
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#f0f0f0',
    }),
    menuList: (provided) => ({
        ...provided,
        paddingTop: 0, 
        paddingBottom: 0, 
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#d4d4d4' : '#3e454d',
        color: state.isSelected ? '#000' : 'white',     
        fontSize :"12px", 
        fontWeight: "bold",  
        '&:hover': {
            backgroundColor: '#24292d',
            color:"white"                        
        },
    }),
    placeholder : (porvided, state) =>({
        ...porvided,
        color: state.isSelected ? '#000' : '#AAAAAA', 
    }),
    input: (provided) => ({
      ...provided,
      color: 'white',
    }),
    indicatorSeparator: () => ({
        display: 'none', 
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
        // className="pt-1 bg-white block h-max rounded-md py-1.5 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      className="rounded-md text-white-900 shadow-lg focus:shadow-indigo-500/30 ring-1 ring-inset ring-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      {errors[itm.name] && <span className="text-red-500">{errors[itm.name].message}</span>}
    </div>
  );
};

export default NewSingleSelectCommon;
