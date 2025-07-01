import React, { useState, useEffect, useRef } from 'react';


const WithSideImage = ({ form, labeling, formclass,sideImage }) => {

    return <>
        <div className='h-full w-full flex bg-[#3e454d]'> 
            <div className={"md:w-1/2 flex bg-no-repeat bg-center overflow-hidden bg-[#3e454d]"+sideImage}>
            <div className="flex justify-center items-center">
            <img className="w-3/4 h-3/4" src="/logo.png" alt="PIMS" />
            </div>
            </div>
            <div className="w-1/2 flex flex-col items-center m-auto dark:bg-darkBg" >

                <div className=" my-auto sm:w-full sm:max-w-sm md:max-w-xl">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="flex justify-center items-center">
                    {/* <img className="w-20 h-12 " src="/logo.png" alt="PIMS" /> */}
                    <a href="https://www.mcpsinc.com/" target='_blank'>
                        <img className="w-36 h-36" src="/mobilecomm.png" alt="PIMS" />
                    </a>
                    
                    </div>
                        {/* <div className="mx-auto font-kat text-txt-neavy text-5xl text-center dark:text-darkBg">PMIS</div> */}
                        <h2 className=" text-center font-bold text-2xl font-body leading-9 tracking-tight text-[#13b497] dark:text-darkBg">{labeling}</h2>
                    </div>

                    <div className={`overflow-y-hidden nobar mt-4 bg-[#2e3339] rounded-lg ${formclass}`}>

                        {form}
                    </div>
                </div>

            </div>
        </div>
    </>
}

export default WithSideImage;

// =================For Image in Background instead of Color [3e454d]================================================================

// import React, { useState, useEffect, useRef } from 'react';


// const WithSideImage = ({ form, labeling, formclass,sideImage }) => {

//     return <>
//        <div
//   className="h-full w-full flex"
//   style={{ backgroundImage: "url('/src/assets/LoginBG.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
// >
//   <div
//     className={
//       "md:w-1/2 flex bg-no-repeat bg-center overflow-hidden " + sideImage
//     }
//   >
//     <div className="flex justify-center items-center">
//       <img className="w-3/4 h-3/4" src="/logo.png" alt="PIMS" />
//     </div>
//   </div>
//   <div className="w-1/2 flex flex-col items-center m-auto dark:bg-darkBg">
//     <div className="my-auto sm:w-full sm:max-w-sm md:max-w-xl">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <div className="flex justify-center items-center">
//           <img className="w-20 h-12" src="/logo.png" alt="PIMS" />
//         </div>
//         <h2 className="mt-2 text-center font-bold text-2xl font-body leading-9 tracking-tight text-[#13b497] dark:text-darkBg">
//           {labeling}
//         </h2>
//       </div>

//       {/* <div className={`overflow-y-hidden nobar mt-4 bg-[#2e3339] rounded-lg ${formclass}`}> */}
//       <div className={`overflow-y-hidden nobar mt-4 bg-transparent opacity-95 rounded-lg ${formclass}`}>
//         {form}
//       </div>
//     </div>
//   </div>
// </div>

//     </>
// }



// export default WithSideImage;