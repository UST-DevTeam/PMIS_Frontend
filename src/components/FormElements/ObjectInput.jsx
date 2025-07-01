import React from "react";

const ObjectInput = ({
  itm,
  errors,
  handleSubmit,
  setValue,
  getValues,
  register,
}) => {
  // Serialize the object into a string
  console.log('09090',itm)
  const fieldName = `${itm.name.name}:{id:${itm.name.id},value:"user input"}`;

  return (
    <div className="flex flex-col w-full">
      <input
        type={itm.type}
        disabled={itm.disabled ? true : false}
        {...register(fieldName, {
          required: itm.required ? "This field is required" : false,
          ...itm.props,
        })}
        placeholder={itm.placeholder ? itm.placeholder : ""}
        className="p-2 block w-full border-b-2 py-1.5 text-white-900 sm:text-sm sm:leading-6 rounded-md bg-opacity-50 font-poppins outline-none border-gray-400 shadow-lg focus:shadow-indigo-500/30"
        defaultValue={itm.defaultValue ? JSON.stringify(itm.defaultValue) : ""}
        {...itm.props}
      />
      <p className="text-xs text-rose-600 pt-2">{errors[fieldName]?.message}</p>
    </div>
  );
};

export default ObjectInput;
