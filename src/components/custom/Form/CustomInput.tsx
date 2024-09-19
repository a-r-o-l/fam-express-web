import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FocusEvent, InputHTMLAttributes } from "react";

type CustomInputProps = {
  labelName: string;
  labelClassName?: string;
  inputClassName?: string;
  handleBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  handleFocus?: (event: FocusEvent<HTMLInputElement>) => void;
}& InputHTMLAttributes<HTMLInputElement>;

const CustomInput = ({
  labelName,
  labelClassName,
  inputClassName,
  handleBlur = () => {},
  handleFocus = () => {},
  ...rest
}: CustomInputProps) => {
  return (
    <div className="flex items-center">
      <Label htmlFor={labelName} className={labelClassName}>
        {labelName}
      </Label>
      <Input
        {...rest}
        id={labelName}
        onBlur={handleBlur}
        onFocus={handleFocus}
        autoComplete="off"
        className={inputClassName}
      />
    </div>
  );
};

export default CustomInput;
