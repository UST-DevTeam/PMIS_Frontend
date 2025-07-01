import React from "react";

const SelectDropDown2 = ({
  itm,
  errors,
  handleSubmit,
  setValue,
  getValues,
  register,
  border,
  borderColor,
  bgColor,
}) => {
  return (
    itm && (
      <>
        {/* <select
          onChange={itm.onChanging ? itm.onChanging : null}
          {...register(itm?.name, {
            required: itm?.required ? "This Field is required" : false,
            ...itm?.props,
          })}
          {...(itm?.props?.id ? { id: itm?.props?.id } : {})}
          className={
            `${itm?.bg ?? 'bg-white'} font-semibold block h-10 w-full ${border} ${borderColor} rounded-md text-white-900 shadow-lg focus:shadow-indigo-500/30 ring-1 ring-inset ring-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`
          }
        >
          <option value={""} selected={itm.value == "Select"}>
            Select
          </option>
          {itm?.option?.map((selitm) => {
            return (
              <option key={selitm.value}  value={selitm.value} >
                {selitm.label}
              </option>
            );
          })}
        </select> */}
        <SelectSearch
          options={itm?.option.map((selitm) => ({
            value: selitm.value,
            name: selitm.label,
          }))}
          value={itm.value}
          onChange={itm.onChanging ? itm.onChanging : null}
          placeholder="Choose your language"
          {...register(itm?.name, {
            required: itm?.required ? "This Field is required" : false,
            ...itm?.props,
          })}
        />

        <p className="text-xs text-rose-400 font-bold">
          {errors[itm?.name]?.message}
        </p>
      </>
    )

    // <>
    //     {itm.amp ? (
    //         <>
    //           <select
    //                 onChange={itm.onChanging ? itm.onChanging : null}
    //                 {...register(itm.name, {
    //                     required: itm.required ? "This Field is required" : false,
    //                     ...itm.props
    //                 })}
    //                 className={"bg-white border-black border block h-8 w-full rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
    //             >
    //                 <option selected value={"Select"} disabled>Select</option>
    //                 {
    //                     itm.option.map((selitm) => {
    //                         return <option key={selitm.value} value={selitm.value}>{selitm.label}</option>
    //                     })
    //                 }
    //             </select>
    //         </>
    //     ) : (
    //         <>
    //             <select
    //                 onChange={itm.onChanging ? itm.onChanging : null}
    //                 {...register(itm.name, {
    //                     required: itm.required ? "This Field is required" : false,
    //                     ...itm.props
    //                 })}
    //                 className={"bg-white border-black border block h-8 w-full rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
    //             >
    //                 <option selected value={"Select"} disabled>Select</option>
    //                 {
    //                     itm.option.map((selitm) => {
    //                         return <option key={selitm.value} value={selitm.value}>{selitm.label}</option>
    //                     })
    //                 }
    //             </select>
    //         </>
    //     )}
    //     <p className='text-xs text-red-700'>{errors[itm.name]?.message}</p>
    // </>
  );
};

export default SelectDropDown2;
