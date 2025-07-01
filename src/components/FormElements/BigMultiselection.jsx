import Multiselect from "multiselect-react-dropdown";
import React from "react";

const BigMultiselection = ({itm,errors,handleSubmit,setValue,getValues,register, height = "h-32"}) => {


  let datew=[] 

  if (getValues()[itm.name]) {
    let oldData = getValues()[itm.name].split(",");
    datew=itm.option.filter((itm)=>{
        if(oldData.indexOf(itm.id)!=-1){
            return itm
        }
    })
  }


  return (
    <>
      <Multiselect
        menuIsOpen={true}
        keepSearchTerm={true}
        groupBy="category"
        options={itm.option}
        showCheckbox
        singleSelect={itm.singleSelect ? itm.singleSelect : false}
        selectedValues={datew} 
        onSelect={(e) => {
          let finalselection = e.map((itm) => {
            return itm.id;
          });
          console.log("asfasfasdfasdasdf",finalselection);
          setValue(itm.name, finalselection.join());
          
          if(itm.onSelecting){
            itm.onSelecting(finalselection)
          }

        }} // Function will trigger on select event
        onRemove={(e) => {
          let finalselection = e.map((itm) => {
            return itm.id;
          });
          if (finalselection.length === 0) {
            setValue(itm.name, null);
          } else {
            setValue(itm.name, finalselection.join());
          }
          if(itm.onRemoving){
            itm.onRemoving(finalselection)
          }
        }} // Function will trigger on remove event
        {...itm.props}
        displayValue={itm.displayValue ? itm.displayValue : "name"}
        style={{
          searchBox: {
            border: "none",
            "border-radius": "0px",
            padding: "0px",
           
            color: "black !important", 
            
          },
          multiselectContainer: {
            width:"100%",          },
        }}
        className={`custom-scrollbar pt-1 text-black bg-white block ${height} rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6`}
      />
    </>
  );
};

export default BigMultiselection;
