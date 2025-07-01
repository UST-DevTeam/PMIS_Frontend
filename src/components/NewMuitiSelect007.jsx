import { MultiSelect } from "react-multi-select-component";
import React, { useEffect, useState } from "react";

const NewMuitiSelect007 = ({
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

  const handleSelect = (e) => {
    let finalselection = e.map((itm) => itm.id);
    setSelectedValues(e);
    console.log("asasfasfasfafasfadsaf__onSelect",e);
    setValue(itm.name, finalselection.join());
  };

  const handleRemove = (e) => {
    let finalselection = e.map((itm) => itm.id);
    setSelectedValues(e);
    console.log("afafafafasdfadsasfasdf__onRemove",e);
    setValue(itm.name, finalselection.join());
  };

  return (
        <div className={`max-w-full `}>
            <MultiSelect
                // className="outline-none border rounded-md border-main w-full mt-[2px] z-9999"
                options={itm.option}
                value={selectedValues}
                defaultIsOpen={false}
                onChange={(data) => {
                  setSelectedValues(data);
                  setValue(itm.name, data?.map((item) => item.value).join(","));
                }}
                labelledBy="Select"
                styles={{
                    dropdownContainer: "multi-select-dropdown",
                    option: "multi-select-option",
                    chips: "multi-select-chips",
                  }}
                className={`${classes} text-black bg-white border-black border block h-10 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            />
        </div>

    )
};

export default NewMuitiSelect007;