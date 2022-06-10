import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredInputValue, setEnteredInputValue] = useState("");
  const [enteredSelectValue, setEnteredSelectValue] = useState("");
  const [enteredSelectValues, setEnteredSelectValues] = useState([]);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(
    enteredInputValue,
    enteredSelectValue,
    enteredSelectValues
  );
  const hasError = !valueIsValid && isTouched;

  const inputChangeHandler = (event) => {
    setEnteredInputValue(event.target.value);
  };

  const selectChangeHandler = (event) => {
    setEnteredSelectValue(event.value);
  };

  const multiSelectChangeHandler = (event) => {
    setEnteredSelectValues(event.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  return {
    inputValue: enteredInputValue,
    selectedValue: enteredSelectValue,
    selectedValues: enteredSelectValues,
    hasError,
    inputChangeHandler,
    selectChangeHandler,
    multiSelectChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
