import React from "react";


function Header({ columns }) {
  return (
    <div className="flex items-center  px-4 bg-[#F2F2F2] p-[16px] h-[54px]">
      {columns?.map( (column, index) =>    (
            <div
              key={index}
              className={`flex items-center mr-4 ${column?.className}`}
            >
              <p className="font-[500] text-center ml-20 text-[18px] leading-[21.78px]">
                {column?.headName}
              </p>  
            </div>
          )
      )}
    </div>
  );
}

export default Header;
