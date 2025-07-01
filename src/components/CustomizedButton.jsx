import React from 'react'

const CustomizedButton = ({ onClick, name, classes = "", icon }) => {

    let data = [
        ["bg-", "bg-[#143b64]"],
        ["w-", "w-full"]
    ]

    let tkn = 1
    let value = ""

    data.map((itm) => {
        if (classes.search(itm[0]) == -1) {
            value = value + " " + itm[1]
        }
    })

    classes = classes + value

    return (

        <button onClick={onClick} className={`${classes} flex items-center rounded-md px-3 py-1 text-xs font-semibold leading-6 shadow-md transition-colors duration-500`}>
            {name} {icon}
        </button>
    )
}

export default CustomizedButton