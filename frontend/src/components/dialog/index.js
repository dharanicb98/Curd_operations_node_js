import React, { useEffect } from "react";
import { createPortal } from "react-dom";

function Dialog({
  isOpen = false,
  closeModal,
  children,
  parentClass,
  childrenClass,
  createClick,
  showCreateClick=true,
  title = '',
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "inherit";
    }
    return () => {
      document.body.style.overflow = "inherit";
    };
  }, [isOpen]);

  // const handleClose = () => {
  //   closeModal((prev) => !prev);
  // };

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={closeModal}
      className={`fixed p-4  z-[10px] top-0 left-0 h-full w-full flex items-center justify-center  bg-[#6B6B6B] bg-opacity-50  ${parentClass}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={` !bg-[#ffffff] z-[20px] max-h-[calc(100vh-50px)]  ${childrenClass}`}
      >
        <div className="p-4 overflow-auto h-full no-scrollbar dark-scrollbar">
          <h1 className="text-center text-2xl mb-3 text-slate-600 font-semibold ">
            { showCreateClick && (createClick ? <span>Create </span> : <span>Update </span>) }
            {title}
          </h1>
          {children}
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
}

export default Dialog;
