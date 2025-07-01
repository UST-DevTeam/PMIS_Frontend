import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment/moment';

const DatePicking = ({ itm, errors, handleSubmit, setValue, getValues, register }) => {

    const [value, onChange] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(true);

    // const handleClearDate = () => {
    //     setSelectedDate(null);
    //     setValue(itm.name, null);
    // };

    return <>

        <DatePicker

            maxDate={itm?.props?.maxSelectableDate ? moment(itm.props.maxSelectableDate, itm.formatop).toDate() : null}
            minDate={itm?.props?.minSelectableDate ? moment(itm.props.minSelectableDate, itm.formatop).toDate() : null}
            required
            selected={getValues(itm.name) ? moment(getValues(itm.name), itm?.formatop).toDate() : ""}
            onChange={(date) => {
                if (date != null) {
                    let curr = moment(date)
                    setValue(itm.name, curr.format(itm?.formatop))
                    setSelectedDate(prev => !prev)
                } else {
                    setValue(itm.name, null)
                }
            }}
            showTimeSelect={itm.formattype == "time" || itm.formattype == "datetime"}
            showTimeSelectOnly={itm.formattype == "time" || itm.formattype == "datetime"}
            show={false}
            showIcon={true}
            dateFormat="dd/MM/yyyy"
            timeFormat={"HH:mm"}
            className='bg-white border-black border block h-9 w-full rounded-md py-0.5 p-2 text-white-900 shadow-lg focus:shadow-indigo-500/30 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        />

        {
            (itm.required && !getValues(itm.name)) &&
            <>
                <p className='text-xs text-rose-400 font-bold'>This Field is required</p>
            </>
        }

    </>
};

export default DatePicking;


// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import moment from 'moment';

// const DatePicking = ({ itm, errors, handleSubmit, setValue, getValues, register, reset }) => {
//     const [selectedDate, setSelectedDate] = useState(null);

//     useEffect(() => {
//         const initialDate = getValues(itm.name);
//         if (initialDate) {
//             const parsedDate = moment(initialDate, itm?.formatop).isValid()
//                 ? moment(initialDate, itm?.formatop).toDate()
//                 : null;
//             setSelectedDate(parsedDate);
//         }
//     }, [getValues, itm.name, itm?.formatop]);

//     useEffect(() => {
//         setSelectedDate(null);
//         setValue(itm.name, null);
//     }, [reset, setValue, itm.name]);

//     const handleDateChange = (date) => {
//         if (!date) {
//             setValue(itm.name, null);
//             setSelectedDate(null);
//             return;
//         }

//         const formattedDate = moment(date).format(itm?.formatop);
//         setValue(itm.name, formattedDate);
//         setSelectedDate(date);
//         console.log(formattedDate, "FormattedDate");
//     };

//     return (
//         <>
//             <DatePicker
//                 maxDate={itm?.props?.maxSelectableDate}
//                 minDate={itm?.props?.minSelectableDate}
//                 showIcon={true}
//                 selected={selectedDate}
//                 onChange={handleDateChange}
//                 showTimeSelect={itm.formattype === "time" || itm.formattype === "datetime"}
//                 showTimeSelectOnly={itm.formattype === "time"}
//                 dateFormat={itm?.format || "dd/MM/yyyy"}
//                 timeFormat="HH:mm"
//                 className='bg-white border-black border block h-8 w-full rounded-md py-0.5 p-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
//             />
//             <p className='text-xs text-red-700'>{errors[itm.name]?.message}</p>
//         </>
//     );
// };

// export default DatePicking;
