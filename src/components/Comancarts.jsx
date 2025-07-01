import React from 'react'

function Comancarts({label,value,background,img_src,classes}) {
    return (
        <div className="col-span-1 shadow-lg">
            <div className={`chart-card-wrapper  p-2  ${classes}`}>
                <h5 className="font-semibold mb-3 ">{label}</h5>
                <div className="flex items-center justify-between ">
                    <span className="text-success text-lg font-semibold">{value}</span>
                    <div className="chart-wrapper">
                        <img src={img_src} alt="" />
                    </div>
                </div>
                <div className="w-full bg-white rounded-full h-2.5 dark:bg-gray-700 mt-2">
                    <div className={`bg-gradient-to-r h-2.5 rounded-full w-1/3 ${background}`} ></div>
                </div>
            </div>
        </div>
    
  )
}

export default Comancarts
