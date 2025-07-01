import React, { useEffect } from "react";

const SelectDropDown = ({
  itm,
  errors,
  handleSubmit,
  setValue,
  getValues,
  register,
  border,
  borderColor,
  bgColor,
  widthFull="w-full"
}) => {

  console.log("itm_itm", itm)

  return (
    itm && (
      <>
        <select
          onChange={itm.onChanging ? itm.onChanging : null}
          {...register(itm?.name, {
            required: itm?.required ? "This Field is required" : false,
            ...itm?.props,
          })}
          {...(itm?.props?.id ? { id: itm?.props?.id } : {})}
          className={`${itm?.bg ?? "bg-white"
            } font-semibold block h-10 ${widthFull} ${border} ${borderColor} rounded-md text-white-900 shadow-lg focus:shadow-indigo-500/30 ring-1 ring-inset ring-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
        >
          <option value={""} selected={itm.value == "Select"}>
            Select
          </option>
          {itm?.option?.map((selitm) => {
            return (
              <option key={selitm.value} value={selitm.value}>
                {selitm.label}
              </option>
            );
          })}
        </select>
        <p className="text-xs text-rose-400 font-bold">
          {errors[itm?.name]?.message}
        </p>
      </>
    )
  );
};

export default SelectDropDown;
