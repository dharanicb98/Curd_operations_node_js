import { INPUT_STYLE, currencyData } from "../constants";

const FormInputs = ({
  label,
  value,
  onChange,
  className,
  type,
  optionsData,
  objKey,
  defaultkey = "true",
  readInput,
  required,
  readTextArea,
  labelStyle,
  defaultValue,
}) => {
  // console.log("dddddddddddddddddddddd", optionsData, label);
  const renderInputs = () => {
    switch (type) {
      case "select":
        return (
          <select
            id={label}
            className={` ${INPUT_STYLE} ${readInput}`}
            value={value}
            onChange={onChange}
            required={required}
          >
            <>
              <option hidden>Select {label}</option>
              {optionsData?.map((eachOption, i) => {
                // console.log(eachOption);
                return (
                  <option key={eachOption.id || i} value={eachOption[objKey]}>
                    {defaultkey === "true" ? (
                      eachOption?.name
                    ) : (
                      <>
                        {eachOption.id} {eachOption.fname} {eachOption.lname}
                      </>
                    )}
                  </option>
                );
              })}
            </>
          </select>
        );

      case "textarea":
        return (
          <textarea
            type={type}
            id={label}
            className={`${INPUT_STYLE} ${readTextArea}`}
            rows={3}
            value={value}
            onChange={onChange}
            required={required}
          />
        );

      case "currency":
        return (
          <select
            className={`${INPUT_STYLE} flex justify-between`}
            id={label}
            value={value}
            onChange={onChange}
            required={required}
          >
            {Object.keys(currencyData).map((currency, index) => (
              <option
                value={currency}
                key={index}
                className="text-md"
                defaultValue={defaultValue}
              >
                {currency} {currencyData[currency].symbol}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <input
            id={label}
            className={`${INPUT_STYLE} ${readInput}`}
            type={type}
            name={label}
            value={value}
            required={required}
            onChange={onChange}
            onWheel={(e) => e.target.blur()}
          />
        );
    }
  };

  return (
    <div
      className={` flex flex-col  ${
        type === "textarea" ? "w-full mt-2" : className
      }`}
    >
      <label
        htmlFor={label}
        className={`text-slate-600  text-md mb-1 ${labelStyle}`}
      >
        {label}
      </label>
      {renderInputs()}
    </div>
  );
};

export default FormInputs;
