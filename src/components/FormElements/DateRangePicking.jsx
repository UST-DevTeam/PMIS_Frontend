import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const DateRangePicking = ({ itm, errors, setValue }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (date) => {
    const [start, end] = date;
    setStartDate(start);
    setEndDate(end);
    if(itm?.onChange){
      return
    }
    setValue(itm.name, {
      start: start ? moment(start).format(itm?.formatop) : null,
      end: end ? moment(end).format(itm?.formatop) : null,
    });
  };

  useEffect(() => {
    if(startDate && endDate){
      if(itm?.onChange){
        itm?.onChange({
          start: startDate ? moment(startDate).format(itm?.formatop) : null,
          end: endDate ? moment(endDate).format(itm?.formatop) : null,
        })
        return
      }
    }
  },[endDate])

  return (
    <div className="w-full">
      <DatePicker
        // selected={null}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        showIcon={true}
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
        dateFormat="dd/MM/yyyy"
        className="bg-[#3e454d] text-white border-[#64676d] !border-[3px] block h-10 !min-w-[230px] rounded-md py-2 px-3 focus:ring-2 ring:[#64676d] focus:ring-indigo-600"
         {...itm?.props}
      />
      {/* {itm.required && (!startDate || !endDate) && (
                <p className='text-xs text-red-500 font-bold'>This field is required</p>
            )} */}
    </div>
  );
};

export default DateRangePicking;
