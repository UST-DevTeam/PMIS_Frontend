
import React from 'react';


const TextArea = ({ itm, errors, handleSubmit, setValue, getValues, register, placeholder }) => {

    return <>
        <textarea {...register(itm.name, {
            required: itm.required ? "This " + " Field is required" : false,
            ...itm.props
        })} rows={8} className="bg-white border-black border block w-full h-full rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
        <p className='text-xs text-rose-400 font-bold '>{errors[itm.name]?.message}</p>
    </>
};

export default TextArea;
