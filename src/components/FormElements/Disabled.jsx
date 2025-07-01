
import React from 'react';


const Disabled = ({ itm,errors, handleSubmit, setValue, getValues, register}) => {


    let classes={
        "sdisabled":"bg-slate-300 font-bold border-black border block border-b-2 border-slate-400 w-full rounded-md py-1.5 p-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
        "hdisabled":"p-2 block w-full border-b-2 py-1.5 text-white-900 sm:text-sm sm:leading-6 rounded-md bg-opacity-50  font-poppins outline-none border-gray-400  shadow-lg focus:shadow-indigo-500/30"
    }   
    
    return <>
        <input type={itm.type}
            disabled={true}
            {...register(itm.name, {
                required: itm.required ? "This " + " Field is required" : false,
                ...itm.props
            })}
            placeholder={itm.placeholder ? itm.placeholder : ""}
            className={classes[itm.type]} {...itm.props} />
        {/* {console.log(errors, [itm.name], itm.required, "errors?.itm?")} */}
        <p className='text-xs text-rose-400 font-bold '>{errors[itm.name]?.message}</p>
    </>
};

export default Disabled;
