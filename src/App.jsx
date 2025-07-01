import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import TopBar from "./components/TopBar";
import Navigation from "./Navigation";
import SweetAlerts from "./components/SweetAlerts";
import Loaders from "./components/Loaders";
import WebSocketClient from "./components/WebSocketClient";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import SetupPassword from "./pages/SetupPassword";
import Registration from "./pages/Registration";

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  
  let permission = JSON.parse(localStorage.getItem("permission")) || {};
  let user = JSON.parse(localStorage.getItem("user"));
  let rolename = user?.roleName;
  const unProtectedUrl = [
    {
      url: "/login",
      component: <Login />,
    },
    {
      url: "/register",
      component: <Registration />,
    },
    {
      url: "/setupPassword",
      component: <SetupPassword />,
    },
  ];

  const [sidebarOpen, setsidebarOpenn] = useState(true);
  let checkAuth = localStorage.getItem("auth");
  if (checkAuth == undefined || checkAuth == false) {
    localStorage.setItem("auth", false);
    navigate("/login");
  }
  // let checkAuth = useSelector((state) => {
  //     let interdata=state?.auth?.authenticated
  //     return interdata
  // })
  let locdata = useLocation();
  // console.log(locdata, "locdatalocdata");
  let unsecured = ["login", "register", "setupPassword"];

  useEffect(() => {
    // console.log("dsadsadsadsadsa", Roles);
  }, []);


  window.addEventListener('popstate',function(event){
    console.log("backaddEventListeneraddEventListener")
  })

  return (
    <main className="flex h-screen overflow-hidden  justify-center">
      {locdata.pathname != "/login" && <WebSocketClient />}
      {/* 
            <div class="flex">
                <div class="w-1/4 bg-gray-200 p-4">
                    <h2 class="text-xl font-semibold mb-4">Sidebar</h2>
                    <ul>
                        <li><a href="#" class="text-blue-500 hover:underline">Link 1</a></li>
                        <li><a href="#" class="text-blue-500 hover:underline">Link 2</a></li>
                        <li><a href="#" class="text-blue-500 hover:underline">Link 3</a></li>
                    </ul>
                </div>
                <div class="flex-1 bg-white p-4">
                    <h1 class="text-2xl font-semibold mb-4">Main Content</h1>
                    <p>This is the main content of your page.</p>
                </div>
            </div> */}
      {/* <div class="flex"> */}
      {/* <div class="flex flex-1"> */}
      {/* <Layout sidebarOpen={sidebarOpen} child={<QueryBuilderComponent />} />  */}
      <Routes>
        {unProtectedUrl.map((itm) => {
          return <Route path={itm.url} element={itm.component} />;
        })}
      </Routes>
      {!locdata.pathname.includes("/login") &&
      !locdata.pathname.includes("/register") &&
      !locdata.pathname.includes("/setupPassword") &&
      !locdata.pathname.includes("/agreement") &&
      !locdata.pathname.includes("/kycregister") &&
      !locdata.pathname.includes("/otp") &&
      !locdata.pathname.includes("/viewPitch") &&
      !locdata.pathname.includes("/companydetail") &&
      !locdata.pathname.includes("/businessRegistration") &&
      !locdata.pathname.includes("/setupRegistration") ? (
        <div className="flex flex-row flex-1">
          <Sidebar
            sidebarOpen={sidebarOpen}
            setsidebarOpenn={setsidebarOpenn}
          />
          <div className="flex relative flex-col flex-1">
            <TopBar
              sidebarOpen={sidebarOpen}
              setsidebarOpenn={setsidebarOpenn}
            />
            <Navigation sidebarOpen={sidebarOpen} />
          </div>
        </div>
      ) : (
        <></>
      )}
      <SweetAlerts />
      <Loaders />
    </main>
  );
}

export default App;
