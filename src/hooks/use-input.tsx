import { FocusEvent, useState } from "react";

const useInput = (validate: (value: string) => boolean) => {
     const [value, setNameValue] = useState<string>("");
     const [isTouched, setIsTouched] = useState(false);

     const hasError = isTouched && validate(value);

     const blurHandler = (event: FocusEvent<HTMLInputElement>): void => {
         setNameValue(event.currentTarget.value);
         setIsTouched(true);
     };

     return { value: value, isTouched: isTouched, hasError: hasError, blurHanlder: blurHandler };


}

export default useInput;