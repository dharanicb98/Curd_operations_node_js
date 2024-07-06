import React from "react";
import Header from "./header";
import Body from "./body";


function Table({ rows, columns }) {
  return (
    <div className="ml-3 h-screen">
      <div className="">
        {/* <Filter columns={columns} /> */}
        <div className="overflow-x-auto  scrollbar-hide ">
          <div className="min-w-fit">
            <Header columns={columns} />
            <div className="overflow-auto dark-scrollbar  w-[100%]  h-[430px] max-h-[500px]">
              <Body rows={rows} columns={columns} />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Table;
