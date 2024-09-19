import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, {
  FocusEvent,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
} from "react";

type CustomInputWithBadgeProps = {
  labelName: string;
  htmlFor: string;
  handleKeyDown: (
    event: KeyboardEvent<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>
  ) => void;
  handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
  handleFocus: (event: FocusEvent<HTMLInputElement>) => void;
  badgeContent?: string;
};

const CustomInputWithBadge = forwardRef(
  (
    {
      labelName,
      badgeContent,
      htmlFor,
      handleKeyDown,
      handleBlur,
      handleFocus,
      ...rest
    }: CustomInputWithBadgeProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="flex items-center space-x-2">
        <Label htmlFor={htmlFor} className="w-20">
          {labelName}
        </Label>
        <Input
          {...rest}
          id={htmlFor}
          onKeyDown={(e) => handleKeyDown(e, ref)}
          ref={ref}
          onBlur={handleBlur}
          onFocus={handleFocus}
          autoComplete="off"
        />
        <Badge variant="secondary" className="ml-2 w-28">
          {badgeContent}
        </Badge>
      </div>
    );
  }
);

export default CustomInputWithBadge;
