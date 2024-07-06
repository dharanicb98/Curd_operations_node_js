import { BUTTON_STYLE } from "../constants";

function DeletePopup({ title, setIsOpen, deletedObj, onDeleteList }) {
  // console.log(deletedObj)
  const deleteFunction = () => {
    setIsOpen((prev) => ({ ...prev, isDelete: false })); // close popup function
    onDeleteList(); // calling delete list function
  };
  return (
    <>
      <div
        className="fixed top-0 bottom-0 right-0 left-0 bg-transparent flex justify-center items-center"
        onClick={() => setIsOpen((prev) => ({ ...prev, isDelete: false }))}
      >
        <div
          className="bg-[#FFFFFF] p-4 rounded-xl w-[500px] shadow border-2 border-gray-300 
        animate-popup "
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-xl mt-3 mb-5 font-bold leading-6 text-center text-red-900">
            {`Delete ${title}`}
          </h3>
          <div className="mt-5 ml-5 w-100%] flex flex-col text-md font-mono ">
            {Object.keys(deletedObj).map((eachKey, index) => {
              if (eachKey.toLocaleLowerCase() !== "id") {
                return (
                  <div className="flex" key={index}>
                    <p className="font-bold text-[#B8495B] w-[100px]">
                      {eachKey}
                    </p>
                    <p className="text-black font-[400] pl-2">{`: ${deletedObj[eachKey]}`}</p>
                  </div>
                );
              }
            })}
          </div>
          <p className="mt-5 ml-5 font-semibold text-[16px]">Are You Sure?</p>
          <div className="flex justify-between">
            <button
              onClick={() =>
                setIsOpen((prev) => ({ ...prev, isDelete: false }))
              }
              className={`m-5 shadow rounded-full sm:w-[100px] ${BUTTON_STYLE}`}
            >{"Cancel"}</button>
            <button
              onClick={deleteFunction}
              className={`m-5 shadow rounded-full sm:w-[100px] text-[17px] font-bold ${BUTTON_STYLE}`}
              type="cancel"
            >{"Delete"}</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeletePopup;
