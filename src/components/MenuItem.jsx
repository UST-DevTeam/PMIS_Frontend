import React, { useState } from 'react';

import * as Unicons from '@iconscout/react-unicons';
import { Link, useLocation } from 'react-router-dom';

const MenuItem = ({ itm, value, sidebarOpen, size, permission,checkp, parenting }) => {

    const sizeArr = [ "xs", "xs"]
    const [open, SetOpen] = useState(false)
    // console.log(permission?.permission.findIndex(prev=>prev.moduleName=="Project Management" && prev.accessType==true),"permissionpermissionpermission")


    const { pathname } = useLocation()
    // const [open,SetOpen] = useState(true)
    // console.log(permission.permission.indexOf(itm.name),parenting,itm.name,parenting,"permissionpermission")
    // if(checkp){
    //     console.log("29",permission,itm.link,parenting ? permission[parenting] : permission[parenting] && permission[parenting].indexOf(itm.link)!=-1 ,itm.link , "permissionpermission")
    // }
    return <>

        {
            itm.subMenu.length > 0 ?
                // ((!checkp)||(checkp != {} && itm.link==parenting ? permission[parenting] : permission[parenting] && permission[parenting].indexOf(itm.link)!=-1)) && 
                ((!checkp)||(checkp != {} && permission.permission && permission?.permission.findIndex(prev=>prev.moduleName==itm.name && prev.accessType==true) !=-1 && permission.permission[permission?.permission.findIndex(prev=>prev.moduleName==itm.name && prev.accessType==true)])) && 
                    <button onClick={((prev) => { SetOpen(!open), console.log(!open) })} type="button" class={"pl-2 flex items-center w-full p-2 text-sm font-light transition duration-75 hover:bg-pcol rounded-lg group text-white "} aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        {itm.icon}
                        {sidebarOpen && <span class={"text-" + sizeArr[size] + " flex-1 ml-3 text-left whitespace-nowrap hover:text-gray-200 hover:bg-pcol"} sidebar-toggle-item>{itm.name}</span>}
                        {open ? <Unicons.UilAngleUp /> : <Unicons.UilAngleDown />}
                    </button> 
                
                : 
                
                // ((!checkp)||(checkp && itm.link==parenting ? permission[parenting] : permission[parenting] && permission[parenting].indexOf(itm.link)!=-1)) && 
                ((!checkp)||(checkp != {} && permission.permission && permission?.permission.findIndex(prev=>prev.moduleName==itm.name && prev.accessType==true) !=-1 && permission.permission[permission?.permission.findIndex(prev=>prev.moduleName==itm.name && prev.accessType==true)])) && 
                    <div className={`pl-3 flex items-center w-full p-2 first-letter hover:text-gray-200 hover:rounded-md ${itm.link == pathname && "text-[#f4d3a8]"}`} >
                        <span className="text-pcol">{itm.icon}</span>
                        {
                            sidebarOpen && <Link to={itm.link} state={{ name: itm.name }} class={`text-${sizeArr[size]} pl-3 text-sm hover:text-[#13b497] font-semibold ransition duration-75 rounded-lg group hover:text-heading ${itm.link == pathname && "text-[#f4d3a8]  font-extrabold !important"}`}>
                                {itm.name}
                            </Link>
                        }
                    </div>
                    


            // permission[itm?.link] && permission[itm?.link].indexOf(itm?.link) && <>
                
            // </> :
            //     permission[parenting] && permission[parenting].indexOf(itm?.link) &&
            //     <div className={`pl-2 flex items-center w-full p-2 first-letter  ${itm.link == pathname && "text-orange-400"}`}>
            //         {itm.icon}
            //         {
            //             sidebarOpen &&
            //             <Link to={itm.link} state={{ name: itm.name }} class={`text-${sizeArr[size]} pl-3 text-base font-normal  transition duration-75 rounded-lg group ${itm.link == pathname && "text-orange-400"}`}>
            //                 {itm.name}
            //             </Link>

            //         }
            //     </div>

        }

        {
            itm.subMenu.length > 0 && open && <ul id="dropdown-example" class="py-2 pl-3 space-y-2">
                {
                    itm.subMenu.map((nestItm) => {
                        return <MenuItem
                            itm={nestItm}
                            value={value + 10}
                            sidebarOpen={sidebarOpen}
                            size={size + 1}
                            checkp={checkp}
                            permission={permission}
                            parenting={itm.link}
                        />
                    })
                }
            </ul>
        }
    </>
}

export default MenuItem