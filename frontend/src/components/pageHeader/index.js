import React from "react";
import {BUTTON_STYLE} from "../constants"

const PageHeader = ({
  onClick,
  title,
  titleClassName,
  buttonName = "Create",
}) => (
  <div className="flex justify-between items-center m-3 mt-6 ">
    <h1 className="text-2xl font-semibold">{title}</h1>
    <button
      onClick={onClick}
      className={`m-3 sm:w-[100px] ${BUTTON_STYLE} ${titleClassName}`}
      type="black"
    >{buttonName}</button>
  </div>
);

export default PageHeader;
