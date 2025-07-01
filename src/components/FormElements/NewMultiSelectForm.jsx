import { MultiSelect } from "react-multi-select-component";
import React, { useEffect, useState } from "react";

const NewMultiSelectsForm = ({
  itm,
  errors,
  handleSubmit,
  setValue,
  getValues,
  register,
  classes,
}) => {
  const [selectedValues, setSelectedValues] = useState([]);

  console.log(itm,"_________itmitm")

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
  console.log("asdfasadfsasafasfadsfadf__selectedValues",selectedValues);
  return (
        <div className={`max-w-[180px] min-w-[180px]  relative p-0 z-50  w-full`}>
            <MultiSelect
                // className="outline-none border rounded-md border-main w-full mt-[2px] z-9999"
                options={itm.option}
                // value={value}
                defaultIsOpen={false}
                onChange={(data) => {
                    cb(data) 
                    setLength(data.length)
                    }
                }
                style={{
                    searchBox: {
                        border: "none",
                        "border-radius": "0px",
                        padding: "0px",
                        color: "black !important",
                        height: "38px",
                    },
                }}
                className="pt-1 text-black bg-white border-black border block h-12 rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>

    )
};

export default NewMultiSelectsForm;