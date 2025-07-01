import React from 'react'

const TabItem = ({ value, index, handleTabClick, isSelected }) => {
  return (
    <div className={`${isSelected ? "bg-pbutton text-white" : "text-gray-400"} py-2 px-4 rounded-md hover:cursor-pointer font-poppins`} onClick={() => handleTabClick(index)}>{value}</div>
  )
}

export default TabItem