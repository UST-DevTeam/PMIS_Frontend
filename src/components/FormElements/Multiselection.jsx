// import Multiselect from "multiselect-react-dropdown";
// import React, { useEffect } from "react";

// const Multiselection = ({
//   itm,
//   errors,
//   handleSubmit,
//   setValue,
//   getValues,
//   register,
//   classes,
// }) => {
 

//   const SelectAllOption = { name: "Select All", id: "select-all" };
//   let datew = [];
//   if (getValues()[itm.name]) {
//     let oldData = getValues()[itm.name].split(",");

//     datew = itm.option.filter((itm) => {
   

//       if (oldData.indexOf(itm.id) != -1) {
//         return itm;
//       }
//     });
//   }
  
//   console.log("afdasfasfasfafasdf",SelectAllOption);
//   // useEffect(() => {
//   //   datew = []
//   // } , [itm?.label])

//   console.log("afafasfasfasfasfafadfsafafasd",itm.props.selectType);
//   // const handleChange = (selected) => {

//   //   console.log(selected,"selectedselectedselected")
//   //   if (selected.some((item) => item.id === "select-all")) {
//   //     setSelectedOptions(options);
//   //   } else {
//   //     setSelectedOptions(selected);
//   //   }
//   // };

//   return (
//     <>
//       <Multiselect
//         menuIsOpen={true}
//         keepSearchTerm={true}
//         groupBy="category"
//         // options={[SelectAllOption, ...itm.option]}
//         options={itm.option}
//         hasSelectAll={itm.hasSelectAll ? itm.hasSelectAll : false}
//         showCheckbox
//         singleSelect={itm.singleSelect ? itm.singleSelect : false}
//         selectedValues={datew} // Preselected value to persist in dropdown
//         onSelect={(e) => {
//           let finalselection = e.map((itm) => {
//             return itm.id;
//           });
//           // if(itm?.isBlank){
//           //   console.log('adsfsfdsafd' , itm?.isBlank)
//           //   datew = []
//           // }
//           console.log("afasfsasfasfaosfnmaf",itm.props.selectType);
//           // useEffect(()=>{

//           // },[itm?.props?.selectType])
//           setValue(itm.name, finalselection.join());
//           console.log(e[0], "onSelasdfdfasdfasdffect");
//           console.log(e, "onSelect");


//           //checking span
//           // console.log("fasfasfasfasfafasdf",datew); //black array
//           // console.log("fasfasfasfasfafasdf",itm.option);
//           // console.log("fasfasfasfasfafasdf",itm.singleSelect);  // undefined
//           console.log("fasfasfasfasfafasdf",itm.hasSelectAll);  // undefined

//         }} // Function will trigger on select event
//         onRemove={(e) => {
//           let finalselection = e.map((itm) => {
//             return itm.id;
//           });
//           setValue(itm.name, finalselection.join());
//           console.log(e, "onRemove");
//         }} // Function will trigger on remove event
//         {...itm.props}
//         displayValue={itm.displayValue ? itm.displayValue : "name"}
//         style={{
//           searchBox: {
//             border: "none",
//             "border-radius": "0px",
//             padding: "0px",
//             color: "black !important",
//             height: "38px",
//           },
//         }}
//         className="pt-1 text-black bg-white border-black border block  h-12 rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//       />
//     </>
//   );
// };

// export default Multiselection;













// import Multiselect from "multiselect-react-dropdown";
// import React, { useEffect, useState } from "react";

// const Multiselection = ({
//   itm,
//   errors,
//   handleSubmit,
//   setValue,
//   getValues,
//   register,
//   classes,
// }) => {
//   const [selectedValues, setSelectedValues] = useState([]);

//   const SelectAllOption = { name: "Select All", id: "select-all" };
//   let datew = [];
//   if (getValues()[itm.name]) {
//     let oldData = getValues()[itm.name].split(",");

//     datew = itm.option.filter((itm) => {
//       if (oldData.indexOf(itm.id) != -1) {
//         return itm;
//       }
//     });
//   }

//   useEffect(() => {
//     if (itm.props.selectType) {
//       setSelectedValues([]);
//       setValue(itm.name, '');
//     }
//   }, [itm.props.selectType]);



//   // const handleSelect = (e) => {
//   //   let finalselection = e.map((itm) => itm.id);
//   //   setSelectedValues(e);
//   //   console.log("asasfasfasfafasfadsaf__onSelect",e);
//   //   setValue(itm.name, finalselection.join());
//   // };

//   // const handleRemove = (e) => {
//   //   let finalselection = e.map((itm) => itm.id);
//   //   setSelectedValues(e);
//   //   console.log("afafafafasdfadsasfasdf__onRemove",e);
//   //   setValue(itm.name, finalselection.join());
//   // };




//   const handleSelect = (selectedList, selectedItem) => {
//     let finalselection;
//     if (selectedItem.id === "select-all") {
//       // If "Select All" option is selected, select all other options
//       finalselection = itm.option.map((item) => item.id);
//       setSelectedValues(itm.option);
//     } else {
//       // If any other option is selected
//       finalselection = selectedList.map((item) => item.id);
//       setSelectedValues(selectedList);
//     }
//     setValue(itm.name, finalselection.join());
//   };
//   const handleRemove = (selectedList, removedItem) => {
//     let finalselection;
//     if (removedItem.id === "select-all") {
//       // If "Select All" option is removed, deselect all other options
//       finalselection = [];
//       setSelectedValues([]);
//     } else {
//       // If any other option is removed
//       finalselection = selectedList.map((item) => item.id);
//       setSelectedValues(selectedList);
//     }
//     setValue(itm.name, finalselection.join());
//   };

  
//   console.log("asdfasadfsasafasfadsfadf__selectedValues",selectedValues);
//   return (
//     <>
//       <Multiselect
//         menuIsOpen={true}
//         keepSearchTerm={true}
//         groupBy="category"
//         options={itm.option}
//         hasSelectAll={itm.hasSelectAll ? itm.hasSelectAll : false}
//         showCheckbox
//         singleSelect={itm.singleSelect ? itm.singleSelect : false}
//         selectedValues={selectedValues} // Preselected value to persist in dropdown
//         onSelect={handleSelect} // Function will trigger on select event
//         onRemove={handleRemove} // Function will trigger on remove event
//         {...itm.props}
//         displayValue={itm.displayValue ? itm.displayValue : "name"}
//         style={{
//           searchBox: {
//             border: "none",
//             "border-radius": "0px",
//             padding: "0px",
//             color: "black !important",
//             height: "38px",
//           },
//         }}
//         className="pt-1 text-black bg-white border-black border block h-12 rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//       />
//     </>
//   );
// };

// export default Multiselection;


import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";

const Multiselection = ({
  itm,
  errors,
  handleSubmit,
  setValue,
  getValues,
  register,
  classes,
}) => {
  const [selectedValues, setSelectedValues] = useState(getValues()[itm.name] ? getValues()[itm.name].split(",").map((itm)=>{ return {id:itm,name:itm}}):[]);

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
    if (itm.props?.selectType) {
      setSelectedValues([]);
      setValue(itm.name, '');
    }
  }, [itm.props?.selectType]);

  const handleSelect = (e) => {
    let finalselection = e.map((itm) => itm.id);
    setSelectedValues(e);
    setValue(itm.name, finalselection.join());
  };

  const handleRemove = (e) => {
    let finalselection = e.map((itm) => itm.id);
    setSelectedValues(e);
    setValue(itm.name, finalselection.join());
  };

  return (
    <>
      <Multiselect
        menuIsOpen={true}
        keepSearchTerm={true}
        groupBy="category"
        options={itm.option}
        hasSelectAll={itm.hasSelectAll ? itm.hasSelectAll : false}
        showCheckbox
        singleSelect={itm.singleSelect ? itm.singleSelect : false}
        selectedValues={selectedValues} // Preselected value to persist in dropdown
        onSelect={handleSelect} // Function will trigger on select event
        onRemove={handleRemove} // Function will trigger on remove event
        {...itm.props}
        displayValue={itm.displayValue ? itm.displayValue : "name"}
        style={{
          searchBox: {
            border: "none",
            "border-radius": "0px",
            padding: "0px",
            color: "black !important",
            height: "38px",
          },
          // menuContainerStyle: {
          //   position: "relative",
          //   top:"500px", // Fix the search box position
          //   width: "auto", // Adjust width to fit your design
          //   zIndex: 1000, // En
          // },
        }}
        className={"pt-1 text-black bg-white border-black border block h-12 rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 custom-Muiltiselect"}
      />
    </>
  );
};

export default Multiselection;