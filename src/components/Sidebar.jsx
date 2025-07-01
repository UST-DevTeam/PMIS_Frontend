import React, { useEffect, useState } from "react";

import * as Unicons from "@iconscout/react-unicons";
import MenuItem from "./MenuItem";
import { Sidebar_content } from "../utils/sidebar_values";

const Sidebar = ({ sidebarOpen, setsidebarOpenn }) => {


  let permission = JSON.parse(localStorage.getItem("permission")) || {};
  let user = JSON.parse(localStorage.getItem("user"));
  let rolename = user?.roleName;

  // const nestSidebar = (itm) => {
  //     return <li>

  //         <div class="flex">
  //             <a href={itm.link} class="flex-80 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
  //                 {itm.icon}
  //                 <span class="ms-3">{itm.name}</span>
  //             </a>
  //         </div>

  //         {
  //             itm.subMenu ?
  //                 <>
  //                     <span class="text-sm rotate-180" id="arrow">
  //                         <i class="bi bi-chevron-down"></i>
  //                     </span>
  //                     <ul class="space-y-2 font-medium">
  //                         {
  //                             itm?.subMenu.map((itm) => {
  //                                 return nestSidebar(itm)
  //                             })
  //                         }
  //                     </ul>
  //                 </> : <></>
  //         }

  //     </li>
  // }

  let Roles = Sidebar_content;

  useEffect(() => {
    Roles = Sidebar_content;
  }, [rolename]);
  return (
    <>

      <div
        className={`${
          !sidebarOpen && "w-14 md:w-24 "
        } z-[2000] bg-gray-200 bg-primaryLine dark:bg-primaryLine duration-950 transition-all from-white to-black fixed top-0 left-0 bottom-0 md:static text-white`}
      >
        <button
          onClick={() => {
            setsidebarOpenn((prev) => !prev);
          }}
          className={`absolute top-4 right-4 md:hidden border-[1.5px] rounded-full`}
        >
          <Unicons.UilArrowLeft size="28" style={{ color: "white",}} />
        </button>
        <h2 class="text-xl font-semibold"></h2>
        {sidebarOpen ? (
          <img className=" ml-3.5 w-[100px] mt-2" src="/logo.png" alt="PIMS" />
        ) : (
          <img className=" ml-2.5 w-[40px] mt-2" src="/favico.png" alt="PIMS" />
        )}

        <ul className="space-y-2 h-[80vh] w-56 overflow-y-scroll font-poppins font-bold">
          {Roles["all_routes"] && Roles["all_routes"].map((itm) => {
            return (
              <li>
                <MenuItem
                  sidebarOpen={sidebarOpen}
                  itm={itm}
                  value={6}
                  size={2}
                  checkp={true}
                  permission={permission}
                  parenting={itm.name}
                />
              </li>
            );
          })}
          {[...(rolename == "SuperAdmin" ? Roles[rolename] : [])].map((itm) => {
            return (
              <li>
                <MenuItem
                  sidebarOpen={sidebarOpen}
                  itm={itm}
                  value={6}
                  size={0}
                  checkp={false}
                  permission={{}}
                  parenting={itm.link}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
