import React, { useState } from "react";
import FormInputs from "./formInputs";
import { BUTTON_STYLE } from "../constants";

const formList = [
  {
    id: 1,
    type: "text",
    label: "Name",
    apiKey: "name",
    optionsList: "",
  },
  {
    id: 2,
    type: "number",
    label: "Price",
    apiKey: "price",
    optionsList: "",
  },
  {
    id: 3,
    type: "text",
    label: "brand",
    apiKey: "brand",
    optionsList: "",
  },
  {
    id: 4,
    type: "select",
    label: "Category",
    apiKey: "category",
    optionsList: [
      {
        id: 1,
        optionValue: "mobile",
        name: "Mobile",
      },
      {
        id: 2,
        optionValue: "clothing",
        name: "Clothing",
      },
      {
        id: 3,
        optionValue: "food",
        name: "Food",
      },
      {
        id: 4,
        optionValue: "sports",
        name: "Sports",
      },
    ],
  },
 
];

function ProductDetailsForm({
  isEdit,
  close,
  editData,
  handleRequest,
  value,
  createClick,
}) {
  const [formData, setFormData] = useState({ ...editData });

  const handleSubmit = (e) => {
    e.preventDefault();
    close();
    handleRequest(formData);
    Object.keys(formData).forEach((e) => (formData[e] = ""));
    // console.log("+,,,,,,,,,", formData);
    setFormData(formData);
  };
  // console.log(formData);
  return (
    <div>
      {isEdit && (
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between flex-wrap">
            {formList.map((eachItem) => (
              <FormInputs
                objKey="optionValue"
                optionsData={eachItem.optionsList}
                key={eachItem.id}
                label={eachItem.label}
                type={eachItem.type}
                value={formData[eachItem.apiKey]}
                className="w-[49%] mt-2"
                onChange={(e) =>
                  setFormData(
                    createClick
                      ? { ...formData, [eachItem.apiKey]: e.target.value }
                      : eachItem.apiKey !== "slug"
                      ? { ...formData, [eachItem.apiKey]: e.target.value }
                      : { ...formData }
                  )
                }
              />
            ))}
          </div>
          <div className="flex justify-between mt-10">
            <button type="outline" onClick={close} className={`${BUTTON_STYLE}`}>{"Cancel"}</button>
            <button buttonType="submit" value={value} className={`${BUTTON_STYLE}`} type="secondary" >{value}</button>
          </div>
        </form>
      )}
    </div>
  );
}
export default ProductDetailsForm;
