import React from 'react';

const Tooltip = ({ text }) => {

    return <>
    <div className="relative inline-block">
        <p className="cursor-pointer hover:opacity-100">{"hiii"}</p>
        <span className="absolute z-[1000] bg-gray-500 text-white text-sm py-1 px-2 rounded-lg opacity-0 transition-opacity duration-300 left-1/2 transform -translate-x-1/2 top-2">
            {"Hello"}
        </span>
    </div>
    </>


}

export default Tooltip