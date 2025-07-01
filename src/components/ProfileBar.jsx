
import * as Unicons from "@iconscout/react-unicons";
const ProfileBar = ({modalRef,roleName,calllogout}) => {
  return (
    <>
      <div
        ref={modalRef}
        className="absolute right-1 mt-10 w-[150px]  bg-[#4f5760] shadow-lg rounded-md z-[100000] border-[1.5px] border-pcol"
      >
        <div className="p-2">
          <div className="flex space-x-1 ml-2">
            <Unicons.UilUser fill="#13b497" className="hover:text-heading" />
            <p className="text-white font-medium font-">{roleName}</p>
          </div>
          {/* <div className="">
                        <button className="w-full text-center text-gray-700 hover:text-blue-600 py-2 font-medium">Change Password</button>
                    </div> */}
          <div className="flex space-x-1 ml-2 mt-3">
            <button>
              <div
                onClick={calllogout}
                className="dark:text-white flex space-x-1 cursor-pointer"
              >
                <Unicons.UilSignout
                  fill="#13b497"
                  className="hover:text-heading hover:cursor-pointer"
                />
                <span className="text-white pr-1 hover:cursor-pointer font-medium">
                  Logout
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};


export default ProfileBar;
