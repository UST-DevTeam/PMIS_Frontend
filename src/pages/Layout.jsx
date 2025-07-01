import React, { useEffect, useState } from "react";
import * as Unicons from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";

const Layout = ({ child }) => {
  const [sidebarOpen, setsidebarOpenn] = useState(true);
  const [Width, setWidth] = useState("");


  // SELECT dbConfig.*,'**********' AS A ,'**********' AS B,'**********' AS C,'**********' AS D,'**********' AS E,'**********' AS F,'**********' AS G FROM dbConfig;
  const navigate = useNavigate();
  // const [Width, setWidth] = useState(window.innerWidth)
  const handleResize = () => {
    console.log(window, "windowwindow");
    setWidth(window.innerWidth, "windowwindow");
    console.log(window.innerHeight, "windowwindow");
  };

  let breadcrumblist = useSelector((state) => {
    return state.component.breadcrumb;
  });
  // console.log(Boolean(checkauth), "checkAuthcheckAuth")
  // if(checkAuth==false){
  //     navigate("/login")
  // }
  let checkAuth = localStorage.getItem("auth");
  // console.log(checkAuth, "statestatestatestate");
  // let checkauth;
  useEffect(() => {
    if (checkAuth == "false") {
      navigate("/login");
    }

    window.addEventListener("resize", handleResize);
  }, [checkAuth]);

  return (
    <>
      {/* <Sidebar sidebarOpen={sidebarOpen} setsidebarOpenn={setsidebarOpenn}/> */}
      {/* <div style={{width:Width}} className={`flex-1 h-full bg-white p-2 overflow-y-scroll`}> */}
      <BreadCrumbs />
      <div className={`flex-1 h-[30vh] overflow-y-scroll bg-[#3e454d]`}>
        {/* <div class="flex-1 bg-white p-4"> */}
        {child}
      </div>
    </>
  );
};

export default Layout;
