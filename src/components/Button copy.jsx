import React from 'react'

const Button = ({ onClick, name, classes = "", icon }) => {

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

        <button onClick={onClick} className={`${classes} ${classes.includes("bg")?"  ":" bg-pbutton "}  flex items-center rounded-md px-3 py-1 text-xs font-semibold leading-6 text-white shadow-md hover:bg-onHoverButton transition-colors duration-500`}>
            {name} {icon}
        </button>
    )
}

export default Button