import React, { useEffect, useState } from "react";
import { types, uiList } from "../utils/queryBuilder";
import TextBox from "./FormElements/TextBox";
import SelectDropDown from "./FormElements/SelectDropDown";
import Disabled from "./FormElements/Disabled";
import { Radio } from "@material-ui/core";
import CheckBox from "./FormElements/CheckBox";
import FilePicker from "./FormElements/FilePicker";
import AutoSuggestion from "./FormElements/AutoSuggestion";
import TextArea from "./FormElements/TextArea";
import DatePicking from "./FormElements/DatePicking";
import Multiselection from "./FormElements/Multiselection";
import Multiselect from "multiselect-react-dropdown";
// const CreateFormField = ({
//   itm,
//   index,
//   handleSubmit,
//   errors,
//   setValue,
//   getValues,
//   register
// }) => {
//   return (
//     <>
//       {itm.type == "heading" ? (<>
//         <div className={`${itm.classes ? itm.classes : "col-span-1"}`}>
//           <h1 className="pl-8">{itm.label}</h1>
//         </div>
//       </>) : <></>}

//       {/* <Table columns={[]}/> */}



//       {itm.type != "hidden" && itm.type != "heading" ? (
//         <div
//           className={`mx-0 my-3 p-1 ${itm.classes ? itm.classes : "col-span-1"}`}
//         >
//           {/* {itm?.showlabel == false ? <></> : <div className="items-center justify-between">
//               {
//                 <label className="block text-sm font-medium text-txt-neavy ml-3 dark:text-darkBg">
//                   {itm.label}
//                   {itm?.required && <span className="text-red-600 ml-1 ">*</span>}
//                 </label>
//               }
//             </div>
//             } */}
//           <div
//             className={uiList[itm.type]?.height + " flex flex-row"}
//           >
//             {itm?.amp && (
//               itm?.amp?.map((its) => {
//                 return <div className={`flex flex-row border-b-2 text-white-900 sm:text-sm sm:leading-6 rounded-md bg-opacity-50  font-poppins outline-none border-gray-400  shadow-lg focus:shadow-indigo-500/30 ${its?.styling} ${its?.styling?.includes("w-") ? "" : " w-24 "}`}>
//                   {
//                     its?.type == "select" && <SelectDropDown
//                       itm={its}
//                       errors={errors}
//                       handleSubmit={handleSubmit}
//                       setValue={setValue}
//                       getValues={getValues}
//                       register={register}
//                     />
//                   }

//                   {
//                     types.indexOf(its.type) != -1 && <TextBox
//                       itm={its}
//                       errors={errors}
//                       handleSubmit={handleSubmit}
//                       setValue={setValue}
//                       getValues={getValues}
//                       register={register}
//                     />
//                   }
//                 </div>

//               })

//             )}

//             {types.indexOf(itm.type) != -1 ? (
//               <>
//                 <TextBox
//                   itm={itm}
//                   errors={errors}
//                   handleSubmit={handleSubmit}
//                   setValue={setValue}
//                   getValues={getValues}
//                   register={register}
//                 />
//               </>
//             ) : (
//               <></>
//             )}
//             {itm.type == "sdisabled" || itm.type == "hdisabled" ? (
//               <>
//                 <Disabled
//                   itm={itm}
//                   errors={errors}
//                   handleSubmit={handleSubmit}
//                   setValue={setValue}
//                   getValues={getValues}
//                   register={register}
//                 />
//               </>
//             ) : (
//               <></>
//             )}
//             {itm.type == "radio" ? (
//               <>
//                 <Radio
//                   itm={itm}
//                   errors={errors}
//                   handleSubmit={handleSubmit}
//                   setValue={setValue}
//                   getValues={getValues}
//                   register={register}
//                 />
//               </>
//             ) : (
//               <></>
//             )}
//             {itm.type == "checkbox" ? (
//               <>
//                 <CheckBox
//                   itm={itm}
//                   errors={errors}
//                   handleSubmit={handleSubmit}
//                   setValue={setValue}
//                   getValues={getValues}
//                   register={register}
//                 />
//               </>
//             ) : (
//               <></>
//             )}
//             {itm.type == "file" ? (
//               <>
//                 <FilePicker
//                   itm={itm}
//                   errors={errors}
//                   handleSubmit={handleSubmit}
//                   setValue={setValue}
//                   getValues={getValues}
//                   register={register}
//                 />
//               </>
//             ) : (
//               <></>
//             )}
//             {itm.type == "select" ? (
//               <>
//                 <SelectDropDown
//                   itm={itm}
//                   errors={errors}
//                   handleSubmit={handleSubmit}
//                   setValue={setValue}
//                   getValues={getValues}
//                   register={register}
//                 />
//               </>
//             ) : (
//               <></>
//             )}
//             {itm.type == "autoSuggestion" ? (
//               <>
//                 <AutoSuggestion
//                   itm={itm}
//                   errors={errors}
//                   handleSubmit={handleSubmit}
//                   setValue={setValue}
//                   getValues={getValues}
//                   register={register}
//                 />
//               </>
//             ) : (
//               <></>
//             )}
//             {itm.type == "textarea" ? (
//               <>
//                 <TextArea
//                   itm={itm}
//                   errors={errors}
//                   handleSubmit={handleSubmit}
//                   setValue={setValue}
//                   getValues={getValues}
//                   register={register}
//                 />
//               </>
//             ) : (
//               <></>
//             )}
//             {itm.type == "datetime" ? (
//               <>
//                 <DatePicking
//                   itm={itm}
//                   errors={errors}
//                   handleSubmit={handleSubmit}
//                   setValue={setValue}
//                   getValues={getValues}
//                   register={register}
//                 />
//               </>
//             ) : (
//               <></>
//             )}
//             {itm.type == "muitiSelect" ? (
//               <Multiselection
//                 itm={itm}
//                 errors={errors}
//                 handleSubmit={handleSubmit}
//                 setValue={setValue}
//                 getValues={getValues}
//                 register={register}
//               />
//             ) : (
//               <></>
//             )}
//             {console.log(errors, "errorsendDateendDate")}
//           </div>
//         </div>
//       ) : (
//         ""
//       )}
//     </>
//   );
// }


// export default CreateFormField; 



const CreateFormField = ({
  Form = [],
  listing = [],
  itm,
  index,
  handleSubmit,
  errors,
  setValue,
  getValues,
  register
}) => {
  return (
    <>
      {itm.type == "heading" ? (<>
        <div className={`${itm.classes ? itm.classes : "col-span-1"}`}>
          <h1 className="pl-8">{itm.label}</h1>
        </div>
      </>) : <></>}

      {/* <Table columns={[]}/> */}



      {itm.type != "hidden" && itm.type != "heading" ? (
        <div
          className={`mx-0 my-3 p-1 ${itm.classes ? itm.classes : "col-span-1"}`}
        >
          {/* {itm?.showlabel == false ? <></> : <div className="items-center justify-between">
              {
                <label className="block text-sm font-medium text-txt-neavy ml-3 dark:text-darkBg">
                  {itm.label}
                  {itm?.required && <span className="text-red-600 ml-1 ">*</span>}
                </label>
              }
            </div>
            } */}
          <div
            className={uiList[itm.type]?.height + " flex flex-row"}
          >
            {itm?.amp && (
              itm?.amp?.map((its) => {
                return <div className={`flex flex-row border-b-2 text-white-900 sm:text-sm sm:leading-6 rounded-md bg-opacity-50  font-poppins outline-none border-gray-400  shadow-lg focus:shadow-indigo-500/30 ${its?.styling} ${its?.styling?.includes("") ? "" : " w-24 "}`}>
                  {
                    its?.type == "select" && <SelectDropDown
                      itm={its}
                      errors={errors}
                      handleSubmit={handleSubmit}
                      setValue={setValue}
                      getValues={getValues}
                      register={register}
                    />
                  }

                  {
                    types.indexOf(its.type) != -1 && <TextBox
                      itm={its}
                      errors={errors}
                      handleSubmit={handleSubmit}
                      setValue={setValue}
                      getValues={getValues}
                      register={register}
                    />
                  }
                </div>

              })

            )}

            {types.indexOf(itm.type) != -1 ? (
              <>
                {/* <TextBox
                  itm={itm}
                  errors={errors}
                  handleSubmit={handleSubmit}
                  setValue={setValue}
                  getValues={getValues}
                  register={register}
                /> */}

                <input className="p-2 block w-full text-center border-b-2 py-1.5 text-white-900 sm:text-sm sm:leading-6 rounded-md bg-opacity-50  font-poppins outline-none border-gray-400  shadow-lg focus:shadow-indigo-500/30" type={itm.type} min={0} defaultValue={itm.value}  {...itm.props} />
              </>
            ) : (
              <></>
            )}

            {/* {
              console.log(listing,listing
                .filter(iyyy => iyyy["fieldName"]!=undefined && iyyy["fieldName"] != "")
                .map((iyyy, index) => ({
                    id: iyyy["fieldName"],
                    name: iyyy["fieldName"]
                })),"dsadsadasdsadadsadsadasdsada")
            } */}



            {/* {itm.type == "muitiSelect" ? (<>Hello</>): (<></>)} */}

            {itm.type == "muitiSelect" ? (

              <div className="w-full" style={{ position: 'relative'}}>

                <div style={{ width: "220px", height: "200px" }}>
                  <Multiselect
                    menuIsOpen={true}
                    keepSearchTerm={true}
                    groupBy="category"
                    options={itm.option}
                    showCheckbox
                    closeOnChangedValue={false}
                    singleSelect={itm.singleSelect ? itm.singleSelect : false}
                    selectedValues={itm.oldValue ? itm.option.filter((iwq) => { if (itm.oldValue.split(",").indexOf(iwq.id) != -1) { return iwq } }) : []} // Preselected value to persist in dropdown
                    onSelect={itm.onSelect} // Function will trigger on select event
                    onRemove={itm.onRemove} // Function will trigger on remove event
                    {...itm.props}
                    displayValue={itm.displayValue ? itm.displayValue : "name"}
                    style={{
                      searchBox: {
                        border: 'none',
                        'border-radius': '0px',
                        padding: "0px",
                        color: "black !important",
                        height: "32px"
                      },
                      multiselectContainer: {
                        maxHeight: '200px',
                        position: 'absolute',
                        zIndex: '9999',
                        top: 'calc(100% + 8px)',
                        left: '0',

                      },
                    }}
                    className='pt-1 text-black bg-white border-black border block h-12 w-full rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm custom-scrollbar'
                  /></div></div>) : (
              <></>
            )}



            {itm.type == "sdisabled" || itm.type == "hdisabled" ? (
              <>
                <Disabled
                  itm={itm}
                  errors={errors}
                  handleSubmit={handleSubmit}
                  setValue={setValue}
                  getValues={getValues}
                  register={register}
                />
              </>
            ) : (
              <></>
            )}
            {itm.type == "radio" ? (
              <>
                <Radio
                  itm={itm}
                  errors={errors}
                  handleSubmit={handleSubmit}
                  setValue={setValue}
                  getValues={getValues}
                  register={register}
                />
              </>
            ) : (
              <></>
            )}
            {itm.type == "checkbox" ? (
              <>
                <CheckBox
                  itm={itm}
                  errors={errors}
                  handleSubmit={handleSubmit}
                  setValue={setValue}
                  getValues={getValues}
                  register={register}
                />
              </>
            ) : (
              <></>
            )}
            {itm.type == "file" ? (
              <>
                <FilePicker
                  itm={itm}
                  errors={errors}
                  handleSubmit={handleSubmit}
                  setValue={setValue}
                  getValues={getValues}
                  register={register}
                />
              </>
            ) : (
              <></>
            )}
            {itm.type == "select" ? (
              <>
                <div className="flex flex-col bg-white rounded-md">
                  <select className={`bg-white font-semibold block h-10 w-full text-center rounded-md text-white-900 shadow-lg ring-1 ring-inset ring-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}  
                  {...itm.props} value={itm.value}>
                    <option selected value={""} >Select</option>
                    {
                      itm?.option?.map((selitm) => {
                        return <option key={selitm.value} value={selitm.value}>{selitm.label}</option>
                      })
                    }
                  </select>

                  {
                    itm.value == "Dropdown" ? <input className="p-2 block w-full text-center border-b-2 py-1.5 text-white-900 sm:text-sm sm:leading-6 rounded-md bg-opacity-50  font-poppins outline-none border-gray-400  shadow-lg focus:shadow-indigo-500/30" type={itm.innertype} defaultValue={itm.innervalue} {...itm.innerprops} /> : <></>
                  }

                  {

                  }
                  {
                    itm.value == "Auto Created" ?
                      <div className="relative">
                        <Multiselect
                          menuIsOpen={true}
                          keepSearchTerm={true}
                          groupBy="category"
                          options={itm.inneroption}
                          showCheckbox
                          singleSelect={false}
                          selectedValues={itm.innervalue ? itm.inneroption.filter((iwq) => { if (itm.innervalue.split(",").indexOf(iwq.id) != -1) { return iwq } }) : []} // Preselected value to persist in dropdown
                          onSelect={itm.inneronSelect}
                          onRemove={itm.inneronRemove}
                          displayValue={"name"}
                          style={{
                            searchBox: {
                              border: "none",
                              "border-radius": "0px",
                              padding: "0px",
                              color: "black !important",
                            },
                          }}
                          className="pt-1 text-black bg-white border-black border text-center block h-10 w-full rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div> : <></>
                  }
                  {
                    itm.value == "mselect" ?
                      <div className="relative">
                        <Multiselect
                          menuIsOpen={true}
                          keepSearchTerm={true}
                          groupBy="category"
                          options={itm.inneroption}
                          showCheckbox
                          singleSelect={false}
                          selectedValues={itm.innervalue ? itm.inneroption.filter((iwq) => { if (itm.innervalue.split(",").indexOf(iwq.id) != -1) { return iwq } }) : []} // Preselected value to persist in dropdown
                          onSelect={itm.inneronSelect} 
                          onRemove={itm.inneronRemove}
                          displayValue={"name"}
                          style={{
                            searchBox: {
                              border: "none",
                              "border-radius": "0px",
                              padding: "0px",
                              color: "black !important",
                            },
                          }}
                          className="pt-1 text-black bg-white border-black border block w-full rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        /></div> : <></>
                  }



                </div>
                {/* <SelectDropDown
                  itm={itm}
                  errors={errors}
                  handleSubmit={handleSubmit}
                  setValue={setValue}
                  getValues={getValues}
                  register={register}
                /> */}
              </>
            ) : (
              <></>
            )}
            {itm.type == "autoSuggestion" ? (
              <>
                <AutoSuggestion
                  itm={itm}
                  errors={errors}
                  handleSubmit={handleSubmit}
                  setValue={setValue}
                  getValues={getValues}
                  register={register}
                />
              </>
            ) : (
              <></>
            )}
            {itm.type == "textarea" ? (
              <>
                <TextArea
                  itm={itm}
                  errors={errors}
                  handleSubmit={handleSubmit}
                  setValue={setValue}
                  getValues={getValues}
                  register={register}
                />
              </>
            ) : (
              <></>
            )}
            {itm.type == "datetime" ? (
              <>
                <DatePicking
                  itm={itm}
                  errors={errors}
                  handleSubmit={handleSubmit}
                  setValue={setValue}
                  getValues={getValues}
                  register={register}
                />
              </>
            ) : (
              <></>
            )}
            {/* {itm.type == "muitiSelect" ? (
              <Multiselection
                itm={itm}
                errors={errors}
                handleSubmit={handleSubmit}
                setValue={setValue}
                getValues={getValues}
                register={register}
              />
            ) : (
              <></>
            )} */}
            {/* {console.log(errors, "errorsendDateendDate")} */}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}


export default CreateFormField; 
