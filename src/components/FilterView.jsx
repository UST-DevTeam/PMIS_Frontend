// import React, {useEffect } from "react";
// import PopupMenu from "./PopupMenu";
// import { UilColumns } from "@iconscout/react-unicons";
// import { UilFilter } from "@iconscout/react-unicons";
// import DatePicker from "react-datepicker";
// import Button from "./Button";
// const FilterView = ({
//   tablefilter,
//   handleSubmit = () => {},
//   onSubmit,
//   table,
//   data,
//   errors,
//   onReset,
//   register,
//   setValue,
//   getValues,
// }) => {

//   useEffect(() => {
//     const handleEnterKey = (e) => {
//       if (e.key === "Enter") {
//         handleSubmit(onSubmit)();
//       }
//     };

//     document.addEventListener("keypress", handleEnterKey);
//     return () => {
//       document.removeEventListener("keypress", handleEnterKey);
//     };
//   }, []);


//   return ( 
//     <>
//       {tablefilter.length > 0 && (
//         <PopupMenu
//           name={"Filter"}
//           dataclasses={""}
//           classes=""
//           icon={<UilFilter size="32" className={"hello"} />}
//           child={
//             <>
//               <div className="grid grid-cols-2">
//                 {tablefilter.map((itm) => {
//                   console.log('tablefilterlengthtablefilterlengthtablefilterlength',itm)
//                   setValue(itm.name , '')
//                   return (
//                     <>
//                       <div className="flex flex-col ">
//                         <label className="block text-sm p-2 font-medium text-white dark:text-black">
//                           {itm.label}
//                         </label>

//                         {itm.type == "select" && (
//                           <>
//                           <select
//                             onChange  ={itm.onChanging ? itm.onChanging : null}
//                             {...register(itm.name, {
//                               required: itm.required
//                                 ? "This " + " Field is required"
//                                 : false,
//                               ...itm.props,
//                             })}
//                             onInput={(e) => setValue(itm.name, e.target.value)}
//                             className={
//                               "bg-white border-black border block h-8 w-44 m-1 rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                             }
//                           >
//                             <option value={""}>Select</option>
//                             {itm.option.map((selitm) => {
//                               return (
//                                 <option value={selitm.value}>
//                                   {selitm.label}
//                                 </option>
//                               );
//                             })}
//                           </select>
//                             {console.log(
//                               errors[itm.name],
//                               itm.required,
//                               "errors?.itm?dggd"
//                             )}
//                             <p className="text-xs text-red-700">
//                               {errors[itm.name]?.message}
//                             </p>
//                           </>

//                         )}

//                         {itm.type == "autoSuggestion" && (
//                           <>
//                             <input
//                               list={"optiondata" + itm.label}
//                               onChange={itm.onChanging ? itm.onChanging : null}
//                               {...register(itm.name, {
//                                 required: itm.required
//                                   ? "This " + " Field is required"
//                                   : false,
//                                 ...itm.props,
//                               })}

//                               className={
//                                 "bg-white border-black border block h-8 w-44 m-1 rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                               }
//                             />
//                             <datalist id={"optiondata" + itm.label}>
//                               {itm.option.map((selitm) => {
//                                 return (
//                                   <option value={selitm.label}>
//                                     {selitm.label}
//                                   </option>
//                                 );
//                               })}
//                             </datalist>
//                           </>
//                         )}
//                         {itm.type == "text" && (
//                           <>
//                             <input
//                               type={itm.type}
//                               {...register(itm.name, {
//                                 required: itm.required
//                                   ? "This " + " Field is required" 
//                                   : false,
//                                 ...itm.props,
//                               })}
//                               onChange={(e) => 
//                                 setValue(itm.name, e.target.value)
//                               }

//                               className=" bg-white border-black border block h-8 w-44 m-1 rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                               {...itm.props}
//                             />
//                             <p className="text-xs text-red-700">
//                               {errors[itm.name]?.message}
//                             </p>
//                           </>
//                         )}
//                         {itm.type == "datetime" && (
//                           <>
//                             <DatePicker
//                               selectsRange
//                               selected={
//                                 getValues(itm.name)
//                                   ? moment(
//                                       getValues(itm.name),
//                                       itm?.formatop
//                                     ).toDate()
//                                   : getValues(itm.name)
//                               }
//                               onChange={(date) => {

//                                 let curr = moment(date);
//                                 setValue(itm.name, date);
//                               }}
//                               // showTimeSelect={itm.formattype == "time" || itm.formattype == "datetime"}
//                               // showTimeSelectOnly={itm.formattype == "time" || itm.formattype == "datetime"}
//                               show={false}
//                               showIcon={true}
//                               dateFormat={itm?.format}
//                               timeIntervals={itm?.interval}
//                               timeFormat={"HH:mm"}
//                               className="bg-white border-black border block h-8 w-44 rounded-md p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                             />
//                             <p className="text-xs text-red-700">
//                               {errors[itm.name]?.message}
//                             </p>
//                           </>
//                         )}
//                       </div>
//                     </>
//                   );
//                 })}
//               </div>
//               <div className="w-18 py-3 flex justify-center grid-cols-1">
//                 <Button
//                   name={"Filter"}
//                   onClick={handleSubmit(onSubmit)}
//                   classes="w-18 p-10 mx-2"
//                 />
//                 <Button
//                   name={"Reset"}
//                   onClick={() => {
//                     Object.entries(getValues()).map((itew) => {
//                       setValue(itew[0], "");
//                     });
//                     console.log(getValues(), "getValues");
//                     onReset();
//                   }}
//                   classes="w-18 p-10 mx-2 bg-rose-400"
//                 />

//               </div>
//             </>
//           }
//         />
//       )}
//     </>
//   );
// };

// export default FilterView;




import React, { useEffect } from "react";
import PopupMenu from "./PopupMenu";
import { UilFilter } from "@iconscout/react-unicons";
import DatePicker from "react-datepicker";
import Button from "./Button";
import Multiselection from "./FormElements/Multiselection";

const FilterView = ({
  tablefilter = [],
  handleSubmit = () => { },
  onSubmit,
  errors = {},
  onReset,
  register,
  setValue,
  getValues,
}) => {
  useEffect(() => {
    const handleEnterKey = (e) => {
      if (e.key === "Enter") {
        handleSubmit(onSubmit)();
      }
    };

    document.addEventListener("keypress", handleEnterKey);
    return () => {
      document.removeEventListener("keypress", handleEnterKey);
    };
  }, [handleSubmit, onSubmit]);

  useEffect(() => {
    tablefilter.forEach((itm) => {
      setValue(itm.name, getValues(itm.name) || '');
    });
  }, [tablefilter, setValue, getValues]);

  return (
    <>
      {tablefilter.length > 0 && (
        <PopupMenu
          name={"Filter"}
          icon={<UilFilter size="32" />}
          child={
            <>
              <div className="grid grid-cols-2">
                {tablefilter.map((itm) => (

                  <div key={itm.name} className="flex flex-col">
                    <label className="block text-sm p-2 font-medium text-white dark:text-black">
                      {itm.label}
                    </label>

                    {itm.type === "select" && (

                      <>
                        <select
                          {...register(itm.name, {
                            required: itm.required
                              ? "This field is required"
                              : false,
                            ...itm.props,
                          })}
                          onChange={(e) => {
                            setValue(itm.name, e.target.value)
                            itm.props?.onChange && itm.props.onChange(e)
                          }}
                          className="bg-white border-black border block h-8 w-44 m-1 rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option value="">Select</option>
                          {itm.option.map((selitm) => (
                            <option key={selitm.value} value={selitm.value}>
                              {selitm.label}
                            </option>
                          ))}
                        </select>
                        <p className="text-xs text-red-700">
                          {errors[itm.name]?.message || ''}
                        </p>
                      </>
                    )}

                    {itm.type === "autoSuggestion" && (
                      <>
                        <input
                          list={"optiondata" + itm.label}
                          {...register(itm.name, {
                            required: itm.required
                              ? "This field is required"
                              : false,
                            ...itm.props,
                          })}
                          onChange={(e) => setValue(itm.name, e.target.value)}
                          className="bg-white border-black border block h-8 w-44 m-1 rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <datalist id={"optiondata" + itm.label}>
                          {itm.option.map((selitm) => (
                            <option key={selitm.label} value={selitm.label}>
                              {selitm.label}
                            </option>
                          ))}
                        </datalist>
                      </>
                    )}

                    {itm.type === "text" && (
                      <>
                        <input
                          type={itm.type}
                          {...register(itm.name, {
                            required: itm.required
                              ? "This field is required"
                              : false,
                            ...itm.props,
                          })}
                          onChange={(e) => setValue(itm.name, e.target.value)}
                          className="bg-white border-black border block h-8 w-44 m-1 rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-xs text-red-700">
                          {errors[itm.name]?.message || ''}
                        </p>
                      </>
                    )}

                    {itm.type === "datetime" && (
                      <>
                        <DatePicker
                          selected={
                            getValues(itm.name)
                              ? new Date(getValues(itm.name))
                              : null
                          }
                          onChange={(date) => setValue(itm.name, date)}
                          dateFormat={itm?.format || 'MM/dd/yyyy'}
                          className="bg-white border-black border block h-8 w-44 rounded-md p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-xs text-red-700">
                          {errors[itm.name]?.message || ''}
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="w-18 py-3 flex justify-center grid-cols-1">
                <Button
                  name={"Filter"}
                  onClick={handleSubmit(onSubmit)}
                  classes="w-18 p-10 mx-2"
                />
                <Button
                  name={"Reset"}
                  onClick={() => {
                    tablefilter.forEach((itm) => setValue(itm.name, ''));
                    // onSubmit({})
                    onReset();
                  }}
                  classes="w-18 p-10 mx-2 bg-rose-400"
                />
              </div>
            </>
          }
        />
      )}
    </>
  );
};

export default FilterView;
