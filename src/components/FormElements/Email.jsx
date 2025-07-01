import React from "react";

const Email = ({
  itm,
  errors,
  handleSubmit,
  setValue,
  getValues,
  register,
}) => {
  
  return (
    <>

      <div className="flex flex-col w-full">

        <input
          type={itm.type}
          disabled={itm.disabled ? true : false}
          {...register(itm.name, {
            required: itm.required ? "This " + " Field is required" : false,
            ...itm.props,
          })}
          placeholder={itm.placeholder ? itm.placeholder : ""}
          className="p-2 block w-full border-b-2 py-1.5 text-white-900 sm:text-sm sm:leading-6 rounded-md bg-opacity-50  font-poppins outline-none border-gray-400  shadow-lg focus:shadow-indigo-500/30"
          {...itm.props}
        />

        {/* {console.log(errors, itm.name, itm.required, "errors?.itm?")} */}
        <p className="text-xs text-rose-600 pt-2">{errors[itm.name]?.message}</p>

      </div>
    </>
  );
};

export default Email;
