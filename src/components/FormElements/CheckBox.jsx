import React from "react";

const CheckBox = ({
  itm,
  errors,
  handleSubmit,
  setValue,
  getValues,
  register,
}) => {
  return (
    <>
      <div className="flex flex-col">
        {itm?.option?.map((item, index) => {
          return (
            <div className={`flex flex-row ${index != 0 && ""}`}>
              <input
                type={itm.type}
                disabled={itm.disabled ? true : false}
                {...register(itm.name, {
                  required: itm.required
                    ? "This " + " Field is required"
                    : false,
                  ...itm.props,
                })}
                // value={item.value}
                placeholder={itm.placeholder ? itm.placeholder : ""}
                className=""
                {...itm.props}
              />
              <label className="text-sm pl-2 dark:text-darkBg whitespace-nowrap">
                {item.label}
              </label>
            </div>
          );
        })}
        <p className="text-xs text-rose-400 font-bold ">{errors[itm.name]?.message}</p>
      </div>
    </>
  );
};

export default CheckBox;
