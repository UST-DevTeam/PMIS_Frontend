import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import moment from "moment/moment";
import { FaTimes } from "react-icons/fa";

const DatePicking2 = ({
  itm,
  errors,
  handleSubmit,
  setValue,
  getValues,
  register,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const initialDate = getValues(itm.name);
    if (initialDate) {
      setSelectedDate(moment(initialDate, itm.formatop).toDate());
    }
  }, [getValues, itm]);

  const handleClearDate = () => {
    setSelectedDate(null);
    console.log("itm.name", itm.name);  
    setValue(itm.name, null);
  };

  return (
    <>
      <div className="relative">
        <DatePicker
          maxDate={
            itm?.props?.maxSelectableDate
              ? moment(itm.props.maxSelectableDate, itm.formatop).toDate()
              : null
          }
          minDate={
            itm?.props?.minSelectableDate
              ? moment(itm.props.minSelectableDate, itm.formatop).toDate()
              : null
          }
          required
          selected={selectedDate}
          onChange={(date) => {
            if (date) {
              const formattedDate = moment(date).format(itm?.formatop);
              setValue(itm.name, formattedDate, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
              setSelectedDate(date);
            } else {
              setValue(itm.name, null, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
              setSelectedDate(null);
            }
          }}
          showTimeSelect={
            itm.formattype === "time" || itm.formattype === "datetime"
          }
          showTimeSelectOnly={
            itm.formattype === "time" || itm.formattype === "datetime"
          }
          showIcon={true}
          dateFormat="dd/MM/yyyy"
          timeFormat="HH:mm"
          className="bg-white border-black border block h-9 w-full rounded-md py-0.5 p-2 text-white-900 shadow-lg focus:shadow-indigo-500/30 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {selectedDate && (
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-500 hover:text-red-500"
            onClick={handleClearDate}
          >
            <FaTimes />
          </button>
        )}
      </div>

      {itm.required && !getValues(itm.name) && (
        <p className="text-xs text-rose-400 font-bold">
          This Field is required
        </p>
      )}
    </>
  );
};

export default DatePicking2;