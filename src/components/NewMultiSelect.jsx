import React, { useState } from 'react'
import { MultiSelect } from "react-multi-select-component";

const NewMultiSelects = ({ label, option = [], value = [], required = false, placeholder = "Select...", cb = (data) => { }, bg='bg-[#3e454d]', ...props }) => {
    const [length, setLength] = useState(0)
    return (
        <div className={`max-w-[170px] min-w-[100px] relative ${props?.height || ''} ${props?.className || ''} w-full`}>
            {/* <label htmlFor={label} className='text-white ml-2'>{required ? <span className='text-red-600 mr-1 '>*</span> : <></>}{label + (length > 0 ? " ( " + length + " )" : "")}</label> */}
            {/* <label htmlFor={label} className='text-white ml-2'>{required ? <span className='text-red-600 mr-1 '>*</span> : <></>}{label}</label> */}
            <MultiSelect
                className={`outline-none font-semibold rounded-md border-main mt-[4px] border-solid border-[#64676d] border-[1.2px] ${bg}`}
                options={option}
                value={value}
                placeholder={placeholder}
                defaultIsOpen={false}
                onChange={(data) => {
                    cb(data)
                    setLength(data.length)
                }}
                isClearable={true}
                overrideStrings={{
                    selectSomeItems: placeholder 
                }}
                style={{ height: '30px', fontSize: '14px' }}
            />
        </div>

    )
}


export const NewMultiSelects2 = ({ label, option = [], value = [], required = false, cb = (data) => { }, ...props }) => {
    const [length, setLength] = useState(0)
    return (
        <div className={`max-w-[200px] min-w-[100px]  relative p-0 z-50 ${props?.height || ''} ${props?.className || ''} w-full`}>
            {/* <label htmlFor={label} className='text-white ml-2'>{required ? <span className='text-red-600 mr-1 '>*</span> : <></>}{label + (length > 0 ? " ( " + length + " )" : "")}</label> */}
            {/* <label htmlFor={label} className='text-white ml-2'>{required ? <span className='text-red-600 mr-1 '>*</span> : <></>}{label}</label> */}
            <MultiSelect
                className="outline-none border rounded-md border-main mt-[2px]"
                options={option}
                value={value}
                defaultIsOpen={false}
                onChange={(data) => {
                    cb(data)
                    setLength(data.length)
                }
                }
                 style={{ height: '30px', fontSize: '14px' }}
            />
        </div>

    )
}


export default NewMultiSelects;