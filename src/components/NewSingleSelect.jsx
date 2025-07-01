import React, { useState } from 'react'
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select';

const NewSingleSelect = ({ label, option = [], value = null, required = false, cb = (data) => {}, placeholder = "", ...props }) => {
    const [length, setLength] = useState(0)
    const [selectedOption, setSelectedOption] = useState(value);

    const handleChange = (selected) => {
        setSelectedOption(selected);
        cb(selected);
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
        indicatorSeparator: () => ({
            display: 'none', 
        }),
    };
    return (
        <div className={`max-w-[170px] min-w-[100px]  relative ${props?.height || ''} ${props?.className || ''} w-full`}>
            {/* <label htmlFor={label} className='text-white ml-2'>{required ? <span className='text-red-600 mr-1 '>*</span> : <></>}{label + (length > 0 ? " ( " + length + " )" : "")}</label> */}
            {/* <label htmlFor={label} className='text-white ml-2'>{required ? <span className='text-red-600 mr-1 '>*</span> : <></>}{label}</label> */}
            <Select
                className="outline-none font-semibold rounded-md border-main mt-[5px] border-solid border-[#64676d] border-[1.3px]"
                options={option}
                // value={selectedOption}
                value={value}
                defaultIsOpen={false}
                // onChange={(data) => {    
                //     cb(data)
                //     setLength(data.length)
                // }}
                onChange={handleChange}
                placeholder={placeholder}
                isClearable={true}
                styles={customStyles}
            />
        </div>

    )
}

export default NewSingleSelect;

// import React, { useState } from 'react'
// import { MultiSelect } from "react-multi-select-component";
// import Select from 'react-select';

// const NewSingleSelect = ({ label, option = [], value = [], required = false, cb = (data) => { },placeholder = "", ...props }) => {
//     const [length, setLength] = useState(0)
//     const customStyles = {
//         control: (provided) => ({
//             ...provided,
//             backgroundColor: '#3e454d',
//             borderColor: '#64676d',      
//         }),
//         menu: (provided) => ({
//             ...provided,
//             backgroundColor: '#f0f0f0',
//         }),
//         option: (provided, state) => ({
//             ...provided,
//             backgroundColor: state.isSelected ? '#d4d4d4' : '#3e454d',
//             color: state.isSelected ? '#000' : 'white',            
//             '&:hover': {
//                 backgroundColor: '#24292d',                       
//             },
//         }),
//     };
//     return (
//         <div className={`max-w-[150px] min-w-[150px] relative p-0 ${props?.height || ''} ${props?.className || ''} w-full`}>
//             {/* <label htmlFor={label} className='text-white ml-2'>{required ? <span className='text-red-600 mr-1 '>*</span> : <></>}{label + (length > 0 ? " ( " + length + " )" : "")}</label> */}
//             {/* <label htmlFor={label} className='text-white ml-2'>{required ? <span className='text-red-600 mr-1 '>*</span> : <></>}{label}</label> */}
//             <Select
//                 className="outline-none border font-extrabold rounded-md border-main mt-[2px]"
//                 options={option}
//                 value={value}
//                 defaultIsOpen={false}
//                 onChange={(data) => {
//                     cb(data)
//                     setLength(data.length)
//                 }}
//                 placeholder={placeholder}
//                 styles={customStyles}
//             />
//         </div>

//     )
// }

// export default NewSingleSelect;