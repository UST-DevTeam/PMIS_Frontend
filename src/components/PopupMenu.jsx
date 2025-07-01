// import React, { useEffect, useRef, useState } from 'react';
// import Button from './Button';
// import { useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import ComponentActions from '../store/actions/component-actions';

// const PopupMenu = ({ dataclasses = "", classes = "", popupname = "", name, child, icon }) => {
//     const buttonRef = useRef(null);
//     const modalRef = useRef(null);
//     const location = useLocation();
//     const dispatch = useDispatch();

//     const filterVisibility = useSelector((state) => state.component.popmenu);

//     const handleClick = () => {
//         dispatch(ComponentActions.popmenu(location.pathname + "_" + name, !filterVisibility));
//     };

//     const handleClickOutside = (event) => {
//         if (!buttonRef.current.contains(event.target) && !modalRef.current.contains(event.target)) {
//             dispatch(ComponentActions.popmenu(location.pathname + "_" + name, false));
//         }
//     };

//     useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     useEffect(() => {
//         if (filterVisibility === location.pathname + "_" + name) {
//             const buttonRect = buttonRef.current.getBoundingClientRect();
//             const modalWidth = modalRef.current.offsetWidth;
//             const screenWidth = window.innerWidth;
    
//             if (buttonRect.right + modalWidth > screenWidth) {
//                 modalRef.current.style.right = `${screenWidth - buttonRect.right}px`;
//                 modalRef.current.style.left = "auto";
//             } else {
//                 modalRef.current.style.left = `${buttonRect.left}px`;
//                 modalRef.current.style.right = "auto";
//             }
//         }
//     }, [filterVisibility]);

//     return (
//         <div ref={buttonRef} className={`mr-1 h-10 z-40 relative left-0 right-0 mx-auto z-[1000] ${classes} ${popupname === "" ? "w-12" : "w-full"}`}>
//             <Button classes={"h-full"} onClick={handleClick} icon={icon} name={popupname} />
//             {
//                 filterVisibility === location.pathname + "_" + name &&
//                 <div ref={modalRef} className={`${dataclasses} fixed border-black border-[1.5px] w-96 bg-[#3e454d] pos`}>
//                     <div className='flex justify-center bg-secLine text-white '><h5 className='text-base text-white font-bold'>{name}</h5></div>
//                     {child}
//                 </div>
//             }
//         </div>
//     );
// }

// export default PopupMenu;




// import React, { useEffect, useRef, useState } from "react";
// import Button from "./Button";
// import { useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import ComponentActions from "../store/actions/component-actions";

// const PopupMenu = ({
//   dataclasses = "",
//   classes = "",
//   popupname = "",
//   name,
//   child,
//   icon,
// }) => {
//   const buttonRef = useRef(null);
//   const modalRef = useRef(null);
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const filterVisibility = useSelector((state) => state.component.popmenu);

//   const handleClick = () => {
//     dispatch(
//       ComponentActions.popmenu(
//         location.pathname + "_" + name,
//         !filterVisibility
//       )
//     );
//   };

//   const handleClickOutside = (event) => {
//     if (
//           !Array.from(event.target.classList)?.includes("not")
//     ) {
//       dispatch(ComponentActions.popmenu(location.pathname + "_" + name, false));
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     if (filterVisibility === location.pathname + "_" + name) {
//       const buttonRect = buttonRef.current.getBoundingClientRect();
//       const modalWidth = modalRef.current.offsetWidth;
//       const screenWidth = window.innerWidth;

//       if (buttonRect.right + modalWidth > screenWidth) {
//         modalRef.current.style.right = `${screenWidth - buttonRect.right}px`;
//         modalRef.current.style.left = "auto";
//       } else {
//         modalRef.current.style.left = `${buttonRect.left}px`;
//         modalRef.current.style.right = "auto";
//       }
//     }
//   }, [filterVisibility]);

//   useEffect(() => {
//     function addClassToAllChildren(el) {
//       if (el) {
//         el.classList.add("not");
//         const children = el.children;

//         for (let i = 0; i < children.length; i++) {
//           addClassToAllChildren(children[i]);
//         }
//       }
//     }

//     const element = document.querySelector("#add-not");
//     addClassToAllChildren(element);
//   });

//   return (
//     <div
//       ref={buttonRef}
//       className={`mr-1  h-10 z-50 relative left-0 right-0 mx-auto ${classes} ${
//         popupname === "" ? "w-12" : "w-full"
//       } not`}
//       id="add-not"
//     >
//       <Button
//         classes={"h-full not"}
//         onClick={handleClick}
//         icon={icon}
//         name={popupname}
//       />
//       {filterVisibility === location.pathname + "_" + name && (
//         <div
//           ref={modalRef}
//           className={`${dataclasses} fixed not border-black cursor-pointer border-[1.5px] w-96 bg-[#3e454d] pos`}
//         >
//           <div className="flex not justify-center bg-secLine text-white ">
//             <h5 className="text-base not text-white font-bold">{name}</h5>
//           </div>
//           {child}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PopupMenu;






import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ComponentActions from "../store/actions/component-actions";

const PopupMenu = ({
  dataclasses = "",
  classes = "",
  popupname = "",
  name,
  child,
  icon,
}) => {
  const buttonRef = useRef(null);
  const modalRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();

  const filterVisibility = useSelector((state) => state.component.popmenu);

  const handleClick = () => {
    dispatch(
      ComponentActions.popmenu(
        location.pathname + "_" + name,
        !filterVisibility
      )
    );
  };

  const handleClickOutside = (event) => {
    if (
          !Array.from(event.target.classList)?.includes("not")
    ) {
      dispatch(ComponentActions.popmenu(location.pathname + "_" + name, false));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (filterVisibility === location.pathname + "_" + name) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const modalWidth = modalRef.current.offsetWidth;
      const screenWidth = window.innerWidth;

      if (buttonRect.right + modalWidth > screenWidth) {
        modalRef.current.style.right = `${screenWidth - buttonRect.right}px`;
        modalRef.current.style.left = "auto";
      } else {
        modalRef.current.style.left = `${buttonRect.left}px`;
        modalRef.current.style.right = "auto";
      }
    }
  }, [filterVisibility]);

  useEffect(() => {
    function addClassToAllChildren(el) {
      if (el) {
        el.classList.add("not");
        const children = el.children;

        for (let i = 0; i < children.length; i++) {
          addClassToAllChildren(children[i]);
        }
      }
    }

    const element = document.querySelector("#add-not");
    addClassToAllChildren(element);
  });

  return (
    <div
      ref={buttonRef}
      className={`mr-1  h-10 z-50 relative left-0 right-0 mx-auto ${classes} ${
        popupname === "" ? "w-12" : "w-full"
      }  not`}
      id="add-not"
    >
      <Button
        classes={"h-full not"}
        onClick={handleClick}
        icon={icon}
        name={popupname}
      />
      {filterVisibility === location.pathname + "_" + name && (
        <div
          ref={modalRef}
          className={`${dataclasses} fixed not border-black cursor-pointer border-[1.5px] bg-[#3e454d] pos pb-2`}
        >
          <div className="flex not justify-center bg-secLine text-white ">
            <h5 className="text-base not text-white font-bold">{name}</h5>
          </div>
          {child}
        </div>
      )}
    </div>
  );
};

export default PopupMenu;

